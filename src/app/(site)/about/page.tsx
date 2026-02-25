import { CheckCircle2, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// SEO Metadata
export const metadata = {
  title: "Про нас - Ways 2 Spain | Експерт з релокації в Іспанію",
  description: "Дізнайтеся більше про Ways 2 Spain - експерта з релокації в Іспанію. 300+ успішних кейсів, 98% схвалених заявок на Digital Nomad Visa. Персональний підхід та прозорість.",
  keywords: ["Ways 2 Spain", "релокація в Іспанію", "Digital Nomad Visa", "імміграція Іспанія", "про нас"],
  openGraph: {
    title: "Про нас - Ways 2 Spain",
    description: "Експерт-провідник, який говорить людською мовою про складні бюрократичні речі. 300+ успішних кейсів.",
    url: "https://ways2spain.com/about",
    siteName: "Ways 2 Spain",
    locale: "uk_UA",
    type: "website",
  },
  alternates: {
    canonical: "https://ways2spain.com/about",
  },
};

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "300+", label: "Успішних кейсів" },
    { icon: Clock, value: "98%", label: "Успішних заявок" },
    { icon: Award, value: "5+", label: "Років досвіду" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="mb-6">Про наш сервіс</h1>
          <p className="text-xl text-muted-foreground">
            Експерт-провідник, який говорить людською мовою про складні бюрократичні речі
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative w-full aspect-4/3">
            <Image
              src="/documents.jpg"
              alt="Spanish immigration documents and passport"
              fill
              className="rounded-2xl shadow-strong object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
          </div>
          <div>
            <h2 className="mb-6">Чому ми?</h2>
            <div className="space-y-4 mb-8">
              {[
                "Персональний підхід до кожного клієнта",
                "Прозорість на кожному етапі процесу",
                "Перевірені партнери: нотаріуси, перекладачі, юристи",
                <>
                  Підтримка українською, російською та англійською мовами.
                  <br />
                  Ми не співпрацюємо з громадянами РФ.
                </>,
                "Повне розуміння специфіки релокації",
                "Фокус на результат без зайвої бюрократії",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 text-center border border-border shadow-elegant"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-accent mb-4">
                <stat.icon className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Approach */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Наш підхід</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-elegant">
              <h3 className="text-xl font-bold mb-3">Не агентство</h3>
              <p className="text-muted-foreground">
                Ми не масове агентство з шаблонними рішеннями. Кожен випадок унікальний, і ми приділяємо належну увагу деталям вашої ситуації.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-elegant">
              <h3 className="text-xl font-bold mb-3">Персональний супровід</h3>
              <p className="text-muted-foreground">
                Ви працюєте з одним спеціалістом від початку до кінця. Ви завжди знаєте, до кого звертатися і на якому етапі знаходиться ваша справа.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-elegant">
              <h3 className="text-xl font-bold mb-3">Без офіціозу</h3>
              <p className="text-muted-foreground">
                Пояснюємо складні речі простою мовою. Ніяких заплутаних юридичних термінів — тільки зрозумілі кроки та чіткі інструкції.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-elegant">
              <h3 className="text-xl font-bold mb-3">Довіра та контроль</h3>
              <p className="text-muted-foreground">
                Ви завжди в курсі того, що відбувається. Прозорість на всіх етапах дає вам відчуття контролю та спокою.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-linear-to-br from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-primary-foreground mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Наш досвід</h2>
            <p className="text-lg text-primary-foreground/90 mb-6 text-center">
              За роки роботи ми допомогли сотням сімей та спеціалістів легально оселитися в Іспанії. Ми знаємо всі нюанси процесу та типові помилки, які можуть затримати отримання візи.
            </p>
            <div className="space-y-4">
              {[
                "Досвід роботи з різними міграційними офісами Іспанії",
                "Знання всіх оновлень законодавства 2024-2025 років",
                "Успішні кейси модифікації з тимчасового захисту",
                "Експертиза в оформленні родинних віз",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <p className="text-primary-foreground/90">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Готові почати співпрацю?
          </h3>
          <p className="text-muted-foreground mb-8">
            Отримайте безкоштовну консультацію та дізнайтеся, як ми можемо допомогти саме вам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="hero" size="xl">
                Отримати консультацію
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="xl">
                Переглянути послуги
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
