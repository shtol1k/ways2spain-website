'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Page } from '@/payload-types'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

interface VisaPageClientProps {
  initialData: Page
}

export const VisaPageClient: React.FC<VisaPageClientProps> = ({ initialData }) => {
  const { data } = useLivePreview({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header - Connected to Live Preview */}
        {data.layout && Array.isArray(data.layout) && data.layout.length > 0 && (
           <RenderBlocks blocks={data.layout} />
        )}

        {/* Process Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Покрокова процедура</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Підготовка документів",
                description: "Збір, апостилювання та присяжний переклад (traducción jurada) документів.",
                duration: "20-50 днів",
              },
              {
                step: 2,
                title: "Реєстрація заявки",
                description: "Онлайн-подача через платформу UGE. Вимагає вашої фізичної присутності в Іспанії.",
                duration: "до 2 днів",
              },
              {
                step: 3,
                title: "Розгляд заявки",
                description: "Офіційний розгляд справи міграційною службою Іспанії.",
                duration: "до 20 робочих днів",
              },
              {
                step: 4,
                title: "Подача документів на отримання картки резидента (TIE)",
                description: "Запис до поліції (cita previa) та здача біометричних даних для випуску картки.",
                duration: "1 – 15 днів",
              },
              {
                step: 5,
                title: "Отримання карти",
                description: "Отримання готової фізичної картки TIE у відділку поліції.",
                duration: "20 – 40 днів",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-card rounded-xl p-6 shadow-elegant border border-border hover:shadow-strong transition-smooth"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-accent-foreground">
                      {item.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Duration and Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-6 color-content-primary-inverse">Терміни дії статусу</h3>
            <ul className="space-y-4">
              {[
                { title: "Первинна резиденція:", text: "Видається на 3 роки при подачі безпосередньо з Іспанії. Віза D на 1 рік при подачі з Консульства у країні проживання." },
                { title: "Пролонгація:", text: "Можливість продовження статусу ще на 2 роки за умови збереження підстав, при яких була видана резиденція." },
                { title: "Постійна резиденція:", text: "Право на отримання статусу постійного проживання після 5 років безперервного проживання." },
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 shrink-0" />
                  <div className="leading-relaxed text-primary-foreground/90">
                    <strong className="font-semibold text-primary-foreground">{item.title}</strong> {item.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-br from-secondary to-secondary/80 rounded-xl p-8 text-secondary-foreground">
            <h3 className="text-2xl font-bold mb-6">Ключові переваги</h3>
            <ul className="space-y-4">
              {[
                "Право на віддалену роботу на іноземні компанії або локальний ринок Іспанії (не більше 20% від загального прибутку).",
                "Доступ до державної та приватної систем охорони здоров'я.",
                "Можливість відкриття рахунків у європейських банках та отримання кредитів.",
                "Безвізовий режим з усіма країнами Шенгенської зони.",
                "Термін перебування за цією візою повністю зараховується у загальний стаж для отримання паспорта Іспанії.",
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="leading-relaxed text-secondary-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Готові розпочати процес отримання візи?
          </h3>
          <p className="text-muted-foreground mb-8">
            Почніть оформлення Digital Nomad Visa — безкоштовна консультація та супровід від перших кроків.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="hero" size="xl">
                Отримати консультацію
              </Button>
            </Link>
            {/* <Link href="/calculator">
              <Button variant="outline" size="xl">
                Розрахувати вартість
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}
