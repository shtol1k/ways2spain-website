import React from 'react'

interface PageHeaderBlockProps {
  title: string
  subtitle?: string
}

export const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full pt-32 pb-16">
      <div className="mx-auto flex flex-col items-center gap-6 px-4 text-center lg:px-8 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl">
        <h1>{title}</h1>
        {subtitle && (
          <p className="text-body-base md:text-body-large color-content-secondary mb-0">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
