import "react";
import {
  ShieldCheck,
  Lock,
  Database,
  Cookie,
  UserCheck,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information",
      title: "1. Information We Collect",
      icon: Database,
      content: (
        <>
          <p>
            When you use our website, we may collect information that you
            provide directly to us, such as your name, email address, phone
            number, billing address, shipping address, and account details.
          </p>

          <p className="mt-4">
            We may also collect information related to your orders, products
            you purchase, wishlist items, and communications with our support
            team.
          </p>
        </>
      ),
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      icon: UserCheck,
      content: (
        <>
          <p>We may use your information to:</p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Process and deliver your orders.</li>
            <li>Create and manage your account.</li>
            <li>Provide customer support.</li>
            <li>Send important order and account notifications.</li>
            <li>Improve our website and shopping experience.</li>
            <li>Prevent fraud, abuse, and unauthorised activity.</li>
            <li>Comply with applicable legal requirements.</li>
          </ul>
        </>
      ),
    },
    {
      id: "sharing",
      title: "3. How We Share Your Information",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            We do not sell your personal information. We may share necessary
            information with trusted service providers who help us operate
            our business.
          </p>

          <p className="mt-4">
            For example, information may be shared with payment processors,
            shipping and delivery partners, hosting providers, analytics
            services, or customer-support providers when necessary to provide
            our services.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking Technologies",
      icon: Cookie,
      content: (
        <>
          <p>
            We may use cookies and similar technologies to keep you signed in,
            remember your preferences, understand how visitors use our
            website, and improve website functionality.
          </p>

          <p className="mt-4">
            You can control or disable cookies through your browser settings.
            However, disabling certain cookies may affect some features of the
            website.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "5. Data Security",
      icon: Lock,
      content: (
        <>
          <p>
            We take reasonable technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, disclosure, or destruction.
          </p>

          <p className="mt-4">
            However, no method of transmission or electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      title: "6. Data Retention",
      icon: Database,
      content: (
        <p>
          We retain personal information only for as long as reasonably
          necessary to provide our services, complete transactions, resolve
          disputes, comply with legal obligations, and enforce our agreements.
        </p>
      ),
    },
    {
      id: "rights",
      title: "7. Your Privacy Rights",
      icon: UserCheck,
      content: (
        <>
          <p>
            Depending on applicable law, you may have rights regarding your
            personal information, including the right to access, correct,
            update, or request deletion of certain information.
          </p>

          <p className="mt-4">
            To make a privacy-related request, please contact us using the
            contact information provided below.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      icon: ShieldCheck,
      content: (
        <p>
          Our website is not intended to knowingly collect personal
          information from children where such collection is restricted by
          applicable law. If you believe that a child has provided us with
          personal information, please contact us so that we can take
          appropriate action.
        </p>
      ),
    },
    {
      id: "changes",
      title: "9. Changes to This Privacy Policy",
      icon: ShieldCheck,
      content: (
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes to our services, technology, or legal requirements. Any
          updated version will be posted on this page with a revised
          "Last Updated" date.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-indigo-600">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-500/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <ShieldCheck size={18} />
              Your Privacy Matters
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-indigo-100">
              We respect your privacy and are committed to protecting the
              personal information you share with us.
            </p>

            <p className="mt-6 text-sm text-indigo-200">
              Last Updated: October 2, 2026
            </p>

          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">

          {/* ================= SIDEBAR ================= */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

              <h3 className="mb-4 font-semibold text-gray-900">
                On this page
              </h3>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <span>
                      {section.title.replace(/^\d+\.\s/, "")}
                    </span>

                    <ChevronRight size={15} />
                  </a>
                ))}
              </nav>

            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="min-w-0">

            {/* Introduction */}
            <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
              <div className="flex gap-4">

                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white sm:flex">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Our commitment to your privacy
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    This Privacy Policy explains what information we collect,
                    why we collect it, how we use it, and the choices you have
                    regarding your personal information when using our website
                    and services.
                  </p>
                </div>

              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-6">

              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                          {section.title}
                        </h2>

                        <div className="mt-4 text-sm leading-7 text-gray-600">
                          {section.content}
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })}

              {/* ================= CONTACT ================= */}
              <article
                id="contact"
                className="rounded-2xl bg-gray-900 p-6 text-white sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
                      <Mail size={20} />
                    </div>

                    <h2 className="text-xl font-bold">
                      Questions about your privacy?
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-300">
                      If you have questions, concerns, or requests regarding
                      this Privacy Policy or your personal information, please
                      contact our support team.
                    </p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                  >
                    Contact Us
                    <ArrowRightIcon />
                  </Link>

                </div>
              </article>

            </div>

          </main>
        </div>
      </section>

    </div>
  );
};

const ArrowRightIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default PrivacyPolicy;