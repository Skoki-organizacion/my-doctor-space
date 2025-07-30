"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CompactPrivacyPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content:
        "This Privacy Policy describes how we collect, use, and handle your personal information when you use our website and services. We are committed to protecting your privacy and ensuring the security of your personal information. By using our service, you agree to the collection and use of information in accordance with this policy.",
    },
    {
      id: "information-collection",
      title: "2. Information We Collect",
      content:
        "We may collect personal information such as name, email, account credentials, payment information, and communication history. We also automatically collect usage information including IP address, device data, browser type, pages visited, and operating system details to improve our services.",
    },
    {
      id: "information-use",
      title: "3. How We Use Your Information",
      content:
        "We use collected information to provide and maintain our service, process transactions, send support messages, respond to inquiries, improve our website, personalize your experience, detect fraud, and comply with legal obligations. All usage is aimed at enhancing your service experience.",
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share information with trusted service providers who assist in operating our website, when required by law to protect our rights, during business transfers like mergers or acquisitions, or with your explicit consent.",
    },
    {
      id: "cookies",
      title: "5. Cookies and Tracking Technologies",
      content:
        "We use essential cookies required for website functionality, analytics cookies to understand visitor usage, preference cookies to remember your settings, and marketing cookies to deliver relevant advertisements. You can control cookies through browser settings, though disabling certain cookies may affect functionality.",
    },
    {
      id: "security",
      title: "6. Data Security",
      content:
        "We implement encryption of data in transit and at rest, conduct regular security assessments and updates, maintain access controls and authentication measures, provide employee training on data protection, and have incident response procedures. However, no method of internet transmission is 100% secure.",
    },
    {
      id: "retention",
      title: "7. Data Retention",
      content:
        "We retain personal information only as long as necessary for outlined purposes or as required by law. When we no longer need your personal information, we securely delete or anonymize it according to our data retention policies and applicable legal requirements.",
    },
    {
      id: "rights",
      title: "8. Your Rights and Choices",
      content:
        "You may have rights to access, correct, delete, port, restrict, or object to processing of your personal information depending on your location. You can also withdraw consent where processing is based on consent. Contact us to exercise these rights or for more information about your privacy options.",
    },
    {
      id: "children",
      title: "9. Children's Privacy",
      content:
        "Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.",
    },
    {
      id: "transfers",
      title: "10. International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries other than your own, which may have different data protection laws. When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your privacy and rights.",
    },
    {
      id: "changes",
      title: "11. Changes to This Privacy Policy",
      content:
        "We may update this policy from time to time and will notify you of material changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. We encourage you to review this policy periodically for any changes.",
    },
    {
      id: "contact",
      title: "12. Contact Us",
      content:
        "For questions about this Privacy Policy or our privacy practices, contact our Privacy Officer at privacy@yourcompany.com, call (555) 123-4567, or write to 123 Main Street, City, State 12345. For EU residents, you can also contact our Data Protection Officer at dpo@yourcompany.com.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Link
                href={"/"}
                className="flex items-center gap-2 w-full justify-center mb-6"
              >
                <Image
                  src={"/logo.png"}
                  alt={"Doctor space logo"}
                  width={153}
                  height={57}
                  priority
                />
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="space-y-4">
              {sections.map((section) => (
                <Collapsible
                  key={section.id}
                  open={openSections[section.id]}
                  onOpenChange={() => toggleSection(section.id)}
                  className="border border-muted-foreground/10 rounded-lg"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left rounded-lg transition-colors cursor-pointer">
                    <h3 className="text-lg font-semibold ">{section.title}</h3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        openSections[section.id] ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
