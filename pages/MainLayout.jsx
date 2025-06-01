import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/features/products/productsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.product);
  
  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, list.length]);
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
