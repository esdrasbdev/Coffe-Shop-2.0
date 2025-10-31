export interface Cafeteria {
  id: string
  name: string
  city: string
  address: string
  phone: string
}

export const cafeterias: Cafeteria[] = [
  {
    id: "1",
    name: "Coffee Shop Aldeota",
    city: "Fortaleza",
    address: "Av. Dom Luís, 500 - Aldeota",
    phone: "(85) 3456-7890",
  },
  {
    id: "2",
    name: "Coffee Shop Meireles",
    city: "Fortaleza",
    address: "Av. Beira Mar, 3080 - Meireles",
    phone: "(85) 3456-7891",
  },
  {
    id: "3",
    name: "Coffee Shop Cedro",
    city: "Cedro",
    address: "Rua Coronel José de Albuquerque, 384 - Centro",
    phone: "(88) 3551-2345",
  },
  {
    id: "4",
    name: "Coffee Shop Juazeiro",
    city: "Juazeiro do Norte",
    address: "Rua São Pedro, 234 - Centro",
    phone: "(88) 3512-3456",
  },
  {
    id: "5",
    name: "Coffee Shop Sobral",
    city: "Sobral",
    address: "Av. John Sanford, 1200 - Centro",
    phone: "(88) 3677-8901",
  },
]
