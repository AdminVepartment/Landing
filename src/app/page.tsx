import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const groups = [
  { num: "01", slug: "foundations", title: "Foundations",        desc: "Colors · Typography · Spacing · Shadows · Border radius" },
  { num: "02", slug: "inputs",      title: "Inputs & Controls",  desc: "Button · Input · Textarea · Checkbox · Switch · Label" },
  { num: "03", slug: "display",     title: "Display",            desc: "Badge · Avatar · Progress · Skeleton · Separator" },
  { num: "04", slug: "feedback",    title: "Feedback",           desc: "Alert · Status banners" },
  { num: "05", slug: "navigation",  title: "Navigation",         desc: "Tabs · Accordion" },
  { num: "06", slug: "data",        title: "Data Display",       desc: "Card · Table" },
  { num: "07", slug: "icons",       title: "Icons",              desc: "lucide-react · 40+ icons · size scale · usage guide" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-10 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <h1 className="text-display-md text-foreground">Design System</h1>
          <p className="mt-2 text-body-lg text-muted-foreground">
            Component library · Next.js 15 · Tailwind CSS · shadcn/ui
          </p>
          <Separator className="mt-8" />
        </header>

        <nav className="space-y-1">
          {groups.map((g) => (
            <Link
              key={g.slug}
              href={`/${g.slug}`}
              className="group flex items-center gap-5 rounded-xl px-4 py-4 transition-colors hover:bg-muted/60"
            >
              <span className="w-8 shrink-0 font-mono text-label-lg text-muted-foreground">{g.num}</span>
              <div className="flex-1">
                <p className="text-heading-sm text-foreground group-hover:text-primary transition-colors">{g.title}</p>
                <p className="text-body-sm text-muted-foreground mt-0.5">{g.desc}</p>
              </div>
              <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
