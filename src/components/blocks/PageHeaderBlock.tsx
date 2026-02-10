'use client';

import React from 'react'

interface PageHeaderBlockProps {
  title: string
  subtitle?: string
}

export const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({ title, subtitle }) => {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="mb-6">{title}</h1>
      {subtitle && (
        <p className="text-xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
