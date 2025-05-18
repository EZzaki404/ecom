import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, categories, orientations } from '../data/products'
import { Link } from 'react-router-dom'

function ShopPage() {
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedOrientation, setSelectedOrientation] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedOrientation) {
      filtered = filtered.filter(product => product.orientation === selectedOrientation)
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    )

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedOrientation, priceRange])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="py-8">
      <div className="container">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          {...fadeIn}
        >
          Our Collection
        </motion.h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Orientation</h3>
            <select
              value={selectedOrientation}
              onChange={(e) => setSelectedOrientation(e.target.value)}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">All Orientations</option>
              {orientations.map(orientation => (
                <option key={orientation.id} value={orientation.id}>
                  {orientation.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Min Price</h3>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
              className="w-full"
            />
            <span>${priceRange.min}</span>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Max Price</h3>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-full"
            />
            <span>${priceRange.max}</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              {...fadeIn}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {product.dimensions.width}x{product.dimensions.height} cm
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopPage