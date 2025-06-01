export default function Reklamacje() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-yellow-300 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Reklamacje i zwroty</h1>

      <p>
        Zadowolenie klientów jest dla nas priorytetem. Jeśli otrzymany produkt jest wadliwy lub niezgodny z opisem,
        masz prawo do złożenia reklamacji.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400">📩 Jak złożyć reklamację?</h2>
      <p>
        Reklamacje można składać drogą elektroniczną. Prosimy o przesłanie wiadomości zawierającej:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Imię i nazwisko</li>
        <li>Numer zamówienia</li>
        <li>Opis wady lub niezgodności</li>
        <li>Załączone zdjęcia (jeśli to możliwe)</li>
        <li>Proponowane rozwiązanie (np. wymiana, zwrot pieniędzy)</li>
      </ul>
      <p>
        Adres e-mail do zgłaszania reklamacji: <span className="font-semibold text-yellow-200">[TUTAJ WPISZ SWÓJ E-MAIL]</span>
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400">📜 Termin na reklamację</h2>
      <p>
        Zgodnie z ustawą o prawach konsumenta, masz 2 lata od daty otrzymania produktu na złożenie reklamacji. 
        Reklamacja zostanie rozpatrzona w ciągu 14 dni kalendarzowych od daty jej otrzymania.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400">🚚 Zwrot towaru</h2>
      <p>
        W przypadku uznania reklamacji możesz zostać poproszony o odesłanie wadliwego towaru na nasz adres. Koszty
        przesyłki zostaną Ci zwrócone.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400">📦 Adres do zwrotów (tylko po uzgodnieniu)</h2>
      <p>
        Szczegółowy adres do zwrotu zostanie podany po pozytywnym rozpatrzeniu reklamacji. Nie wysyłaj towaru bez wcześniejszego kontaktu z nami.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400">📝 Podstawa prawna</h2>
      <p>
        Reklamacje rozpatrywane są zgodnie z ustawą z dnia 30 maja 2014 r. o prawach konsumenta oraz Kodeksem cywilnym.
      </p>
    </div>
  );
}
