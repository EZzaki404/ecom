import { motion } from 'framer-motion'

function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="py-16">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          {...fadeIn}
        >
          <h1 className="text-4xl font-bold mb-8">About Art of Art</h1>
          <p className="text-gray-600 mb-8">
            Art of Art is Morocco's premier destination for contemporary artistic expression. 
            We curate and deliver exceptional artwork that celebrates the rich cultural heritage 
            of Morocco while embracing modern artistic sensibilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We strive to make exceptional art accessible to everyone while supporting local 
              artists and preserving Moroccan artistic traditions. Our carefully curated 
              collection spans various styles, from traditional Amazigh art to contemporary 
              abstract pieces.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4">Quality & Authenticity</h2>
            <p className="text-gray-600">
              Each piece in our collection is carefully selected for its artistic merit and 
              authenticity. We work directly with artists to ensure the highest quality and 
              provide our customers with genuine, meaningful artwork.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4">Customer Experience</h2>
            <p className="text-gray-600">
              We believe in providing an exceptional shopping experience. From careful packaging 
              to prompt delivery and excellent customer service, we ensure that your journey 
              with us is as beautiful as the art you purchase.
            </p>
          </motion.div>

          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where Moroccan art is celebrated globally, where traditional 
              meets contemporary, and where every home can showcase the beauty of our cultural 
              heritage through carefully curated pieces.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage