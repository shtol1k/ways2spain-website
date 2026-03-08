import { CircleCheckBig, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

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

export default function ConsultationPage() {
  return (
    <div className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header - centered */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Безкоштовна консультація</h1>
          <p className="text-xl text-muted-foreground">
            Запис на первинну безкоштовну консультацію для оцінки вашого кейсу та персональних рекомендацій
          </p>
        </div>

        {/* Benefits - full width grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-strong transition-smooth">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 mb-4">
              <Image
                src="/icon_time.svg"
                alt="30 хвилин"
                width={44}
                height={44}
                className="w-11 h-11"
              />
            </div>
            <h3 className="font-semibold mb-2">30 хвилин</h3>
            <p className="text-sm text-muted-foreground">
              Оптимальний час для розбору вашого кейсу та відповідей на питання
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-strong transition-smooth">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 mb-4">
              <Image
                src="/icon_personal.svg"
                alt="Персональна консультація"
                width={44}
                height={44}
                className="w-11 h-11"
              />
            </div>
            <h3 className="font-semibold mb-2">Персонально</h3>
            <p className="text-sm text-muted-foreground">
              Аналіз вашої унікальної ситуації та рекомендації крок за кроком
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-strong transition-smooth">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 mb-4">
              <Image
                src="/icon_google_meet.svg"
                alt="Онлайн консультація"
                width={44}
                height={44}
                className="w-11 h-11"
              />
            </div>
            <h3 className="font-semibold mb-2">Онлайн</h3>
            <p className="text-sm text-muted-foreground">
              Консультація через Google Meet у зручний для вас час
            </p>
          </div>
        </div>

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
  );
}
