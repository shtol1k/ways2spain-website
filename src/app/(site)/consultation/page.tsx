import { CircleCheckBig, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

// SEO Metadata
export const metadata: Metadata = {
  title: "Безкоштовна консультація - Ways 2 Spain | Запис на консультацію",
  description: "Запишіться на безкоштовну 30-хвилинну консультацію щодо Digital Nomad Visa в Іспанії. Персональні рекомендації, покроковий план.",
  keywords: ["консультація", "безкоштовно", "Google Meet", "запис", "Digital Nomad Visa"],
  openGraph: {
    title: "Безкоштовна консультація - Ways 2 Spain",
    description: "Запис на первинну безкоштовну консультацію для оцінки вашого кейсу та персональних рекомендацій",
    url: "https://ways2spain.com/consultation",
    siteName: "Ways 2 Spain",
    locale: "uk_UA",
    type: "website",
  },
  alternates: {
    canonical: "https://ways2spain.com/consultation",
  },
};

export default async function ConsultationPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'consultation' } },
    limit: 1,
    depth: 2,
  })
  const consultationPage = docs[0] ?? null

  return (
    <div className="min-h-screen">
      {consultationPage?.layout && consultationPage.layout.length > 0 && (
        <RenderBlocks blocks={consultationPage.layout} />
      )}
      <div className="pb-20 lg:pb-32 pt-6">
        <div className="container mx-auto px-4 lg:px-8">
        {/* Google Calendar header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-2">Оберіть дату та час</h2>
          <p className="text-muted-foreground">
            Натисніть на вільний слот у календарі для запису на консультацію
          </p>
        </div>

        {/* Google Calendar iframe - responsive with loading optimization */}
        <div className="rounded-xl overflow-hidden border border-border shadow-elegant mb-12">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jTGctAysecOcYEy5V3MKyBfqGNW1UlWUBxuNtv5XJrgNBSre5zhTu18d5jw8-TMYeB6BCl9uz?gv=true"
            style={{ border: 0 }}
            className="w-full h-[500px] md:h-[600px] lg:h-[800px]"
            frameBorder="0"
            title="Google Calendar Appointment Scheduling"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Additional Info - dark gradient card */}
        <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-primary-foreground mb-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center color-content-primary-inverse">Що отримаєте на консультації?</h3>
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-start">
                <CircleCheckBig className="w-6 h-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-primary-foreground/90 text-lg">Персональну оцінку вашого кейсу переїзду до Іспанії</span>
              </li>
              <li className="flex items-start">
                <CircleCheckBig className="w-6 h-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-primary-foreground/90 text-lg">Покроковий план дій залежно від вашої ситуації</span>
              </li>
              <li className="flex items-start">
                <CircleCheckBig className="w-6 h-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-primary-foreground/90 text-lg">Відповіді на всі ваші питання щодо віз, документів та життя в Іспанії</span>
              </li>
              <li className="flex items-start">
                <CircleCheckBig className="w-6 h-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-primary-foreground/90 text-lg">Рекомендації по документах та підготовці до подання заявки</span>
              </li>
              <li className="flex items-start">
                <CircleCheckBig className="w-6 h-6 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-primary-foreground/90 text-lg">Інформацію про терміни, вартість та можливі ризики</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA - outside the card */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">
            Не знайшли зручний час або маєте термінове питання?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="h-14 px-10 text-base">
                Написати нам
              </Button>
            </Link>
            <a
              href="https://t.me/ways2spain_assistant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="h-14 px-10 text-base">
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
