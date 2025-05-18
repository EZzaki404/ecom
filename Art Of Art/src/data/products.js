export const products = [
  {
    id: 1,
    name: "Abstract Harmony in Blue",
    category: "abstract",
    price: 850,
    image: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg",
    description: "A stunning abstract piece featuring harmonious blue tones that create a sense of calm and serenity.",
    dimensions: { width: 80, height: 60 },
    orientation: "horizontal",
    inStock: true
  },
  {
    id: 2,
    name: "Amazigh Heritage",
    category: "amazigh",
    price: 1200,
    image: "https://images.pexels.com/photos/1569076/pexels-photo-1569076.jpeg",
    description: "Traditional Amazigh symbols and patterns blend with modern artistic expression.",
    dimensions: { width: 100, height: 100 },
    orientation: "square",
    inStock: true
  },
  {
    id: 3,
    name: "Minimalist Desert",
    category: "minimalist",
    price: 600,
    image: "https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg",
    description: "A minimalist interpretation of the Moroccan desert landscape.",
    dimensions: { width: 60, height: 80 },
    orientation: "vertical",
    inStock: true
  },
  {
    id: 4,
    name: "Islamic Geometric Harmony",
    category: "islamic",
    price: 950,
    image: "https://images.pexels.com/photos/6032280/pexels-photo-6032280.jpeg",
    description: "Intricate Islamic geometric patterns in gold and deep blue.",
    dimensions: { width: 70, height: 70 },
    orientation: "square",
    inStock: true
  },
  {
    id: 5,
    name: "Modern Medina",
    category: "abstract",
    price: 750,
    image: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg",
    description: "An abstract interpretation of a traditional Moroccan medina.",
    dimensions: { width: 90, height: 60 },
    orientation: "horizontal",
    inStock: true
  }
]

export const categories = [
  { id: "abstract", name: "Abstract Art" },
  { id: "amazigh", name: "Amazigh Art" },
  { id: "minimalist", name: "Minimalist" },
  { id: "islamic", name: "Islamic Art" }
]

export const orientations = [
  { id: "horizontal", name: "Horizontal" },
  { id: "vertical", name: "Vertical" },
  { id: "square", name: "Square" }
]