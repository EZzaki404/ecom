import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { toast } from 'react-toastify'

function ProductPage() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const addItem = useCartStore(state => state.addItem)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!product) {
    return <div className="container py-8">Product not found</div>
  }

  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!')
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            className="relative overflow-hidden rounded-lg"
            {...fadeIn}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-[500px] object-cover cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </motion.div>

          {/* Product Details */}
          <motion.div {...fadeIn}>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl text-primary mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Dimensions</h3>
              <p>{product.dimensions.width}x{product.dimensions.height} cm</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Orientation</h3>
              <p className="capitalize">{product.orientation}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="capitalize">{product.category}</p>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary w-full"
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage