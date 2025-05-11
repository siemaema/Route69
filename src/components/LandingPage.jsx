import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const handleEnter = () => {
        
        navigate("/shop"); // Przejdź do strony sklepu
    };
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-yellow-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Logo z animacją skali i fade-in */}
      <motion.div
        className="mb-8 drop-shadow-xl"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        <img
          src="/image.png"
          alt="Route69 logo"
          className="h-40 w-40 rounded-full border-8 border-yellow-400 bg-zinc-950 p-2"
        />
      </motion.div>

      {/* Tytuł z animacją przesunięcia i fade-in */}
      <motion.h1
        className="text-5xl md:text-6xl font-black text-yellow-400 tracking-widest mb-6 text-center drop-shadow-xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Route69
      </motion.h1>

      {/* Opis z lekkim opóźnieniem */}
      <motion.p
        className="max-w-xl text-lg md:text-xl text-yellow-100 text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        Jesteśmy doświadczonym sklepem w branży lakierniczej. Oferujemy najlepsze lakiery, podkłady i akcesoria do Twojego auta. Postaw na jakość i fachowe doradztwo – Twoje auto zasługuje na najlepsze!
      </motion.p>

      {/* Przycisk ze scale i efektem hover */}
      <motion.button
        onClick={handleEnter}
        className="px-10 py-4 bg-yellow-400 text-zinc-950 font-bold rounded-2xl text-xl shadow-lg hover:bg-yellow-300 hover:scale-105 transition"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.97 }}
      >
        Przejdź do sklepu
      </motion.button>
    </motion.div>
  );
}
