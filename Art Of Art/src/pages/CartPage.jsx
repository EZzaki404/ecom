import { useCartStore } from '../store/cartStore'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { supabase } from '../services/supabaseClient'
import { useState } from 'react'

function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (!fullName || !email) {
      toast.error('Veuillez entrer votre nom et votre e-mail.')
      return
    }

    const { data, error } = await supabase.from('orders').insert([
      {
        full_name: fullName,
        email: email,
        products: JSON.stringify(items),
        total: total,
        status: 'en_attente'
      }
    ])

    if (error) {
      toast.error('Erreur lors de l\'enregistrement de la commande.')
      console.error(error)
    } else {
      clearCart()
      setFullName('')
      setEmail('')
      toast.success('Commande enregistrée avec succès !')
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <Link to="/shop" className="btn-primary">
          Continuer vos achats
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container">
        <motion.h1 className="text-3xl font-bold mb-8" {...fadeIn}>
          Panier
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-center gap-4 border-b py-4"
                {...fadeIn}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="rounded-md border-gray-300"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md h-fit"
            {...fadeIn}
          >
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>

            {/* Champs Nom et Email */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
            </div>

            {/* Détails du panier */}
            <div className="flex justify-between mb-2">
              <span>Sous-total</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            {/* Bouton de validation */}
            <button
              onClick={handleCheckout}
              className="btn-primary w-full"
            >
              Valider la commande
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
