import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsOfUse } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <LegalPage doc={termsOfUse} />;
}
