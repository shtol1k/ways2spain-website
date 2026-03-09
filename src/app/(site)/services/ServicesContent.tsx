'use client';

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PackageComparisonTable } from "@/components/PackageComparisonTable";

const packages = [
  {
    id: "consultation",
    name: "Перша консультація",
    price: "Безкоштовно",
    description: "Первинна оцінка вашого кейсу",
    features: [
      { text: "Індивідуальна онлайн-зустріч, 30хв", included: true },
      { text: "Адаптаційний гайд по адаптації в Іспанії", included: true },
      { text: "Персоналізований чек-лист документів", included: false },
      { text: "Подача документів та відслідковування статусу", included: false },
      { text: "Супровід після отримання резидентства", included: false },
    ],
    popular: false,
  },
  {
    id: "base",
    name: "Базовий",
    price: "300",
    description: "Консультація та перевірка документів",
    features: [
      { text: "Консультації до 2 годин", included: true },
      { text: "Персоналізований чек-лист документів", included: true },
      { text: "Адаптаційний гайд по адаптації в Іспанії", included: true },
      { text: "Розробка стратегії відповіді у разі дозапиту", included: true },
      { text: "Подача документів та відслідковування статусу", included: false },
      { text: "Супровід після отримання резидентства", included: false },
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Стандарт",
    price: "1000",
    description: "Повний супровід процесу",
    features: [
      { text: "Консультації до 6 годин", included: true },
      { text: "Доступ до відслідковування статусу", included: true },
      { text: "Координація легалізації, перекладів та декларацій", included: true },
      { text: "Підготовка/переклад всіх необхідних документів", included: true },
      { text: "Подача документів із нашим цифровим підписом", included: true },
      { text: "Запис на здачу відбитків (ТІЕ) та реєстрація autónomo", included: true },
      { text: "Повернення коштів у разі відмови", included: false },
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Преміум",
    price: "1500",
    description: "Максимальний комфорт та підтримка",
    features: [
      { text: "Необмежена кількість консультацій", included: true },
      { text: "Оплата мита за розгляд Tasa", included: true },
      { text: "Заповнення документів (ТІЕ) та відслідковування готовності", included: true },
      { text: "Допомога з відкриттям банківського рахунку", included: true },
      { text: "Запис на реєстрацію проживання (Padrón)", included: true },
      { text: "Супровід реєстрації автомобіля в Іспанії", included: true },
      { text: "Повернення коштів у разі відмови", included: true },
    ],
    popular: false,
  },
];

const additionalServices = [
  {
    title: "Модифікація з тимчасового захисту",
    price: "500",
    description: "Повний супровід процесу зміни статусу з тимчасового захисту на резиденцію Digital Nomad. (дружина, діти до 18 років - безкоштовно)",
  },
  {
    title: "Консультація (30 хвилин)",
    price: "50",
    description: "Детальний розбір вашої ситуації, перевірка відповідності критеріям DN резиденції та відповіді на всі технічні питання щодо процесу.",
  },
  {
    title: "Заповнення та оплата Tasa 790 038",
    price: "100",
    description: "Підготовка бланка та сплата державного збору за розгляд справи (Ціна включає вартість мита).",
  },
  {
    title: "Оплата мита Tasa 790 012",
    price: "50",
    description: "Оформлення та сплата збору за випуск пластикової картки резидента (TIE) (Ціна включає вартість мита).",
  },
  {
    title: "Допомога з відповіддю на дозапит (для неклієнтів)",
    price: "100",
    description: "Розробка стратегії та документів для відповіді на дозапит.",
  },
  {
    title: "Подача з нашим цифровим підписом (1 заявка)",
    price: "50",
    description: "Максимально швидка дистанційна подача через систему UGE. Працюємо без прив’язки до графіку держустанов: можлива подача навіть у вихідні та святкові дні, щоб не втратити жодного дня вашого терміну перебування.",
  },
  {
    title: "Заповнення EX, Tasa, декларації для розгляду (1 заявка)",
    price: "50",
    description: "Повний пакет заповнених анкет та декларацій, необхідних для вашої справи.",
  },
  {
    title: "Технічний переклад документів",
    price: "4 / стор.",
    description: "Якісний переклад довідок, сертифікатів або виписок, які не потребують печатки присяжного перекладача (Traductor Jurado).",
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
                {/* Сторінки деталей послуг не публікуються в першому релізі */}
                {/* <Link href={`/services/${pkg.id}`} className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Детальніше про послугу
                  </Button>
                </Link> */}
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

        {/* Package Comparison Table */}
        <div id="package-comparison" className="mb-20">
          <PackageComparisonTable />
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
