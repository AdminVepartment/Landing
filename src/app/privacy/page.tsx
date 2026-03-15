"use client";

import { ArrowLeft, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono text-primary tracking-[0.14em] uppercase">
        {number}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-none">
        <div className="max-w-3xl mx-auto h-full flex items-center justify-between px-6">
          <Link href="/landing" className="flex items-center gap-3 group">
            <div className="w-7 h-7 border border-border bg-surface flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary" />
            </div>
            <span className="text-xs font-mono tracking-[0.14em] uppercase text-foreground-muted group-hover:text-foreground transition-colors">
              Vepartment
            </span>
          </Link>
          <Link
            href="/landing"
            className="flex items-center gap-2 text-xs font-mono tracking-[0.08em] text-foreground-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={18} className="text-primary" />
              <span className="text-xs font-mono text-primary tracking-[0.14em] uppercase">
                Legal
              </span>
            </div>
            <h1 className="text-2xl font-medium text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-foreground-dim tracking-wide">
              Last updated: March 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {/* 1. Introduction */}
            <section>
              <SectionLabel number="01" label="Introduction" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Introduction
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Vepartment B.V. (&quot;Vepartment,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is an
                  AI-native platform for building and operating modular virtual
                  departments. We are committed to protecting your privacy and
                  handling your personal data responsibly.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, and
                  share your information when you use our platform, website, and
                  related services (collectively, the &quot;Service&quot;). By accessing or
                  using the Service, you acknowledge that you have read and
                  understood this policy.
                </p>
                <p>
                  Vepartment B.V. is registered in Amsterdam, Netherlands, and
                  operates in compliance with the General Data Protection
                  Regulation (GDPR) and applicable Dutch data protection law.
                </p>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <SectionLabel number="02" label="Information We Collect" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>We collect the following categories of information:</p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Account Information
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Name, email address, organization name, role, and
                      authentication credentials when you create an account.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Usage Data
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Information about how you interact with the Service,
                      including pages visited, features used, session duration,
                      device information, and browser type.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Organizational Data
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Department configurations, workflow definitions, agent
                      settings, team structures, and operational data you input
                      into the platform.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      AI Interaction Data
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Prompts, instructions, and configurations you provide to
                      AI agents, as well as the outputs generated by those
                      agents within your workspace.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section>
              <SectionLabel number="03" label="How We Use Your Information" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Provide, operate, and maintain the Service, including provisioning virtual departments and AI agents.",
                    "Enable AI agent operation within your workspace, including processing instructions, executing workflows, and generating outputs.",
                    "Analyze usage patterns and performance metrics to improve the platform, fix issues, and develop new features.",
                    "Communicate with you about your account, service updates, security alerts, and administrative matters.",
                    "Enforce our terms of service and protect the security and integrity of the platform.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. Data Processing and AI */}
            <section>
              <SectionLabel number="04" label="Data Processing and AI" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Data Processing and AI
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Vepartment&apos;s core functionality involves AI agents that process
                  organizational data on your behalf. We want to be transparent
                  about how this works:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Workspace Isolation
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      All organizational data processed by AI agents remains
                      strictly within your workspace. Data from one
                      organization&apos;s workspace is never accessible to another
                      organization&apos;s agents or users.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      No Model Training
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Your organizational data, AI interaction data, and agent
                      outputs are not used to train, fine-tune, or improve our
                      AI models or any third-party AI models.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Processing Scope
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      AI agents process data solely to fulfill the instructions
                      and workflows you configure. Processing is limited to what
                      is necessary to deliver the requested output.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Data Sharing */}
            <section>
              <SectionLabel number="05" label="Data Sharing" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Data Sharing
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We do not sell, rent, or trade your personal data or
                  organizational data to third parties. We may share data in
                  the following limited circumstances:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Third-Party Processors: We use cloud infrastructure providers and AI service providers to operate the platform. These processors are contractually bound to handle data only as instructed by us and in compliance with applicable data protection law.",
                    "Legal Requirements: We may disclose data if required by law, regulation, legal process, or governmental request, or if necessary to protect the rights, property, or safety of Vepartment, our users, or the public.",
                    "Business Transfers: In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you of any such change.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 6. Data Storage and Security */}
            <section>
              <SectionLabel number="06" label="Data Storage and Security" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Data Storage and Security
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your data:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Encryption
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      All data is encrypted in transit using TLS 1.3 and at rest
                      using AES-256 encryption.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      EU Data Centers
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      All primary data storage and processing occurs within
                      European Union data centers. Data is not transferred
                      outside the EU unless required by your configuration and
                      with appropriate safeguards in place.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Access Controls
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Access to personal and organizational data is restricted
                      to authorized personnel on a need-to-know basis. All
                      access is logged and audited.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Your Rights */}
            <section>
              <SectionLabel number="07" label="Your Rights" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Under the GDPR and applicable law, you have the following
                  rights regarding your personal data:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Right of Access: You may request a copy of the personal data we hold about you.",
                    "Right to Rectification: You may request that we correct inaccurate or incomplete personal data.",
                    "Right to Erasure: You may request that we delete your personal data, subject to legal retention obligations.",
                    "Right to Data Portability: You may request your data in a structured, commonly used, machine-readable format.",
                    "Right to Object: You may object to the processing of your personal data for certain purposes.",
                    "Right to Restrict Processing: You may request that we limit how we process your data in certain circumstances.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  To exercise any of these rights, contact us at{" "}
                  <a
                    href="mailto:privacy@vepartment.com"
                    className="text-primary hover:underline"
                  >
                    privacy@vepartment.com
                  </a>
                  . We will respond within 30 days. You also have the right to
                  lodge a complaint with the Dutch Data Protection Authority
                  (Autoriteit Persoonsgegevens).
                </p>
              </div>
            </section>

            {/* 8. Cookies */}
            <section>
              <SectionLabel number="08" label="Cookies" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Cookies
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We use a minimal set of cookies to operate the Service:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Essential Cookies
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Required for authentication, session management, and core
                      platform functionality. These cannot be disabled.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Analytics Cookies (Opt-In)
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Used to understand how users interact with the platform.
                      These are only activated with your explicit consent and
                      can be disabled at any time through your account settings.
                    </p>
                  </div>
                </div>
                <p>
                  We do not use advertising cookies or third-party tracking
                  cookies.
                </p>
              </div>
            </section>

            {/* 9. Data Retention */}
            <section>
              <SectionLabel number="09" label="Data Retention" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Data Retention
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We retain your personal and organizational data for as long
                  as your account is active and as needed to provide the
                  Service. Specifically:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Account and organizational data is retained while your account remains active.",
                    "Upon account deletion or written request, we will delete your personal data within 30 days, except where retention is required by law.",
                    "Usage and analytics data is anonymized or deleted after 24 months.",
                    "Backup copies may persist for up to 90 days after deletion before being permanently removed.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 10. Children's Privacy */}
            <section>
              <SectionLabel number="10" label="Children's Privacy" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Children&apos;s Privacy
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  The Service is not directed to individuals under the age of
                  16. We do not knowingly collect personal data from children.
                  If we become aware that we have collected personal data from
                  a child under 16, we will take steps to delete that
                  information promptly. If you believe a child has provided us
                  with personal data, please contact us at{" "}
                  <a
                    href="mailto:privacy@vepartment.com"
                    className="text-primary hover:underline"
                  >
                    privacy@vepartment.com
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* 11. Changes to This Policy */}
            <section>
              <SectionLabel number="11" label="Changes to This Policy" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  other factors. When we make material changes, we will notify
                  you by email or through a prominent notice on the Service at
                  least 30 days before the changes take effect.
                </p>
                <p>
                  We encourage you to review this policy periodically. Your
                  continued use of the Service after changes become effective
                  constitutes acceptance of the revised policy.
                </p>
              </div>
            </section>

            {/* 12. Contact */}
            <section>
              <SectionLabel number="12" label="Contact" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  If you have questions about this Privacy Policy or our data
                  practices, contact us:
                </p>
                <div className="border border-border bg-surface p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-foreground-dim w-20 shrink-0">
                      Entity
                    </span>
                    <span className="text-sm text-foreground">
                      Vepartment B.V.
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-foreground-dim w-20 shrink-0">
                      Location
                    </span>
                    <span className="text-sm text-foreground">
                      Amsterdam, Netherlands
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-foreground-dim w-20 shrink-0">
                      Email
                    </span>
                    <a
                      href="mailto:privacy@vepartment.com"
                      className="text-sm text-primary hover:underline"
                    >
                      privacy@vepartment.com
                    </a>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-foreground-dim w-20 shrink-0">
                      Website
                    </span>
                    <a
                      href="https://vepartment.com"
                      className="text-sm text-primary hover:underline"
                    >
                      vepartment.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-foreground-dim">
                Vepartment B.V. &mdash; Amsterdam, Netherlands
              </span>
              <Link
                href="/terms"
                className="text-xs font-mono text-foreground-muted hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
