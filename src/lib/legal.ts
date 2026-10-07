import { brand } from "./site";

/**
 * Legal documents — real, DPDP-aligned text specific to Be Good Event Consulting.
 *
 * NOTE FOR THE CLIENT / LAUNCH: two fields genuinely need human input before
 * this goes live — (1) name the individual Grievance Officer (DPDP expects a
 * named person, not just a role), and (2) confirm the retention period and
 * effective date. Everything else is accurate to how the site actually works.
 */

const ADDRESS = `${brand.address.line1}, ${brand.address.line2}, ${brand.address.city}, ${brand.address.state} ${brand.address.pincode}`;

export type LegalDoc = {
  title: string;
  updated: string;
  intro?: string;
  sections: { heading: string; body: string[] }[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  updated: "8 October 2026",
  intro:
    "Be Good Event Consulting (\"Be Good\", \"we\", \"us\", \"our\") is an event consulting firm based in Thiruvananthapuram, Kerala, India. This Privacy Policy explains how we handle personal data — information relating to an identifiable individual — in accordance with the Digital Personal Data Protection Act, 2023 (\"DPDP Act\") and the rules made under it.",
  sections: [
    {
      heading: "1. Scope of this policy",
      body: [
        "This policy applies to personal data you share with us when you use this website or contact us through WhatsApp, telephone, email, or in person to enquire about or engage our event consulting services.",
      ],
    },
    {
      heading: "2. Personal data we collect",
      body: [
        "We do not automatically collect any personal data through this website. The website is a static brochure: it does not use cookies, analytics or tracking, and it does not collect information about your device, browsing or location.",
        "We collect only the personal data you choose to provide when you contact us. This typically includes your name, phone number, email address, and details of the event you want to plan — such as the type of event, date, location and expected audience.",
      ],
    },
    {
      heading: "3. How we collect it",
      body: [
        "Directly from you. The \"Plan your event\" form on this website does not transmit your details to any server. It prepares a message and opens WhatsApp on your device; your details are shared with us only when you send that message. You may also share details by email, telephone or in person.",
      ],
    },
    {
      heading: "4. How we use your personal data",
      body: [
        "We use the personal data you share to respond to your enquiry, understand your event requirements, prepare proposals, and provide event consulting services. We also process it as needed to meet our legal and record-keeping obligations.",
        "We do not use your personal data for marketing unless you separately agree to it, and we never sell your personal data.",
      ],
    },
    {
      heading: "5. Consent",
      body: [
        "By contacting us or submitting an enquiry, you consent to our using the personal data you share for the purposes described above. You may withdraw your consent at any time by writing to the Grievance Officer (details below). Withdrawing consent does not affect the lawfulness of processing carried out before the withdrawal.",
      ],
    },
    {
      heading: "6. Who we share your data with",
      body: [
        "We share personal data only where necessary: (a) with WhatsApp (Meta Platforms, Inc.) when you contact us through WhatsApp, subject to Meta's own privacy terms; (b) with website-hosting and content-delivery providers (currently GitHub Pages; we may also use Cloudflare or similar providers); (c) with venues, vendors and service providers we engage to deliver your event, only as needed and with your knowledge; and (d) where required by law or to protect rights and safety.",
        "We do not sell personal data.",
      ],
    },
    {
      heading: "7. Cross-border transfer",
      body: [
        "Some of our processors — for example, WhatsApp and our hosting providers — may process data outside India. We engage providers that offer contractual data-protection safeguards, and we transfer personal data only in accordance with applicable Indian law, including any cross-border transfer restrictions notified by the Government of India.",
      ],
    },
    {
      heading: "8. Data retention",
      body: [
        "We keep enquiry and contact data only as long as needed to respond to you and provide our services, and afterwards only as long as required by law (for example, financial and tax records). We delete or securely dispose of personal data that is no longer required.",
      ],
    },
    {
      heading: "9. Your rights under the DPDP Act",
      body: [
        "You may ask us for: access to the personal data we hold about you; correction or completion of data that is inaccurate or incomplete; erasure of data that is no longer needed; and redressal of any grievance. To exercise any of these rights, contact the Grievance Officer below. We will respond within the time required by law.",
      ],
    },
    {
      heading: "10. Security",
      body: [
        "We apply reasonable technical and organisational measures to protect personal data. Please note that this website itself does not store your personal data; information you share by WhatsApp, email or telephone is held in those channels and in our internal records.",
      ],
    },
    {
      heading: "11. Children's data",
      body: [
        "Our services are intended for businesses and adults. We do not knowingly collect personal data from children under 18, and if we learn that we have, we will seek verifiable parental consent or delete the data.",
      ],
    },
    {
      heading: "12. Grievance Officer",
      body: [
        `Grievance Officer: ${brand.legalName}.`,
        `Email: ${brand.email}  |  Phone: ${brand.phoneDisplay}`,
        `Postal: ${ADDRESS}.`,
        "Please mark your communication \"Grievance — Data Protection\" so it reaches the right person promptly.",
      ],
    },
    {
      heading: "13. Changes to this policy",
      body: [
        "We may update this Privacy Policy from time to time. The date at the top of this page shows when it was last revised. Material changes will be highlighted on this page.",
      ],
    },
    {
      heading: "14. Contact us",
      body: [
        `For any privacy-related question, write to us at ${brand.email}, call ${brand.phoneDisplay}, or post to ${ADDRESS}.`,
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  title: "Terms of Use",
  updated: "8 October 2026",
  intro:
    "These Terms of Use govern your access to and use of the Be Good Event Consulting website.",
  sections: [
    {
      heading: "1. Acceptance of these terms",
      body: [
        "By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.",
      ],
    },
    {
      heading: "2. About this website",
      body: [
        "This website is operated by Be Good Event Consulting and provides information about our event consulting services. It is provided for general information only.",
      ],
    },
    {
      heading: "3. Enquiries and services",
      body: [
        "Submitting an enquiry through this website (which opens WhatsApp or email) does not create a client relationship or any obligation on us. Services are provided under a separate written agreement. We may decline an enquiry or engagement at our discretion.",
      ],
    },
    {
      heading: "4. Intellectual property",
      body: [
        "All content on this site, including text, graphics, and the \"Be Good\" name and logo, is owned by or licensed to us and is protected by applicable intellectual-property laws. You may not reproduce or use it without our prior written permission.",
      ],
    },
    {
      heading: "5. Third-party platforms and links",
      body: [
        "This site links to third-party platforms such as WhatsApp. We are not responsible for their content, availability or privacy practices, and your use of those platforms is subject to their own terms.",
      ],
    },
    {
      heading: "6. No warranty",
      body: [
        "While we aim to keep the information on this site accurate and current, the site is provided \"as is\" and without warranties of any kind. We do not guarantee that it will be uninterrupted or error-free.",
      ],
    },
    {
      heading: "7. Limitation of liability",
      body: [
        "To the fullest extent permitted by law, Be Good Event Consulting is not liable for any indirect, incidental or consequential loss arising from your use of this website.",
      ],
    },
    {
      heading: "8. Governing law and jurisdiction",
      body: [
        "These terms are governed by the laws of India, and any dispute is subject to the exclusive jurisdiction of the courts of Thiruvananthapuram, Kerala.",
      ],
    },
    {
      heading: "9. Changes to these terms",
      body: [
        "We may update these terms from time to time. The date at the top of this page shows the last revision.",
      ],
    },
    {
      heading: "10. Contact",
      body: [
        `Questions about these terms can be sent to ${brand.email} or to ${ADDRESS}.`,
      ],
    },
  ],
};
