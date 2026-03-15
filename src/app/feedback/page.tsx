import { Frame, Block } from "@/components/showcase/frame";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconAlertCircle, IconAlertTriangle,
  IconCheckCircle, IconInfo, IconX,
} from "@/components/icons";

export default function FeedbackPage() {
  return (
    <Frame
      group="04 · Feedback"
      title="Feedback"
      description="Alerts and status messages for communicating system state to users."
    >
      {/* ── Alert — variants ────────────────────────────────────────────── */}
      <Block label="Alert — Variants">
        <div className="max-w-2xl space-y-3">
          <Alert>
            <IconInfo className="h-4 w-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>
              This is a default informational alert for general messages.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <IconCheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your profile has been updated successfully.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <IconAlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Your account storage is 90% full. Consider upgrading your plan.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong while processing your request. Please try again.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <IconInfo className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              A new version is available. Refresh to update.
            </AlertDescription>
          </Alert>
        </div>
      </Block>

      {/* ── Alert — no icon ─────────────────────────────────────────────── */}
      <Block label="Alert — Title Only" hint="Without icon">
        <div className="max-w-2xl space-y-3">
          <Alert>
            <AlertTitle>Session expiring</AlertTitle>
            <AlertDescription>You will be logged out in 5 minutes due to inactivity.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Payment failed</AlertTitle>
            <AlertDescription>We could not charge your card ending in 4242.</AlertDescription>
          </Alert>
        </div>
      </Block>

      {/* ── Alert — with action ─────────────────────────────────────────── */}
      <Block label="Alert — With Action">
        <div className="max-w-2xl space-y-3">
          <Alert variant="warning">
            <IconAlertTriangle className="h-4 w-4" />
            <AlertTitle>Unsaved changes</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>You have unsaved changes. Save or discard before leaving.</span>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline">Discard</Button>
                <Button size="sm">Save now</Button>
              </div>
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <IconInfo className="h-4 w-4" />
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>Try the new dashboard — now with real-time updates.</span>
              <Button size="sm" variant="outline" className="mt-2">Try it</Button>
            </AlertDescription>
          </Alert>
        </div>
      </Block>

      {/* ── Toast-style banners ─────────────────────────────────────────── */}
      <Block label="Status Banners" hint="Inline status banners with badge + message">
        <div className="max-w-2xl space-y-2">
          {[
            { variant: "success" as const,     icon: IconCheckCircle,   label: "Saved",    msg: "All changes saved automatically." },
            { variant: "warning" as const,     icon: IconAlertTriangle, label: "Pending",  msg: "Awaiting approval from your team." },
            { variant: "destructive" as const, icon: IconAlertCircle,   label: "Failed",   msg: "Export failed. Check your connection." },
            { variant: "info" as const,        icon: IconInfo,          label: "Syncing",  msg: "Syncing your data in the background." },
          ].map(({ variant, icon: Icon, label, msg }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border px-4 py-3">
              <Badge variant={variant}>{label}</Badge>
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <p className="text-body-sm text-muted-foreground flex-1">{msg}</p>
              <button className="text-muted-foreground hover:text-foreground">
                <IconX className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Block>
    </Frame>
  );
}
