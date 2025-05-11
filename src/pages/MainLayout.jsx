import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice.js'; // <- upewnij się, że ścieżka się zgadza
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-yellow-800">
      <Header />
      <main className="flex-1 mx-auto w-full px-4 py-6">
      <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={13000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
    </div>
  );
}
