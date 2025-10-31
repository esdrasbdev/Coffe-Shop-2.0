"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Clock, Award, Truck, ShoppingCart, MapPin, Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cafeterias } from "@/lib/cafeterias"

const products = [
  {
    id: "1",
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    price: 9.9,
    image: "/expresso tradicional.png",
    tags: ["tradicional"],
  },
  {
    id: "2",
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    price: 9.9,
    image: "/expresso americano.png",
    tags: ["tradicional"],
  },
  {
    id: "3",
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    price: 9.9,
    image: "/expresso cremoso.png",
    tags: ["tradicional"],
  },
  {
    id: "4",
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    price: 9.9,
    image: "/expresso gelado.png",
    tags: ["tradicional", "gelado"],
  },
  {
    id: "5",
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    price: 9.9,
    image: "/café com leite.png",
    tags: ["tradicional", "leite"],
  },
  {
    id: "6",
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    price: 9.9,
    image: "/café com leite.png",
    tags: ["tradicional", "leite"],
  },
  {
    id: "7",
    name: "Capuccino",
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    price: 9.9,
    image: "/capuccino.png",
    tags: ["tradicional", "leite"],
  },
  {
    id: "8",
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    price: 9.9,
    image: "/macchiato.png",
    tags: ["tradicional", "leite"],
  },
  {
    id: "9",
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    price: 9.9,
    image: "/mocaccino.png",
    tags: ["especial", "leite"],
  },
  {
    id: "10",
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    price: 9.9,
    image: "/chocolate quente.png",
    tags: ["especial", "leite"],
  },
  {
    id: "11",
    name: "Cubano",
    description: "Drink gelado de café expresso com rum, creme de leite e hortelã",
    price: 9.9,
    image: "/cubano.png",
    tags: ["especial", "alcoolico", "gelado"],
  },
  {
    id: "12",
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    price: 9.9,
    image: "/havaiano.png",
    tags: ["especial"],
  },
]

export default function HomePage() {
  const [showLocations, setShowLocations] = useState(false)

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section")
    productsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/hero.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60 z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance font-[family-name:var(--font-display)]">
                Encontre o café perfeito para qualquer hora do dia
              </h1>
              <p className="text-xl mb-8 text-foreground/90 font-medium">
                Com o Coffee Shop você recebe seu café onde estiver, a qualquer hora
              </p>

              <ul className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: ShoppingCart, text: "Compra simples e segura" },
                  { icon: Clock, text: "Entrega rápida e rastreada" },
                  { icon: Award, text: "Café fresco e selecionado" },
                  { icon: Truck, text: "Embalagem mantém o café intacto" },
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 flex-shrink-0">
                      <benefit.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-base" onClick={scrollToProducts}>
                  Ver Cafés
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="text-base">
                      Saiba Mais
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-[family-name:var(--font-display)]">
                        Sobre o Coffee Shop
                      </DialogTitle>
                      <DialogDescription className="text-base space-y-4 pt-4">
                        <p>
                          O Coffee Shop é mais do que uma cafeteria - é uma experiência completa para os amantes de
                          café. Desde 2020, temos nos dedicado a trazer os melhores grãos especiais diretamente para
                          você.
                        </p>
                        <p>
                          Nossos cafés são cuidadosamente selecionados de produtores locais e internacionais, garantindo
                          qualidade premium em cada xícara. Trabalhamos com torra artesanal e métodos de preparo que
                          realçam as características únicas de cada grão.
                        </p>
                        <p>
                          Com entrega rápida e embalagem especial que preserva o frescor, você pode desfrutar de um café
                          de alta qualidade no conforto da sua casa ou escritório.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/heroimage.png"
                  alt="Café Premium"
                  fill
                  className="object-contain rounded-2xl drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center font-[family-name:var(--font-display)]">Nossos Cafés</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t-2 border-border/50">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url(/coffee-beans-pattern.jpg)",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-display)]">Coffee Shop</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Os melhores cafés especiais do Ceará, selecionados com carinho para você.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-primary/10 hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-all"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="bg-primary/10 hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-[family-name:var(--font-display)]">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={scrollToProducts}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Nossos Cafés
                  </button>
                </li>
                <li>
                  <a href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                    Carrinho
                  </a>
                </li>
                <li>
                  <a href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                    Painel Admin
                  </a>
                </li>
                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        Sobre Nós
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-[family-name:var(--font-display)]">
                          Sobre o Coffee Shop
                        </DialogTitle>
                        <DialogDescription className="text-base space-y-4 pt-4">
                          <p>
                            O Coffee Shop é mais do que uma cafeteria - é uma experiência completa para os amantes de
                            café. Desde 2020, temos nos dedicado a trazer os melhores grãos especiais diretamente para
                            você.
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-[family-name:var(--font-display)]">Nossas Lojas</h4>
              <Dialog open={showLocations} onOpenChange={setShowLocations}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <MapPin className="h-4 w-4" />
                    Ver Localidades no Ceará
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-[family-name:var(--font-display)]">
                      Nossas Lojas no Ceará
                    </DialogTitle>
                    <DialogDescription>Visite uma de nossas lojas e experimente nossos cafés</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    {cafeterias.map((cafeteria) => (
                      <div
                        key={cafeteria.id}
                        className="p-4 border rounded-lg hover:border-primary transition-colors bg-card"
                      >
                        <h5 className="font-bold text-lg mb-2 font-[family-name:var(--font-display)]">
                          {cafeteria.name}
                        </h5>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>
                              {cafeteria.address}, {cafeteria.city} - CE
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{cafeteria.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4 font-[family-name:var(--font-display)]">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">contato@coffeeshop.com.br</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">(85) 3456-7890</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Fortaleza, Ceará</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Coffee Shop. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
