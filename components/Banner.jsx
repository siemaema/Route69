import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

export default function Banner() {
  

  const items = useSelector((state) => state.product.list);
const safeItems = Array.isArray(items) ? items : [];

const bestsellers = useMemo(() => {
  return safeItems.filter((p) => p.isBestseller);
}, [safeItems]);


  if (!bestsellers.length) return null;

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      loop={bestsellers.length > 1}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      navigation
      className="w-full h-[26rem] rounded-xl"
    >
      {bestsellers.map((item) => (
        <SwiperSlide key={item._id}>
          <Link to={`/product/${item._id}`}>
            <motion.div
              initial={{ opacity: 0.6, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[26rem] overflow-hidden rounded-xl shadow-2xl group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-800/60 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10 text-yellow-300">
                <h3 className="text-2xl font-bold drop-shadow-md">{item.title}</h3>
                <p className="text-3xl font-extrabold mt-2 drop-shadow-md text-yellow-400">
                  {item.promoPrice || item.price} zł
                </p>
              </div>
            </motion.div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
