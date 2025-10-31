"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Package, ShoppingCart, AlertCircle, Lock, LogOut } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/types"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    tags: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const authToken = localStorage.getItem("admin_auth")
    if (authToken === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const validUsername = (process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin").toLowerCase().trim()
    const validPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "1234").trim()

    const inputUsername = loginForm.username.toLowerCase().trim()
    const inputPassword = loginForm.password.trim()

    console.log("[v0] Login attempt:", { inputUsername, validUsername })

    if (inputUsername === validUsername && inputPassword === validPassword) {
      localStorage.setItem("admin_auth", "authenticated")
      setIsAuthenticated(true)
      setLoginError("")
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao painel administrativo.",
      })
    } else {
      setLoginError("Usuário ou senha incorretos")
      console.log("[v0] Login failed")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo.",
    })
  }

  const loadData = async () => {
    if (!isFirebaseConfigured || !db) {
      return
    }

    try {
      // Load products
      const productsSnapshot = await getDocs(collection(db, "products"))
      const productsData = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]
      setProducts(productsData)

      // Load orders
      const ordersSnapshot = await getDocs(collection(db, "orders"))
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setOrders(ordersData)
    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "Erro ao carregar dados",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFirebaseConfigured || !db) {
      toast({
        title: "Firebase não configurado",
        description: "Configure o Firebase para adicionar produtos.",
        variant: "destructive",
      })
      return
    }

    try {
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        image: newProduct.image || "/steaming-coffee-cup.png",
        tags: newProduct.tags.split(",").map((tag) => tag.trim()),
      }

      await addDoc(collection(db, "products"), productData)

      toast({
        title: "Produto adicionado!",
        description: "O produto foi adicionado com sucesso.",
      })

      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        tags: "",
      })

      loadData()
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Erro ao adicionar produto",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!isFirebaseConfigured || !db) {
      toast({
        title: "Firebase não configurado",
        description: "Configure o Firebase para remover produtos.",
        variant: "destructive",
      })
      return
    }

    try {
      await deleteDoc(doc(db, "products", productId))
      toast({
        title: "Produto removido!",
        description: "O produto foi removido com sucesso.",
      })
      loadData()
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Erro ao remover produto",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    if (!isFirebaseConfigured || !db) {
      toast({
        title: "Firebase não configurado",
        description: "Configure o Firebase para atualizar pedidos.",
        variant: "destructive",
      })
      return
    }

    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      })
      toast({
        title: "Status atualizado!",
        description: "O status do pedido foi atualizado.",
      })
      loadData()
    } catch (error) {
      console.error("Error updating order:", error)
      toast({
        title: "Erro ao atualizar pedido",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Lock className="h-5 w-5" />
                Acesso Administrativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="Digite seu usuário"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Digite sua senha"
                  />
                </div>

                {loginError && <p className="text-sm text-destructive">{loginError}</p>}

                <Button type="submit" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Entrar
                </Button>

                <div className="text-xs text-muted-foreground text-center mt-4">
                  <p>Credenciais padrão:</p>
                  <p>
                    Usuário: <strong>admin</strong>
                  </p>
                  <p>
                    Senha: <strong>1234</strong>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <p className="text-center">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 pt-32 pb-20">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-display)]">
                Firebase não configurado
              </h2>
              <p className="text-muted-foreground mb-6">
                Para usar o painel administrativo, você precisa configurar o Firebase com as seguintes variáveis de
                ambiente:
              </p>
              <div className="bg-muted p-4 rounded-lg text-left text-sm font-mono mb-6">
                <p>NEXT_PUBLIC_FIREBASE_API_KEY</p>
                <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</p>
                <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID</p>
                <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</p>
                <p>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</p>
                <p>NEXT_PUBLIC_FIREBASE_APP_ID</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Adicione essas variáveis na seção <strong>Vars</strong> da barra lateral do v0.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-display)]">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Add Product Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Adicionar Novo Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="/steaming-coffee-cup.png"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    required
                    value={newProduct.tags}
                    onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                    placeholder="tradicional, gelado, leite"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Produtos</p>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                    <p className="text-3xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
                    <p className="text-3xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Products List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum produto cadastrado. Adicione seu primeiro produto acima!
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="relative w-full h-32 mb-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-bold mb-1 font-[family-name:var(--font-display)]">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex gap-1 flex-wrap mb-3">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Pedidos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Nenhum pedido recebido ainda.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold">{order.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                          <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                          {order.paymentMethod && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <strong>Pagamento:</strong> {order.paymentMethod}
                            </p>
                          )}
                        </div>
                        <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                          {order.status === "pending" ? "Pendente" : order.status}
                        </Badge>
                      </div>

                      <div className="border-t pt-3 mb-3">
                        <p className="text-sm font-medium mb-2">Itens:</p>
                        {order.items.map((item: any, idx: number) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="font-bold">Total: R$ {order.total.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                          >
                            Processar
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateOrderStatus(order.id, "completed")}>
                            Concluir
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
