import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Service details data
const serviceDetails = {
  consultation: {
    name: "Перша консультація",
    description: "Початкова оцінка вашої ситуації",
    timeline: [
      { title: "Попередня заявка", description: "Ви заповнюєте коротку форму із базовою інформацією", actor: "client" },
      { title: "Підготовка до зустрічі", description: "Ми аналізуємо вашу заявку та готуємо список питань", actor: "agency" },
      { title: "Відеоконсультація", description: "Проводимо дзвінок, обговорюємо всі деталі", actor: "agency" },
      { title: "Перевірка документів", description: "Оцінюємо наявні документи та відповідність вимогам", actor: "agency" },
      { title: "Рекомендації", description: "Отримуєте чіткий план дій і наступні кроки", actor: "agency" },
    ],
    responsibilities: {
      agency: [
        "Проведення консультації",
        "Базовий аналіз документів",
        "План наступних кроків",
      ],
      client: ["Надання вихідної інформації", "Підготовка документів для огляду"],
    },
    pricing: [{ item: "Консультація", price: "Безкоштовно" }],
    additionalCosts: [],
  },
  base: {
    name: "Базовий",
    description: "Консультація та перевірка документів",
    timeline: [
      { title: "Детальна консультація", description: "Зустріч для розбору ситуації", actor: "agency" },
      { title: "Аналіз документів", description: "Надаєте документи для перевірки", actor: "client" },
      { title: "Рекомендації", description: "Даємо зауваження та правки до комплекту", actor: "agency" },
      { title: "Фінальна перевірка", description: "Перевірка перед подачею", actor: "agency" },
    ],
    responsibilities: {
      agency: [
        "Детальна консультація",
        "Перевірка всіх документів",
        "Чіткі інструкції з підготовки",
      ],
      client: ["Збір документів", "Внесення правок за рекомендаціями"],
    },
    pricing: [{ item: "Пакет \"Базовий\"", price: "450" }],
    additionalCosts: [
      { item: "Переклад документів (за сторінку)", price: "15-25" },
      { item: "Апостиль", price: "30-50" },
    ],
  },
  standard: {
    name: "Стандарт",
    description: "Повний супровід процесу",
    timeline: [
      { title: "Стратегічна консультація", description: "План дій і вимоги", actor: "agency" },
      { title: "Збір вихідних даних", description: "Надаєте потрібну інформацію", actor: "client" },
      { title: "Підготовка документів", description: "Готуємо всі необхідні форми та заяви", actor: "agency" },
      { title: "Переклади та легалізація", description: "Координуємо підрядників", actor: "agency" },
      { title: "Подача документів", description: "Подаємо або супроводжуємо подачу", actor: "agency" },
      { title: "Відстеження статусу", description: "Комунікація та апдейти", actor: "agency" },
    ],
    responsibilities: {
      agency: [
        "Повна підготовка документів",
        "Інструкції та координація",
        "Супровід подачі",
      ],
      client: ["Надання базових документів", "Підпис/присутність за потреби"],
    },
    pricing: [{ item: "Пакет \"Стандарт\"", price: "1000" }],
    additionalCosts: [{ item: "Нотаріальні послуги (за потреби)", price: "20-40" }],
  },
  premium: {
    name: "Преміум",
    description: "Максимальний комфорт та підтримка",
    timeline: [
      { title: "VIP консультація", description: "Індивідуальна стратегія", actor: "agency" },
      { title: "Повний пакет документів", description: "Готуємо всі папери", actor: "agency" },
      { title: "Переклади та апостилі", description: "Координація підрядників", actor: "agency" },
      { title: "Подача та супровід", description: "Повний супровід процесу", actor: "agency" },
      { title: "Отримання документів", description: "Супровід до ТІЕ", actor: "agency" },
    ],
    responsibilities: {
      agency: [
        "Все з пакету 'Оптимум'",
        "Пріоритетна підтримка",
        "Супровід родини",
      ],
      client: ["Надання вихідної інформації", "Прийняття ключових рішень"],
    },
    pricing: [{ item: "Пакет \"Преміум\"", price: "1,500" }],
    additionalCosts: [],
  },
} as const;

type ServiceKey = keyof typeof serviceDetails;

// Generate metadata for each service
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = serviceDetails[id as ServiceKey];

  if (!service) {
    return {
      title: "Послугу не знайдено - Ways 2 Spain",
    };
  }

  return {
    title: `${service.name} - Ways 2 Spain | ${service.description}`,
    description: `Детальний опис послуги "${service.name}". Процес роботи, розподіл відповідальності, вартість.`,
    openGraph: {
      title: `${service.name} - Ways 2 Spain`,
      description: service.description,
      url: `https://ways2spain.com/services/${id}`,
      type: "website",
      images: [
        {
          url: '/opengraph.png',
          width: 1200,
          height: 630,
          alt: `${service.name} - Ways 2 Spain`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} - Ways 2 Spain`,
      description: service.description,
      images: ['/opengraph.png'],
      site: '@ways2spain',
    },
    alternates: {
      canonical: `https://ways2spain.com/services/${id}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = serviceDetails[id as ServiceKey];

  if (!service) {
    notFound();
  }

  // Get pricing for Service schema
  const mainPrice = service.pricing[0].price === "Безкоштовно" 
    ? "0" 
    : service.pricing[0].price;

  return (
    <>
      {/* Service Schema for SEO */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${service.name} - Ways 2 Spain`,
          description: service.description,
          provider: {
            '@type': 'Organization',
            '@id': 'https://ways2spain.com/#organization',
            name: 'Ways 2 Spain',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Spain',
            identifier: 'ES',
          },
          serviceType: 'Relocation Services',
          category: 'Immigration and Visa Services',
          ...(mainPrice !== "0" && {
            offers: {
              '@type': 'Offer',
              price: mainPrice,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `https://ways2spain.com/services/${id}`,
            },
          }),
        }}
      />

      <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <Link
          href="/services"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад до послуг
        </Link>

        <div className="mb-12">
          <h1 className="mb-4">{service.name}</h1>
          <p className="text-xl text-muted-foreground">{service.description}</p>
        </div>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Процес роботи</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              {service.timeline.map((step, index) => (
                <div key={index} className="relative pl-10">
                  {/* Circle */}
                  <div
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center ${
                      step.actor === "agency" ? "bg-secondary" : "bg-primary"
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>

                  <div className="pb-2">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-bold">{step.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                          step.actor === "agency"
                            ? "bg-secondary/20 text-secondary"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {step.actor === "agency" ? "Ми" : "Ви"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Responsibilities Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Розподіл відповідальності</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Що робить агентство</TableHead>
                  <TableHead className="w-1/2">Що робить замовник</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Math.max(
                  service.responsibilities.agency.length,
                  service.responsibilities.client.length
                ) > 0 &&
                  Array.from({
                    length: Math.max(
                      service.responsibilities.agency.length,
                      service.responsibilities.client.length
                    ),
                  }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {service.responsibilities.agency[index] && (
                          <div className="flex items-start space-x-2">
                            <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <span>{service.responsibilities.agency[index]}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {service.responsibilities.client[index] && (
                          <div className="flex items-start space-x-2">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span>{service.responsibilities.client[index]}</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Вартість послуг</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Main pricing */}
            <div>
              <h3 className="text-xl font-bold mb-4">Основні послуги</h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Послуга</TableHead>
                      <TableHead className="text-right">Ціна (EUR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {service.pricing.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.item}</TableCell>
                        <TableCell className="text-right font-bold">
                          {item.price === "Безкоштовно" ? (
                            <span>Безкоштовно</span>
                          ) : (
                            `€${item.price}`
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Additional costs */}
            <div>
              <h3 className="text-xl font-bold mb-4">Додаткові витрати</h3>
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Позиція</TableHead>
                      <TableHead className="text-right">Ціна (EUR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {service.additionalCosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-muted-foreground">
                          Немає
                        </TableCell>
                      </TableRow>
                    ) : (
                      service.additionalCosts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className="text-right font-bold">
                            {item.price === "включено" ? (
                              <span className="text-secondary">{item.price}</span>
                            ) : (
                              typeof item.price === "string" && /\d/.test(item.price)
                                ? `€${item.price}`
                                : `${item.price}`
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section>
          <div className="bg-linear-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Готові почати?</h3>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Отримайте безкоштовну консультацію, і ми допоможемо вам обрати найкращий варіант для вашої ситуації
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="secondary" size="xl">Замовити послугу</Button>
              </Link>
              <Link href="/calculator">
                <Button
                  variant="outline"
                  size="xl"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Розрахувати вартість
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
