'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface LightboxContextValue {
  openLightbox: (src: string, alt: string, caption?: string) => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used inside LightboxProvider')
  return ctx
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LightboxState {
  open: boolean
  src: string
  alt: string
  caption: string
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState>({ open: false, src: '', alt: '', caption: '' })

  const openLightbox = useCallback((src: string, alt: string, caption = '') => {
    setState({ open: true, src, alt, caption })
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setState((prev) => ({ ...prev, open }))
  }, [])

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <DialogPrimitive.Root open={state.open} onOpenChange={handleOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              'fixed inset-0 z-50 bg-black/85',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            )}
          />
          {/* Content covers the full screen. Clicking the dark area (Content itself)
              closes the lightbox; clicking the image/caption/close stops propagation. */}
          <DialogPrimitive.Content
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center p-4',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'focus:outline-none',
            )}
            aria-describedby={undefined}
            onClick={() => setState((prev) => ({ ...prev, open: false }))}
          >
            <DialogPrimitive.Title className="sr-only">
              {state.alt || 'Image preview'}
            </DialogPrimitive.Title>
            {/* Inner container — stops propagation so clicks here don't close */}
            <div
              className="relative flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.src}
                alt={state.alt}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-strong ring-1 ring-white/35"
              />
              {state.caption && (
                <p className="text-body-small color-content-secondary-inverse text-center max-w-[90vw]">
                  {state.caption}
                </p>
              )}
            </div>
            <DialogPrimitive.Close
              className={cn(
                'absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full',
                'bg-black/50 color-content-primary-inverse',
                'hover:bg-black/70 transition-smooth',
                'focus:outline-none focus:ring-2 focus:ring-white/50',
              )}
              aria-label="Закрити"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </LightboxContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// LightboxImage — used inside Lexical JSX converters
// ---------------------------------------------------------------------------

interface UploadNodeValue {
  url?: string
  mimeType?: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  filename?: string
  sizes?: Record<string, { url?: string; width?: number; height?: number; mimeType?: string } | undefined>
}

interface SerializedUploadNode {
  value?: UploadNodeValue
  fields?: { alt?: string }
}

interface LightboxImageProps {
  node: SerializedUploadNode
}

export function LightboxImage({ node }: LightboxImageProps) {
  const { openLightbox } = useLightbox()

  const value = node.value
  if (!value?.url) return null

  const { url, mimeType, width, height, filename, sizes } = value
  const alt = node.fields?.alt ?? value.alt ?? filename ?? ''
  const caption = value.caption ?? ''

  // Non-image files → render as download link
  if (mimeType && !mimeType.startsWith('image/')) {
    return (
      <a href={url} download={filename}>
        {filename}
      </a>
    )
  }

  const handleClick = () => openLightbox(url, alt, caption)

  // Responsive image with <picture>
  if (sizes) {
    const sources = Object.values(sizes).filter(
      (s): s is NonNullable<typeof s> => !!s?.url,
    )

    return (
      <figure className="m-0">
        <picture onClick={handleClick} className="cursor-pointer block">
          {sources.map((s, i) => (
            <source
              key={i}
              srcSet={s.url}
              type={s.mimeType}
              media={s.width ? `(max-width: ${s.width}px)` : undefined}
            />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt} width={width} height={height} className="hover:opacity-90 transition-smooth rounded" />
        </picture>
        {caption && <figcaption className="text-body-small color-content-tertiary mt-2">{caption}</figcaption>}
      </figure>
    )
  }

  // Simple image
  return (
    <figure className="m-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        width={width}
        height={height}
        onClick={handleClick}
        className="cursor-pointer hover:opacity-90 transition-smooth rounded"
      />
      {caption && <figcaption className="text-body-small color-content-tertiary mt-2">{caption}</figcaption>}
    </figure>
  )
}
