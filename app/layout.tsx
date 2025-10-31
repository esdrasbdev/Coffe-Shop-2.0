import type React from "react"
import type { Metadata } from "next"
import { Inter, Baloo_2 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const baloo2 = Baloo_2({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  title: "Coffee Shop - Café Premium",
  description: "Os melhores cafés especiais para você",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${baloo2.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
