'use client';

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const packages = [
  {
    id: "consultation",
    name: "Перша консультація",
    price: "Безкоштовно",
    description: "Первинна оцінка вашого кейсу",
    features: [
      { text: "Індивідуальна онлайн-зустріч, 30хв", included: true },
      { text: "Аналіз вашого кейсу та рекомендації щодо найкращого шляху", included: true },
      { text: "Пояснення щодо вимог, документів і термінів", included: true },
      { text: "Відповіді на ваші запитання", included: true },
      { text: "Підготовка документів", included: false },
      { text: "Подача і відслідковування статусу заявки", included: false },
      { text: "Відповіді на дозапити", included: false },
      { text: "Супровід процесу", included: false },
    ],
    popular: false,
  },
  {
    id: "base",
    name: "Базовий",
    price: "450",
    description: "Консультація та перевірка документів",
    features: [
      { text: "Консультації до 2 годин", included: true },
      { text: "Розробка персоналізованої стратегії", included: true },
      { text: "Чек-ліст по документам під ваш кейс", included: true },
      { text: "Перевірка всіх документів перед подачею", included: true },
      { text: "Інструкції з подачі заявки", included: true },
      { text: "Супровід подачі", included: false },
      { text: "Переклади та апостилі", included: false },
      { text: "Подача заявки", included: false },
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Стандарт",
    price: "1000",
    description: "Повний супровід процесу",
    features: [
      { text: "Консультації до 5 годин", included: true },
      { text: "Координація процесу отримання декларації про вʼїзд (Declaración de Entrada)", included: true },
      { text: "Підготовка повного плану дій з контактами перевірених перекладачів та нотаріусів", included: true },
      { text: "Заповнення всіх необхідних форм та заяв", included: true },
      { text: "Доступ до системи для відслідковування статусу підготовки документів", included: true },
      { text: "Супровід процесу отримання цифрового підпису", included: true },
      { text: "Подача і відслідковування статусу заявки", included: true },
      { text: "Відповідь на дозапити міграційної служби", included: true },
      { text: "Оплата зборів і мит", included: false },
      { text: "Супровід до отримання ТІЕ", included: false },
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Преміум",
    price: "1,500",
    description: "Максимальний комфорт та підтримка",
    features: [
      { text: "Все з пакету 'Оптимум'", included: true },
      { text: "Необмежена кількість консультацій впродовж процесу'", included: true },
      { text: "Ми готуємо всі документи і переглади замість вас", included: true },
      { text: "Оплата зборів і мит", included: true },
      { text: "Супровід до отримання TIE", included: true },
      { text: "Допомога у відкритті Autónomo", included: true },
      { text: "Допомога у реєстрації в Seguridad Social", included: true },
      { text: "Допомога у адаптації в Іспанії", included: true },
    ],
    popular: false,
  },
];

const additionalServices = [
  {
    title: "Додаткова консультація",
    price: "50 / 30хв",
    description: "Відповіді на будь які додаткові питання стосовно легалізації і візи Digital Nomad.",
  },
  {
    title: "Перереєстрація автомобіля",
    price: "450",
    description: "Підготовка документів і допомога у проходженні техогляду для постановки автомобіля на іспанські номери.",
  },
  {
    title: "Модифікація статусу",
    price: "790",
    description: "Зміна з тимчасового захисту на Digital Nomad Visa",
  },
  {
    title: "Продовження візи",
    price: "690",
    description: "Повний супровід продовження Digital Nomad Visa",
  },
];

export default function ServicesContent() {
  // Google Calendar scheduling URL
  const CALENDAR_URL =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jTGctAysecOcYEy5V3MKyBfqGNW1UlWUBxuNtv5XJrgNBSre5zhTu18d5jw8-TMYeB6BCl9uz?gv=true";

  const openCalendar = () => {
    window.open(CALENDAR_URL, '_blank', 'width=600,height=700');
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">Наші послуги</h1>
          <p className="text-xl text-muted-foreground">
            Оберіть рішення, яке підходить саме вам
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-xl p-6 border transition-smooth hover:shadow-strong flex flex-col ${
                pkg.popular
                  ? "border-secondary shadow-elegant scale-105 lg:scale-110"
                  : "border-border shadow-elegant hover:scale-105"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full gradient-accent text-accent-foreground text-sm font-bold">
                    Найпопулярніший
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {pkg.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {pkg.price === "Безкоштовно" ? "Безкоштовно" : `€${pkg.price}`}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start space-x-2">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included ? "text-foreground" : "text-muted-foreground/60"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <Link href={`/services/${pkg.id}`} className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Детальніше про послугу
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button
                    variant={pkg.popular ? "hero" : "secondary"}
                    className="w-full"
                    size="lg"
                  >
                    Замовити
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Додаткові послуги
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-strong transition-smooth"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <span className="text-2xl font-bold text-secondary">
                    €{service.price}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Дізнатись більше
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-linear-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 color-content-primary-inverse">
              Не впевнені який пакет обрати?
            </h3>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Отримайте безкоштовну консультацію, і ми допоможемо визначити оптимальний варіант для вашої ситуації
            </p>
            <Button
              variant="secondary"
              size="xl"
              onClick={openCalendar}
            >
              Безкоштовна консультація
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
