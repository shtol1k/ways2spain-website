import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

// SEO Metadata
export const metadata: Metadata = {
  title: "Наші послуги - Ways 2 Spain | Digital Nomad Visa Іспанія",
  description: "Оберіть оптимальний пакет для релокації в Іспанію: від безкоштовної консультації до повного супроводу 'Все включено'.Digital Nomad Visa, модифікація статусу, легалізація родини.",
  keywords: ["послуги", "Digital Nomad Visa", "релокація Іспанія", "консультація", "оптимум", "все включено", "ціни"],
  openGraph: {
    title: "Наші послуги - Ways 2 Spain",
    description: "Оберіть рішення, яке підходить саме вам. Консультація, Лайт, Оптимум, Все включено.",
    url: "https://ways2spain.com/services",
    siteName: "Ways 2 Spain",
    locale: "uk_UA",
    type: "website",
  },
  alternates: {
    canonical: "https://ways2spain.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
