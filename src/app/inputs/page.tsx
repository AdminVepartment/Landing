import { Frame, Block } from "@/components/showcase/frame";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { IconPlus, IconCheck, IconSearch, IconMail, IconLoader } from "@/components/icons";

export default function InputsPage() {
  return (
    <Frame
      group="02 · Inputs & Controls"
      title="Inputs & Controls"
      description="Buttons, text fields, checkboxes, switches, and labels."
    >
      {/* ── Buttons — variants ──────────────────────────────────────────── */}
      <Block label="Button — Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </Block>

      {/* ── Buttons — sizes ─────────────────────────────────────────────── */}
      <Block label="Button — Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><IconSearch /></Button>
        </div>
      </Block>

      {/* ── Buttons — states & icons ────────────────────────────────────── */}
      <Block label="Button — States & Icons">
        <div className="flex flex-wrap items-center gap-3">
          <Button><IconPlus /> Add item</Button>
          <Button variant="outline"><IconCheck /> Confirm</Button>
          <Button variant="secondary"><IconMail /> Send email</Button>
          <Button disabled><IconLoader className="animate-spin" /> Loading…</Button>
          <Button variant="destructive" disabled>Disabled</Button>
        </div>
      </Block>

      {/* ── Text input ──────────────────────────────────────────────────── */}
      <Block label="Input — Text Field" hint="States: default · focus · disabled · with label">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="default-input">Default</Label>
            <Input id="default-input" placeholder="Placeholder text" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="filled-input">Filled</Label>
            <Input id="filled-input" defaultValue="Filled value" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="disabled-input">Disabled</Label>
            <Input id="disabled-input" disabled placeholder="Disabled" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email-input">Email</Label>
            <Input id="email-input" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password-input">Password</Label>
            <Input id="password-input" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="search-input">Search</Label>
            <Input id="search-input" type="search" placeholder="Search…" />
          </div>
        </div>
      </Block>

      {/* ── Textarea ────────────────────────────────────────────────────── */}
      <Block label="Textarea" hint="Multi-line text input">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ta-default">Message</Label>
            <Textarea id="ta-default" placeholder="Write your message…" rows={4} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ta-filled">Notes (filled)</Label>
            <Textarea id="ta-filled" defaultValue={"Some existing content.\nLine two of the note."} rows={4} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ta-disabled">Disabled</Label>
            <Textarea id="ta-disabled" disabled placeholder="Disabled textarea" rows={4} />
          </div>
        </div>
      </Block>

      {/* ── Checkbox ────────────────────────────────────────────────────── */}
      <Block label="Checkbox" hint="Checked · unchecked · disabled states">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="cb1" />
              <Label htmlFor="cb1">Unchecked</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb2" defaultChecked />
              <Label htmlFor="cb2">Checked</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb3" disabled />
              <Label htmlFor="cb3" className="text-muted-foreground">Disabled</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cb4" disabled defaultChecked />
              <Label htmlFor="cb4" className="text-muted-foreground">Disabled checked</Label>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground mb-1">Group example</p>
            {["Email notifications","Push alerts","Weekly digest","Marketing"].map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                <Checkbox id={`group-${i}`} defaultChecked={i < 2} />
                <Label htmlFor={`group-${i}`}>{item}</Label>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* ── Switch ──────────────────────────────────────────────────────── */}
      <Block label="Switch" hint="On · off · disabled states">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch id="sw1" />
              <Label htmlFor="sw1">Off</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw2" defaultChecked />
              <Label htmlFor="sw2">On</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw3" disabled />
              <Label htmlFor="sw3" className="text-muted-foreground">Disabled off</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw4" disabled defaultChecked />
              <Label htmlFor="sw4" className="text-muted-foreground">Disabled on</Label>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-label-lg text-muted-foreground mb-1">Settings group</p>
            {["Notifications","Dark mode","Auto-save","Beta features"].map((item, i) => (
              <div key={item} className="flex items-center justify-between gap-16">
                <Label htmlFor={`sw-g-${i}`}>{item}</Label>
                <Switch id={`sw-g-${i}`} defaultChecked={i === 0 || i === 2} />
              </div>
            ))}
          </div>
        </div>
      </Block>
    </Frame>
  );
}
