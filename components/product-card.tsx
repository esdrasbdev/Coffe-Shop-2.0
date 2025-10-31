"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleAddToCart = () => {
    addItem(product, quantity)
    router.push("/cart")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs uppercase">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-2 text-card-foreground font-[family-name:var(--font-display)]">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 min-h-[42px]">{product.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-6 pt-0">
        <div className="text-left">
          <span className="text-sm text-muted-foreground">R$ </span>
          <span className="text-2xl font-bold text-foreground">{product.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button size="icon" className="h-10 w-10 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
