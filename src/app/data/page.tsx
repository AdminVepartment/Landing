import { Frame, Block } from "@/components/showcase/frame";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  IconUser, IconMail, IconBell, IconSettings,
  IconMoreHorizontal, IconEdit, IconTrash,
  IconArrowUp, IconArrowDown,
} from "@/components/icons";

const users = [
  { name: "Alice Johnson",  email: "alice@example.com", role: "Admin",   status: "success" as const,     amount: "$250.00", initials: "AJ" },
  { name: "Bob Smith",      email: "bob@example.com",   role: "Editor",  status: "warning" as const,     amount: "$150.00", initials: "BS" },
  { name: "Carol White",    email: "carol@example.com", role: "Viewer",  status: "success" as const,     amount: "$350.00", initials: "CW" },
  { name: "David Brown",    email: "david@example.com", role: "Editor",  status: "destructive" as const, amount: "$80.00",  initials: "DB" },
  { name: "Eve Martinez",   email: "eve@example.com",   role: "Admin",   status: "info" as const,        amount: "$420.00", initials: "EM" },
];

const statusLabel: Record<string, string> = {
  success: "Active", warning: "Pending", destructive: "Inactive", info: "Review",
};

export default function DataPage() {
  return (
    <Frame
      group="06 · Data Display"
      title="Data Display"
      description="Cards, tables, and structured data layouts."
    >
      {/* ── Card — variants ─────────────────────────────────────────────── */}
      <Block label="Card — Variants">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Default */}
          <Card>
            <CardHeader>
              <CardTitle>Default card</CardTitle>
              <CardDescription>A simple content container.</CardDescription>
            </CardHeader>
            <CardContent className="text-body-sm text-muted-foreground">
              Use cards to group related information with a consistent visual boundary.
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          {/* Stat card */}
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total revenue</CardDescription>
              <div className="flex items-end gap-2">
                <CardTitle className="text-3xl font-bold">$45,231</CardTitle>
                <Badge variant="success" className="mb-0.5 gap-1">
                  <IconArrowUp className="h-3 w-3" />20.1%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+$8,432 from last month</p>
              <Progress value={72} className="mt-3" />
            </CardContent>
          </Card>

          {/* User card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="SC" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Sarah Connor</CardTitle>
                  <CardDescription>Admin · Active</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconMail className="h-4 w-4" /> sarah@example.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconBell className="h-4 w-4" /> Notifications on
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">Edit</Button>
              <Button size="sm" variant="outline" className="flex-1">Message</Button>
            </CardFooter>
          </Card>
        </div>
      </Block>

      {/* ── Card — grid ─────────────────────────────────────────────────── */}
      <Block label="Card — Metric Grid">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Users",    value: "12,840", change: "+12%",  up: true  },
            { label: "Revenue",  value: "$45.2k",  change: "+20%",  up: true  },
            { label: "Bounce",   value: "38.4%",  change: "−4%",   up: false },
            { label: "Requests", value: "1.2M",   change: "+5%",   up: true  },
          ].map((m) => (
            <Card key={m.label}>
              <CardHeader className="pb-1">
                <CardDescription>{m.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{m.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {m.up
                    ? <IconArrowUp className="h-3 w-3 text-green-500" />
                    : <IconArrowDown className="h-3 w-3 text-red-500" />}
                  <span className={`text-xs ${m.up ? "text-green-600" : "text-red-600"}`}>{m.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Block>

      {/* ── Card — settings ─────────────────────────────────────────────── */}
      <Block label="Card — Settings Panel">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive alerts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "push",    label: "Push notifications", on: true  },
              { id: "email",   label: "Email digest",       on: false },
              { id: "sms",     label: "SMS alerts",         on: false },
              { id: "mkt",     label: "Marketing",          on: false },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Label htmlFor={item.id} className="text-sm">{item.label}</Label>
                <Switch id={item.id} defaultChecked={item.on} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">Save preferences</Button>
          </CardFooter>
        </Card>
      </Block>

      {/* ── Table — basic ───────────────────────────────────────────────── */}
      <Block label="Table — Users">
        <Card>
          <Table>
            <TableCaption>Team members · 5 total</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{u.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.role}</TableCell>
                  <TableCell>
                    <Badge variant={u.status}>{statusLabel[u.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{u.amount}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <IconEdit className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive">
                        <IconTrash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">Total (5 users)</TableCell>
                <TableCell className="text-right font-mono font-semibold">$1,250.00</TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </Block>
    </Frame>
  );
}
