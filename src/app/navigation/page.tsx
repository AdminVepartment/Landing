import { Frame, Block } from "@/components/showcase/frame";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NavigationPage() {
  return (
    <Frame
      group="05 · Navigation"
      title="Navigation"
      description="Tabs and accordions for structuring content and navigation."
    >
      {/* ── Tabs — basic ────────────────────────────────────────────────── */}
      <Block label="Tabs — Basic">
        <Tabs defaultValue="tab1" className="max-w-lg">
          <TabsList>
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Billing</TabsTrigger>
            <TabsTrigger value="tab3">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account details.</CardDescription>
              </CardHeader>
              <CardContent className="text-body-sm text-muted-foreground">
                Update your name, email, and profile photo here.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage your plan and payment methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm">Current plan</span>
                  <Badge variant="info">Pro</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm">Next billing</span>
                  <span className="text-body-sm text-muted-foreground">Apr 1, 2026</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Two-factor authentication and sessions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-fa">Two-factor auth</Label>
                  <Switch id="two-fa" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Block>

      {/* ── Tabs — with badges ──────────────────────────────────────────── */}
      <Block label="Tabs — With Badges">
        <Tabs defaultValue="open">
          <TabsList>
            <TabsTrigger value="open" className="gap-1.5">
              Open <Badge className="h-4 px-1.5 text-2xs">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="closed" className="gap-1.5">
              Closed <Badge variant="secondary" className="h-4 px-1.5 text-2xs">48</Badge>
            </TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <div className="mt-4 space-y-2">
              {["Bug: Login redirect fails","Feature: Dark mode","Chore: Update deps"].map((t) => (
                <div key={t} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <span className="text-body-sm">{t}</span>
                  <Badge variant="success">Open</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="closed">
            <p className="mt-4 text-body-sm text-muted-foreground">48 closed issues.</p>
          </TabsContent>
          <TabsContent value="archived">
            <p className="mt-4 text-body-sm text-muted-foreground">No archived issues.</p>
          </TabsContent>
        </Tabs>
      </Block>

      {/* ── Tabs — with progress content ────────────────────────────────── */}
      <Block label="Tabs — With Progress">
        <Tabs defaultValue="overview" className="max-w-xl">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader><CardTitle>Storage Usage</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Documents", value: 45 },
                  { label: "Images",    value: 70 },
                  { label: "Videos",    value: 30 },
                  { label: "Backups",   value: 85 },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card><CardHeader><CardTitle>Analytics</CardTitle></CardHeader>
              <CardContent className="text-body-sm text-muted-foreground">Analytics content here.</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card><CardHeader><CardTitle>Reports</CardTitle></CardHeader>
              <CardContent className="text-body-sm text-muted-foreground">Reports content here.</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Block>

      {/* ── Accordion — basic ───────────────────────────────────────────── */}
      <Block label="Accordion — Single">
        <Accordion type="single" collapsible className="max-w-xl">
          {[
            {
              q: "What is a design system?",
              a: "A design system is a collection of reusable components guided by clear standards that can be assembled to build any number of applications.",
            },
            {
              q: "How do tokens work?",
              a: "Design tokens are named entities that store visual design attributes (colors, spacing, typography). They map CSS custom properties to Tailwind utilities.",
            },
            {
              q: "Can I use this with Figma?",
              a: "Yes — the Figma MCP integration maps Figma variables directly to CSS custom properties. Use Claude Code with the Figma MCP server to generate code from designs.",
            },
            {
              q: "How do I add a new component?",
              a: "Run `npx shadcn@latest add <name>` or create a file in src/components/ui/ following the CVA pattern documented in CLAUDE.md.",
            },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Block>

      {/* ── Accordion — multiple ────────────────────────────────────────── */}
      <Block label="Accordion — Multiple (all open)">
        <Accordion type="multiple" defaultValue={["m0","m1","m2"]} className="max-w-xl">
          {[
            { title: "Foundations",         desc: "Colors, typography, spacing, shadows, border radius." },
            { title: "Inputs & Controls",    desc: "Button, input, textarea, checkbox, switch, label." },
            { title: "Display",              desc: "Badge, avatar, progress, skeleton, separator." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`m${i}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">0{i + 1}</Badge>
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-body-sm text-muted-foreground">{item.desc}</p>
                <Button size="sm" variant="outline" className="mt-3">View section →</Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Block>
    </Frame>
  );
}
