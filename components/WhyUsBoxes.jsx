export default function WhyUsBoxes() {
  const items = [
    { icon: "🚚", label: "Szybka wysyłka" },
    { icon: "🏆", label: "Gwarancja jakości" },
    { icon: "📞", label: "Ekspercka obsługa" },
    { icon: "🔁", label: "14 dni na zwrot" },
  ];

  return (
    <section className="py-12 bg-gradient-to-b rounded-2xl from-[#2a1a06] to-[#3b2205]">
      <h2 className="text-center text-yellow-400 text-3xl font-extrabold mb-10">
        Dlaczego Route69?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-zinc-900 border border-yellow-500/20 hover:border-yellow-400/60 rounded-2xl shadow-lg text-center py-8 px-4 transition-all hover:scale-[1.03] hover:shadow-yellow-400/20"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <p className="text-yellow-300 font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
