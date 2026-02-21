'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Icon } from '@/components/ui/icons'

const CONSENT_KEY = 'cookie-consent'

interface CookiePreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

// SVG noise pattern for glass texture
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export function CookieConsentBanner() {
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setShouldRender(true)
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (overrides?: { analytics: boolean; marketing: boolean }) => {
    const consent: CookiePreferences = {
      necessary: true,
      analytics: overrides ? overrides.analytics : prefs.analytics,
      marketing: overrides ? overrides.marketing : prefs.marketing,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    dismiss()
  }

  const dismiss = () => {
    setIsVisible(false)
    setTimeout(() => setShouldRender(false), 500)
  }

  const acceptAll = () => saveConsent({ analytics: true, marketing: true })

  const rejectAll = () => {
    setPrefs({ analytics: false, marketing: false })
    saveConsent({ analytics: false, marketing: false })
    setSettingsOpen(false)
  }

  const saveSettings = () => {
    saveConsent()
    setSettingsOpen(false)
  }

  if (!shouldRender) return null

  return (
    <>
      {/* Banner */}
      <div
        className={cn(
          'fixed bottom-0 inset-x-0 z-60 flex justify-center items-end pb-6 px-4 sm:px-6',
          'transition-transform duration-500 ease-in-out',
          isVisible ? 'translate-y-0' : 'translate-y-[calc(100%+2rem)]',
        )}
        role="region"
        aria-label="Сповіщення про cookies"
      >
        {/* Outer wrapper — relative anchor for the floating close button */}
        <div className="relative w-full max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">

          {/* Close button — center hangs at top-right corner of the card */}
          <button
            onClick={dismiss}
            className="absolute -top-4 -right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white/95 transition-colors cursor-pointer"
            style={{ background: 'rgba(30, 41, 59, 0.72)' }}
            aria-label="Закрити банер"
          >
            <Icon name="xmark" size="md" />
          </button>

          {/* Glass card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(30, 41, 59, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow:
                '0 -4px 20px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.22)',
              maskImage:
                'radial-gradient(circle 18px at 100% 0px, transparent 17px, black 18px)',
              WebkitMaskImage:
                'radial-gradient(circle 18px at 100% 0px, transparent 17px, black 18px)',
            }}
          >
          {/* Noise overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: NOISE_BG, backgroundSize: '256px 256px' }}
          />

          {/* Content */}
          <div className="relative px-5 py-5 sm:px-6 flex flex-col md:flex-row md:items-center gap-4">
            {/* Left: icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Icon
                name="cookieBite"
                size="xl"
                className="text-amber-400 shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <h5 className="text-white/95 first:mt-0 mb-1">
                  Цей сайт використовує cookies
                </h5>
                <p className="text-body-small text-white/65 mb-0">
                  Ми використовуємо cookies щоб покращити використання сайту.
                  Більше подробиць в наших{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-400 hover:underline underline-offset-2"
                  >
                    Політиках користування
                  </Link>{' '}
                  та{' '}
                  <Link
                    href="/terms"
                    className="text-amber-400 hover:underline underline-offset-2"
                  >
                    Умовах користування
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Right: buttons */}
            <div className="flex gap-3 shrink-0 md:self-center">
              <Button
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                onClick={() => setSettingsOpen(true)}
              >
                Налаштування
              </Button>
              <Button variant="amber" onClick={acceptAll}>
                Прийняти всі
              </Button>
            </div>
          </div>
          </div>{/* /glass card */}
        </div>{/* /outer wrapper */}
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent
          className="max-w-lg"
          style={
            {
              '--tw-enter-translate-x': '0%',
              '--tw-exit-translate-x': '0%',
            } as React.CSSProperties
          }
        >
          <DialogHeader>
            <DialogTitle>Налаштування cookies</DialogTitle>
            <DialogDescription>
              Оберіть, які категорії cookies ви дозволяєте. Необхідні cookies
              завжди активні.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 py-2">
            {/* Necessary */}
            <CookieCategory
              title="Необхідні cookies"
              description="Потрібні для базової роботи сайту: навігація, безпека, збереження налаштувань сесії. Не можуть бути вимкнені."
              checked={true}
              disabled={true}
            />

            {/* Analytics */}
            <CookieCategory
              title="Аналітичні cookies"
              description="Допомагають нам зрозуміти, як відвідувачі використовують сайт, та покращити його роботу. Дані анонімні та не передаються третім сторонам."
              checked={prefs.analytics}
              onCheckedChange={(checked) =>
                setPrefs((p) => ({ ...p, analytics: checked }))
              }
            />

            {/* Marketing */}
            <CookieCategory
              title="Маркетингові cookies"
              description="Дозволяють показувати вам персоналізовану рекламу на інших платформах на основі ваших інтересів та поведінки на сайті."
              checked={prefs.marketing}
              onCheckedChange={(checked) =>
                setPrefs((p) => ({ ...p, marketing: checked }))
              }
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={rejectAll}>
              Відхилити всі
            </Button>
            <Button onClick={saveSettings}>Зберегти вибір</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface CookieCategoryProps {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function CookieCategory({
  title,
  description,
  checked,
  disabled,
  onCheckedChange,
}: CookieCategoryProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-body-small font-medium text-foreground mb-0.5">
          {title}
        </p>
        <p className="text-body-small text-muted-foreground mb-0">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="shrink-0 mt-0.5"
        aria-label={title}
      />
    </div>
  )
}
