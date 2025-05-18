import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/logo.png';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const adminPassword = 'admin123';

  // États commandes
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // États produits
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  // États avis
  const [reviews, setReviews] = useState([]);

  // Chargement des commandes dès connexion admin
  useEffect(() => {
    if (password === adminPassword) {
      fetchOrders();
      fetchProducts();
      fetchReviews();
    }
  }, [password]);

  // Filtrage commandes par recherche + statut
  useEffect(() => {
    let filtered = orders.filter(
      (order) =>
        order.full_name.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase()) ||
        order.status.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    setFilteredOrders(filtered);
    setCurrentPage(1); // reset page quand filtre change
  }, [search, statusFilter, orders]);

  // --- Fonctions commandes ---
  async function fetchOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      alert('Erreur chargement commandes');
      console.error(error);
    } else {
      setOrders(data);
      setFilteredOrders(data);
    }
  }

  function handleStatusChange(id, newStatus) {
    // Mise à jour locale uniquement (à adapter pour update DB)
    const updatedOrders = orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order));
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    // TODO: Mettre à jour statut dans la base Supabase
  }

  function exportToPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Nom', 'Email', 'Produits', 'Total', 'Statut', 'Date']],
      body: filteredOrders.map((order) => [
        order.full_name,
        order.email,
        JSON.parse(order.products).map((p) => `${p.name} x ${p.quantity}`).join(', '),
        `${order.total} MAD`,
        order.status,
        new Date(order.created_at).toLocaleString(),
      ]),
    });
    doc.save('orders.pdf');
  }

  // Pagination commandes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // --- Fonctions produits ---
  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      alert('Erreur chargement produits');
      console.error(error);
    } else {
      setProducts(data);
    }
  }

  async function addProduct() {
    if (!newProduct.name || !newProduct.price) {
      alert('Nom et prix sont requis');
      return;
    }
    const { data, error } = await supabase.from('products').insert([newProduct]);
    if (error) {
      alert('Erreur ajout produit');
      console.error(error);
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({ name: '', price: '', description: '' });
    }
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('Erreur suppression produit');
      console.error(error);
    } else {
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  // --- Fonctions avis ---
  async function fetchReviews() {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (error) {
      alert('Erreur chargement avis');
      console.error(error);
    } else {
      setReviews(data);
    }
  }

  async function deleteReview(id) {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) {
      alert('Erreur suppression avis');
      console.error(error);
    } else {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  }

  // --- Rendu de la page ---

  if (password !== adminPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <img src={logo} alt="Logo" className="mb-8 w-48" />
        <h2 className="text-2xl font-bold mb-4">Accès Admin</h2>
        <input
          type="password"
          placeholder="Mot de passe admin"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full max-w-xs mb-4"
        />
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen space-y-10">
      <img src={logo} alt="Logo" className="mb-8 w-48" />
      <h1 className="text-3xl font-bold mb-4">📦 Gestion Admin</h1>

      {/* --- Section Commandes --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Commandes reçues</h2>

        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Rechercher commandes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="livrée">Livrée</option>
            <option value="annulée">Annulée</option>
          </select>
        </div>

        <table className="w-full border text-left text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Nom</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Produits</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Statut</th>
              <th className="border px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td className="border px-3 py-2">{order.full_name}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">
                  {JSON.parse(order.products)
                    .map((p) => `${p.name} × ${p.quantity}`)
                    .join(', ')}
                </td>
                <td className="border px-3 py-2">{order.total} MAD</td>
                <td className="border px-3 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="livrée">Livrée</option>
                    <option value="annulée">Annulée</option>
                  </select>
                </td>
                <td className="border px-3 py-2">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination simple */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn-primary"
          >
            Précédent
          </button>
          <button
            disabled={indexOfLastItem >= filteredOrders.length}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn-primary"
          >
            Suivant
          </button>
        </div>

        <button onClick={exportToPDF} className="btn-primary mr-2">
          Exporter en PDF
        </button>
        <CSVLink data={filteredOrders} filename="orders.csv" className="btn-primary">
          Exporter en Excel
        </CSVLink>
      </section>

      {/* --- Section Produits --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Produits</h2>

        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Nom produit"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded flex-grow"
          />
          <input
            type="number"
            placeholder="Prix"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 rounded w-32"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2 rounded flex-grow"
          />
          <button onClick={addProduct} className="btn-primary">
            Ajouter
          </button>
        </div>

        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Nom</th>
              <th className="border px-3 py-2">Prix</th>
              <th className="border px-3 py-2">Description</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-3 py-2">{product.name}</td>
                <td className="border px-3 py-2">{product.price} MAD</td>
                <td className="border px-3 py-2">{product.description}</td>
                <td className="border px-3 py-2">
                  <button onClick={() => deleteProduct(product.id)} className="btn-danger">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* --- Section Avis --- */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Avis utilisateurs</h2>
        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Utilisateur</th>
              <th className="border px-3 py-2">Commentaire</th>
              <th className="border px-3 py-2">Note</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td className="border px-3 py-2">{review.user_name}</td>
                <td className="border px-3 py-2">{review.comment}</td>
                <td className="border px-3 py-2">{review.rating} / 5</td>
                <td className="border px-3 py-2">{new Date(review.created_at).toLocaleDateString()}</td>
                <td className="border px-3 py-2">
                  <button onClick={() => deleteReview(review.id)} className="btn-danger">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
