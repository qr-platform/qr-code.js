import { Button, Card, CardBody, CardHeader, Divider, Tooltip } from '@heroui/react'

import { QRCodeBuilder } from './components/qr-code-builder'
import { TemplateGallery } from './components/template-gallery' // Removed
import { ThemeSwitcher } from './components/theme-switcher'
import { Flex } from './components/ui/boxes'
import { UrlSyncHandler } from './context/qr-code-context' // Changed import

export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
      <UrlSyncHandler />
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border border-default-200 rounded-lg">
          <CardHeader className="flex flex-col gap-1 bg-transparent">
            <Flex className="flex justify-between items-center w-full">
              <div className="h-6 w-6" />
              <h1 className="text-2xl font-semibold text-center">
                QR Code Creation with QRCode.js Library
              </h1>
              <div className="flex items-center">
                <Tooltip content="QRCode.Js Library Github Repository">
                  <a href="https://github.com/qr-platform/qr-code.js" target="_blank">
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-default-700 dark:text-default-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30px"
                        height="30px"
                        fill="currentColor"
                        viewBox="0 0 64 64"
                      >
                        <path
                          stroke-color="red"
                          d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 40.238706 44.458716 47.16934 36.904297 49.306641 C 36.811496 49.1154 36.747844 48.905917 36.753906 48.667969 C 36.784906 47.458969 36.753906 44.637563 36.753906 43.601562 C 36.753906 41.823563 35.628906 40.5625 35.628906 40.5625 C 35.628906 40.5625 44.453125 40.662094 44.453125 31.246094 C 44.453125 27.613094 42.554688 25.720703 42.554688 25.720703 C 42.554688 25.720703 43.551984 21.842266 42.208984 20.197266 C 40.703984 20.034266 38.008422 21.634812 36.857422 22.382812 C 36.857422 22.382813 35.034 21.634766 32 21.634766 C 28.966 21.634766 27.142578 22.382812 27.142578 22.382812 C 25.991578 21.634813 23.296016 20.035266 21.791016 20.197266 C 20.449016 21.842266 21.445312 25.720703 21.445312 25.720703 C 21.445312 25.720703 19.546875 27.611141 19.546875 31.244141 C 19.546875 40.660141 28.371094 40.5625 28.371094 40.5625 C 28.371094 40.5625 27.366329 41.706312 27.265625 43.345703 C 26.675939 43.553637 25.872132 43.798828 25.105469 43.798828 C 23.255469 43.798828 21.849984 42.001922 21.333984 41.169922 C 20.825984 40.348922 19.7845 39.660156 18.8125 39.660156 C 18.1725 39.660156 17.859375 39.981656 17.859375 40.347656 C 17.859375 40.713656 18.757609 40.968484 19.349609 41.646484 C 20.597609 43.076484 20.574484 46.292969 25.021484 46.292969 C 25.547281 46.292969 26.492043 46.171872 27.246094 46.068359 C 27.241926 47.077908 27.230199 48.046135 27.246094 48.666016 C 27.251958 48.904708 27.187126 49.114952 27.09375 49.306641 C 19.540258 47.168741 14 40.238046 14 32 C 14 22.059 22.059 14 32 14 z"
                        />
                      </svg>
                    </Button>
                  </a>
                </Tooltip>
                <ThemeSwitcher />
              </div>
            </Flex>
            <p className="text-default-500 text-center">
              Create stunning QR codes effortlessly with prebuilt templates for styles,
              borders, and text, or take full control with advanced options or using code.
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
        <footer className="mt-2 py-12 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Section 1: About QRCode.js */}
              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  About QRCode.js
                </h3>
                <p className="text-sm">
                  <strong>QRCode.js</strong> is a professional-grade JavaScript/TypeScript
                  library designed for generating QR codes that combine functionality with
                  visual appeal. It’s tailored for developers who need a reliable and
                  customizable tool for creating QR codes, suitable for both personal
                  projects and business applications.
                </p>
              </div>

              {/* Section 2: Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Extensive Customization Options</strong>: Dots, Corners,
                    <br />
                    Backgrounds, Images, Borders.
                  </li>
                  <li>
                    <strong>Support for Modern Development Practices</strong>: Responsive
                    <br />
                    Design, Node.js Compatibility.
                  </li>
                  <li>
                    <strong>Flexible Configuration System</strong>: Builder Pattern,
                    <br />
                    Centralized Settings.
                  </li>
                  <li>
                    <strong>Built-in Validation Support</strong>.
                  </li>
                  <li>
                    <strong>Handcrafted Built-in Templates</strong>.
                  </li>
                </ul>
              </div>

              {/* Section 3: Documentation Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Documentation
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/documentation.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        Full Documentation
                      </a>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/api-reference-guide.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        API Reference
                      </a>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/usage-guide.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        Usage Guide
                      </a>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/examples.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        Basic Examples
                      </a>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/advanced-examples.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        Advanced Examples
                      </a>
                    </strong>
                  </li>
                  <li>
                    <strong>
                      <a
                        target="_blank"
                        href="https://qr-platform.github.io/qr-code.js/docs/license-management.html#start"
                        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        License Management
                      </a>
                    </strong>
                  </li>
                </ul>
              </div>

              {/* Section 4: Accessibility & Licensing + GitHub */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Accessibility & Licensing
                </h3>
                <ul className="space-y-2 text-sm mb-6">
                  <li>
                    <strong>Free Version</strong>: Available for simple QR code
                    generation.
                  </li>
                  <li>
                    <strong>Premium License</strong>: Unlocks advanced features.
                  </li>
                </ul>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect
                </h3>
                <a
                  href="https://github.com/qr-platform/qr-code.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub Repository
                </a>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} QR-Platform. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
