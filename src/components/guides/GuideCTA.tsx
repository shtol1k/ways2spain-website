import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GuideCTAProps {
  className?: string
}

export function GuideCTA({ className }: GuideCTAProps) {
  return (
    <section
      aria-label="Консультація"
      className={cn(
        'relative overflow-hidden bg-fill-primary border border-[var(--color-border-primary)] rounded-2xl shadow-elegant flex flex-col items-center justify-center gap-6 lg:gap-8 p-4 lg:px-10 lg:py-12 text-center mt-8 print:hidden',
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/assets/guide-cta-bg.png"
          alt=""
          fill
          className="object-cover opacity-40"
          quality={80}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2 w-full">
        <h3>Залишились запитання?</h3>
        <p className="text-body-large color-content-secondary mb-0">
          Отримайте безкоштовну консультацію, і ми допоможемо визначити оптимальне рішення для вашої ситуації
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col md:flex-row gap-4 w-full justify-center items-center">
        <Button variant="amber" size="xl" className="w-full md:w-auto" asChild>
          <a href="/consultation">Отримати консультацію</a>
        </Button>
        <Button variant="outline" size="xl" className="w-full md:w-auto" asChild>
          <a href="https://t.me/ways2spain_assistant" target="_blank" rel="noopener noreferrer">
            Написати нам в Telegram
          </a>
        </Button>
      </div>
    </section>
  )
}
