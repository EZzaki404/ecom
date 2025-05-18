import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { products, categories } from '../data/products'

function HomePage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="relative h-[600px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            {...fadeIn}
          >
            Our Collections
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                {...fadeIn}
              >
                <Link to={`/shop?category=${category.id}`}>
                  <img
                    src={products.find(p => p.category === category.id)?.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            {...fadeIn}
          >
            Featured Artworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage