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
                description: "Збір та легалізація всіх необхідних документів, переклади, апостилі",
                duration: "20 - 30 днів",
              },
              {
                step: 2,
                title: "Подача заявки",
                description: "Запис та подача документів до консульства або міграційної служби",
                duration: "до 2 днів",
              },
              {
                step: 3,
                title: "Розгляд заявки",
                description: "Офіційний розгляд документів міграційною службою Іспанії",
                duration: "15 - 30 днів",
              },
              {
                step: 4,
                title: "Запис та здача відбитків на ТІЕ",
                description: "Запис до поліції та здача біометричних даних для виготовлення картки резидента",
                duration: "14-30 днів",
              },
              {
                step: 5,
                title: "Отримання візи та ТІЕ",
                description: "Отримання візи, в'їзд до Іспанії та оформлення картки резидента (TIE)",
                duration: "20 - 30 днів",
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
            <h3 className="text-2xl font-bold mb-4">Строк дії візи</h3>
            <p className="text-primary-foreground/90 mb-6">
              Віза видається на термін 3 роки (при подачі з Іспанії) з можливістю продовження до 5 років.
              Після 5 років можливість отримання постійної резиденції.
            </p>
            <ul className="space-y-2">
              {[
                "Перша віза: 3 роки",
                "Продовження: ще 2 роки",
                "Постійне резиденство після 5 років проживання.",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-br from-secondary to-secondary/80 rounded-xl p-8 text-secondary-foreground">
            <h3 className="text-2xl font-bold mb-4">Переваги візи</h3>
            <p className="text-secondary-foreground/90 mb-6">
              Digital Nomad Visa надає повний легальний статус для життя та роботи в Іспанії. Термін перебування зараховується у загальний стаж для отримання громадянства.
            </p>
            <ul className="space-y-2">
              {[
                "Право працювати віддалено",
                "Доступ до медицини",
                "Можливість відкрити банківський рахунок",
                "Безвіз по Шенгенській зоні",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{item}</span>
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
            <Link href="/calculator">
              <Button variant="outline" size="xl">
                Розрахувати вартість
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
