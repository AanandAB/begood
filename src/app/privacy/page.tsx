import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Be Good",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
