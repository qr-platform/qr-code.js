import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

import { QRCodeBuilder } from './components/qr-code-builder'
import { TemplateGallery } from './components/template-gallery' // Removed
import { ThemeSwitcher } from './components/theme-switcher'
import { UrlSyncHandler } from './context/qr-code-context' // Changed import

export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
      <UrlSyncHandler />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border border-default-200 rounded-lg">
          <CardHeader className="flex flex-col gap-1 bg-transparent">
            <div className="flex justify-between items-center w-full">
              <div />
              <h1 className="text-2xl font-semibold">QRCode.Js Demo Builder</h1>
              <div className="flex items-center">
                <ThemeSwitcher />
              </div>
            </div>
            <p className="text-default-500">
              Customize your QR code with different templates, styles, borders, and logos
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col gap-8 bg-gray-50 dark:bg-gray-900 h-full overflow-y-hidden">
            <div className="flex flex-col gap-8">
              <QRCodeBuilder />
              <TemplateGallery />
            </div>
          </CardBody>
        </Card>

        <footer className="mt-8 text-center text-default-500 text-sm">
          <p>QR Code Border Template Builder Demo</p>
        </footer>
      </div>
    </div>
  )
}
