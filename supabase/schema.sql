-- ═══════════════════════════════════════════════════════════════════════════
-- Vepartment Database Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  workspace_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Workspaces (organizations)
create table public.workspaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  owner_id uuid references public.profiles(id),
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add workspace FK to profiles
alter table public.profiles
  add constraint profiles_workspace_fk
  foreign key (workspace_id) references public.workspaces(id);

-- 3. Departments (Vepartments)
create table public.departments (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade not null,
  name text not null,
  slug text not null,
  color text default '#4F46E5',
  description text,
  status text default 'active' check (status in ('active', 'standby', 'archived')),
  agent_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(workspace_id, slug)
);

-- 4. Domains (within departments)
create table public.domains (
  id uuid default gen_random_uuid() primary key,
  department_id uuid references public.departments(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description text,
  status text default 'active' check (status in ('active', 'standby', 'archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(department_id, slug)
);

-- 5. Agents
create table public.agents (
  id uuid default gen_random_uuid() primary key,
  domain_id uuid references public.domains(id) on delete cascade not null,
  department_id uuid references public.departments(id) on delete cascade not null,
  name text not null,
  role text default 'worker' check (role in ('worker', 'manager', 'governance')),
  description text,
  status text default 'idle' check (status in ('active', 'idle', 'error')),
  config jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Settings (per workspace)
create table public.workspace_settings (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references public.workspaces(id) on delete cascade unique not null,
  llm_model text default 'gpt-4o-mini',
  n8n_webhook_url text,
  settings jsonb default '{}',
  updated_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS) — users only see their own data
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.departments enable row level security;
alter table public.domains enable row level security;
alter table public.agents enable row level security;
alter table public.workspace_settings enable row level security;

-- Profiles: users see/edit their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Workspaces: members can view their workspace
create policy "Members can view workspace"
  on public.workspaces for select using (
    id in (select workspace_id from public.profiles where id = auth.uid())
  );
create policy "Owners can update workspace"
  on public.workspaces for update using (owner_id = auth.uid());

-- Departments: visible to workspace members
create policy "Members can view departments"
  on public.departments for select using (
    workspace_id in (select workspace_id from public.profiles where id = auth.uid())
  );
create policy "Admins can manage departments"
  on public.departments for all using (
    workspace_id in (
      select workspace_id from public.profiles
      where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- Domains: visible to workspace members
create policy "Members can view domains"
  on public.domains for select using (
    department_id in (
      select d.id from public.departments d
      join public.profiles p on p.workspace_id = d.workspace_id
      where p.id = auth.uid()
    )
  );
create policy "Admins can manage domains"
  on public.domains for all using (
    department_id in (
      select d.id from public.departments d
      join public.profiles p on p.workspace_id = d.workspace_id
      where p.id = auth.uid() and p.role in ('owner', 'admin')
    )
  );

-- Agents: visible to workspace members
create policy "Members can view agents"
  on public.agents for select using (
    department_id in (
      select d.id from public.departments d
      join public.profiles p on p.workspace_id = d.workspace_id
      where p.id = auth.uid()
    )
  );
create policy "Admins can manage agents"
  on public.agents for all using (
    department_id in (
      select d.id from public.departments d
      join public.profiles p on p.workspace_id = d.workspace_id
      where p.id = auth.uid() and p.role in ('owner', 'admin')
    )
  );

-- Settings: workspace members can view, admins can edit
create policy "Members can view settings"
  on public.workspace_settings for select using (
    workspace_id in (select workspace_id from public.profiles where id = auth.uid())
  );
create policy "Admins can manage settings"
  on public.workspace_settings for all using (
    workspace_id in (
      select workspace_id from public.profiles
      where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- ═══════════════════════════════════════════════════════════════════════════
-- Auto-create profile on signup
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
