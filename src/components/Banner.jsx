import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Banner() {
  const bestsellers = useSelector((state)=> state.products.items).filter((item)=> item.isBestseller);
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-yellow-800 rounded-xl mb-6 shadow-xl p-1 w-full ">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        style={{ borderRadius: 16 }}
      >
        {bestsellers.map((bestseller, idx) => (
          
            <SwiperSlide key={idx}>
          <Link to={`/product/${bestseller._id}`} key={bestseller._id || idx}>
            <div className="relative w-full h-[320px]">
              <img
                src={bestseller.image}
                alt={`slide-${idx}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/80 text-yellow-400 font-extrabold text-lg py-4 rounded-b-xl flex items-center justify-center">
                {bestseller.title}
              </div>
            </div>
            </Link>
          </SwiperSlide>
          
        ))}
      </Swiper>
    </div>
  );
}
