import React from 'react'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

import { QRCodeBuilder } from './components/qr-code-builder'
import { TemplateGallery } from './components/template-gallery'
import { ThemeSwitcher } from './components/theme-switcher'
import { QRCodeProvider } from './context/qr-code-context'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border border-default-200 rounded-lg">
          <CardHeader className="flex flex-col gap-1 bg-transparent">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">QR Code Border Template Builder</h1>
              <ThemeSwitcher />
            </div>
            <p className="text-default-500">
              Customize your QR code with different templates, styles, borders, and logos
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <QRCodeProvider>
              <div className="flex flex-col gap-8">
                <QRCodeBuilder />
                <Divider />
                <TemplateGallery />
              </div>
            </QRCodeProvider>
          </CardBody>
        </Card>

        <footer className="mt-8 text-center text-default-500 text-sm">
          <p>QR Code Border Template Builder Demo</p>
        </footer>
      </div>
    </div>
  )
}
