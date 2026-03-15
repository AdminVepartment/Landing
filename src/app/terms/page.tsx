"use client";

import { ArrowLeft, FileText } from "lucide-react";
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

export default function TermsOfServicePage() {
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
              <FileText size={18} className="text-primary" />
              <span className="text-xs font-mono text-primary tracking-[0.14em] uppercase">
                Legal
              </span>
            </div>
            <h1 className="text-2xl font-medium text-foreground mb-3">
              Terms of Service
            </h1>
            <p className="text-sm font-mono text-foreground-dim tracking-wide">
              Last updated: March 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {/* 1. Acceptance of Terms */}
            <section>
              <SectionLabel number="01" label="Acceptance of Terms" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  By accessing or using the Vepartment platform and related
                  services (the &quot;Service&quot;), you agree to be bound by these
                  Terms of Service (&quot;Terms&quot;). If you are using the Service on
                  behalf of an organization, you represent that you have the
                  authority to bind that organization to these Terms.
                </p>
                <p>
                  If you do not agree to these Terms, you must not access or
                  use the Service. These Terms constitute a legally binding
                  agreement between you and Vepartment B.V.
                </p>
              </div>
            </section>

            {/* 2. Description of Service */}
            <section>
              <SectionLabel number="02" label="Description of Service" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Description of Service
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Vepartment is an AI-native platform that enables
                  organizations to build and operate modular virtual
                  departments. The Service includes:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Virtual department creation and configuration with customizable organizational structures.",
                    "AI-powered agents that execute tasks, process information, and generate outputs within your workspace.",
                    "Workflow automation tools for defining and managing operational processes across departments.",
                    "Dashboards, analytics, and reporting capabilities for monitoring department performance.",
                    "Integration capabilities with third-party tools and data sources.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We may update, modify, or discontinue features of the Service
                  at any time. We will provide reasonable notice of material
                  changes.
                </p>
              </div>
            </section>

            {/* 3. Account Registration */}
            <section>
              <SectionLabel number="03" label="Account Registration" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Account Registration
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  To use the Service, you must create an account. When
                  registering, you agree to:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Provide accurate, current, and complete information during registration and keep it updated.",
                    "Maintain the confidentiality of your account credentials and not share them with unauthorized parties.",
                    "Accept responsibility for all activities that occur under your account.",
                    "Notify us immediately of any unauthorized access to or use of your account.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that
                  contain inaccurate information or that violate these Terms.
                </p>
              </div>
            </section>

            {/* 4. Acceptable Use */}
            <section>
              <SectionLabel number="04" label="Acceptable Use" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Acceptable Use
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  You agree to use the Service only for lawful purposes and in
                  accordance with these Terms. You must not:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Illegal Activity
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Use the Service for any purpose that violates applicable
                      local, national, or international law or regulation.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Reverse Engineering
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Reverse engineer, decompile, disassemble, or otherwise
                      attempt to derive the source code, algorithms, or
                      underlying architecture of the Service or its AI models.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      AI Agent Abuse
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Attempt to manipulate, exploit, or misuse AI agents to
                      produce harmful, misleading, or malicious outputs, or to
                      circumvent platform safety measures.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      System Interference
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      Interfere with or disrupt the Service, its servers, or
                      networks, including through denial-of-service attacks,
                      unauthorized scraping, or automated abuse.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Intellectual Property */}
            <section>
              <SectionLabel number="05" label="Intellectual Property" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  The Service, including its software, design, documentation,
                  and all related intellectual property, is owned by Vepartment
                  B.V. and protected by applicable intellectual property laws.
                  Your use of the Service does not grant you ownership of any
                  intellectual property in the platform.
                </p>
                <p>
                  You retain full ownership of all data, content, and
                  configurations you input into the Service (&quot;Your Data&quot;).
                  You also retain ownership of outputs generated by AI agents
                  based on your instructions and data, subject to applicable
                  law regarding AI-generated content.
                </p>
                <p>
                  You grant Vepartment a limited, non-exclusive license to use
                  Your Data solely as necessary to provide and improve the
                  Service.
                </p>
              </div>
            </section>

            {/* 6. AI-Generated Content */}
            <section>
              <SectionLabel number="06" label="AI-Generated Content" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                AI-Generated Content
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  The Service utilizes artificial intelligence to generate
                  content, analyses, recommendations, and outputs. By using
                  these features, you acknowledge and agree that:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      Advisory Nature
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      AI-generated outputs are aids to decision-making and are
                      not substitutes for professional judgment. You are
                      responsible for reviewing, validating, and deciding how
                      to use all AI-generated content.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      No Guarantee of Accuracy
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      We do not guarantee the accuracy, completeness,
                      reliability, or suitability of any AI-generated output.
                      AI systems may produce incorrect, incomplete, or biased
                      results.
                    </p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      User Responsibility
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      You bear sole responsibility for any actions taken based
                      on AI-generated content. Vepartment shall not be liable
                      for decisions made in reliance on such outputs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Data and Privacy */}
            <section>
              <SectionLabel number="07" label="Data and Privacy" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Data and Privacy
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Your use of the Service is also governed by our{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  , which describes how we collect, use, and protect your
                  information. By using the Service, you consent to the data
                  practices described in our Privacy Policy.
                </p>
                <p>
                  You are responsible for ensuring that your use of the Service
                  complies with all applicable data protection laws, including
                  the GDPR, particularly with respect to any personal data you
                  process through the platform.
                </p>
              </div>
            </section>

            {/* 8. Service Availability */}
            <section>
              <SectionLabel number="08" label="Service Availability" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Service Availability
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We strive to provide reliable and continuous access to the
                  Service, but we do not guarantee uninterrupted availability.
                  The Service may be temporarily unavailable due to:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Scheduled maintenance, which we will announce in advance when possible.",
                    "Unscheduled maintenance required to address security vulnerabilities or critical issues.",
                    "Factors beyond our reasonable control, including third-party service outages, natural disasters, or force majeure events.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  We will use commercially reasonable efforts to minimize
                  disruption and will communicate significant outages through
                  our status page and email notifications.
                </p>
              </div>
            </section>

            {/* 9. Subscription and Billing */}
            <section>
              <SectionLabel number="09" label="Subscription and Billing" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Subscription and Billing
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Access to the Service requires a paid subscription unless
                  otherwise specified. By subscribing, you agree to the
                  following:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "Subscription fees are billed in advance on a monthly or annual basis, as selected at the time of purchase.",
                    "We reserve the right to modify pricing with at least 30 days' written notice. Price changes will take effect at the start of your next billing cycle.",
                    "You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No partial refunds are provided for unused time.",
                    "Failure to pay fees when due may result in suspension or termination of your access to the Service.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 10. Limitation of Liability */}
            <section>
              <SectionLabel number="10" label="Limitation of Liability" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  To the maximum extent permitted by applicable law:
                </p>
                <div className="border border-border bg-surface p-5 space-y-4">
                  <p className="text-sm text-foreground-muted">
                    The Service is provided &quot;as is&quot; and &quot;as available&quot; without
                    warranties of any kind, whether express or implied,
                    including implied warranties of merchantability, fitness for
                    a particular purpose, and non-infringement.
                  </p>
                  <div className="h-px bg-border" />
                  <p className="text-sm text-foreground-muted">
                    Vepartment B.V. shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages,
                    including loss of profits, data, business opportunities, or
                    goodwill, arising out of or in connection with your use of
                    the Service.
                  </p>
                  <div className="h-px bg-border" />
                  <p className="text-sm text-foreground-muted">
                    Our total aggregate liability for all claims arising from or
                    related to the Service shall not exceed the total amount you
                    paid to Vepartment in the twelve (12) months preceding the
                    claim.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. Termination */}
            <section>
              <SectionLabel number="11" label="Termination" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  Either party may terminate this agreement as follows:
                </p>
                <ul className="space-y-2 ml-5 list-none">
                  {[
                    "You may terminate by cancelling your subscription and closing your account at any time through your account settings.",
                    "We may terminate or suspend your access immediately if you breach these Terms, engage in prohibited conduct, or if required by law.",
                    "We may terminate with 30 days' notice for any other reason.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 text-xs">&#9632;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Upon termination, you will have a 30-day data export period
                  during which you may download your data. After this period,
                  we will delete your data in accordance with our Privacy
                  Policy. Termination does not relieve you of any obligation to
                  pay outstanding fees.
                </p>
              </div>
            </section>

            {/* 12. Governing Law */}
            <section>
              <SectionLabel number="12" label="Governing Law" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Governing Law
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of the Netherlands, without regard to conflict
                  of law principles. Any disputes arising out of or in
                  connection with these Terms shall be submitted to the
                  exclusive jurisdiction of the courts of Amsterdam,
                  Netherlands.
                </p>
                <p>
                  If any provision of these Terms is found to be unenforceable
                  or invalid, that provision shall be limited or eliminated to
                  the minimum extent necessary, and the remaining provisions
                  shall remain in full force and effect.
                </p>
              </div>
            </section>

            {/* 13. Changes to Terms */}
            <section>
              <SectionLabel number="13" label="Changes to Terms" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  We reserve the right to modify these Terms at any time. When
                  we make material changes, we will provide at least 30 days&apos;
                  advance notice by email or through a prominent notice on the
                  Service.
                </p>
                <p>
                  Your continued use of the Service after the effective date of
                  the revised Terms constitutes your acceptance of the changes.
                  If you do not agree with the modified Terms, you must stop
                  using the Service before the changes take effect.
                </p>
              </div>
            </section>

            {/* 14. Contact */}
            <section>
              <SectionLabel number="14" label="Contact" />
              <h2 className="text-2xl font-medium text-foreground mb-4">
                Contact
              </h2>
              <div className="space-y-4 text-base text-foreground-muted leading-relaxed">
                <p>
                  For questions about these Terms of Service, contact us:
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
                      href="mailto:legal@vepartment.com"
                      className="text-sm text-primary hover:underline"
                    >
                      legal@vepartment.com
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
                href="/privacy"
                className="text-xs font-mono text-foreground-muted hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
