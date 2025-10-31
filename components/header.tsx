"use client"

import { ShoppingCart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cafeterias } from "@/lib/cafeterias"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [selectedCafeteria, setSelectedCafeteria] = useState<string>("")
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="cursor-pointer transition-opacity hover:opacity-80">
            <h1 className="text-4xl font-bold text-primary font-[family-name:var(--font-display)]">Coffee Shop</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Select value={selectedCafeteria} onValueChange={setSelectedCafeteria}>
              <SelectTrigger className="w-[200px] bg-secondary text-secondary-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Selecione a loja" />
              </SelectTrigger>
              <SelectContent>
                {cafeterias.map((cafeteria) => (
                  <SelectItem key={cafeteria.id} value={cafeteria.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{cafeteria.city}</span>
                      <span className="text-xs text-muted-foreground">{cafeteria.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link href="/cart">
              <Button variant="secondary" size="sm" className="gap-2 relative">
                <ShoppingCart className="h-4 w-4" />
                Carrinho
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
