export default function Dostawa() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-yellow-300 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-400">Informacje o dostawie</h1>

      <p>
        Oferujemy różne formy dostawy, dzięki którym szybko i bezpiecznie otrzymasz swoje zamówienie. Poniżej znajdziesz
        szczegóły dotyczące opcji dostawy dostępnych w sklepie Route69.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">📦 Kurier InPost</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Czas dostawy: 1–2 dni robocze</li>
        <li>Koszt: 14,99 zł (darmowa dostawa od 199 zł)</li>
        <li>Numer przesyłki i link do śledzenia otrzymasz po wysyłce</li>
      </ul>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">📮 Paczkomaty InPost</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Czas dostawy: 1–2 dni robocze</li>
        <li>Koszt: 11,99 zł (darmowa dostawa od 199 zł)</li>
        <li>Wygodny odbiór 24/7 w wybranym paczkomacie</li>
        <li>Otrzymasz kod odbioru SMS-em i e-mailem</li>
      </ul>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">🚚 Kurier DPD</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Czas dostawy: 1–2 dni robocze</li>
        <li>Koszt: 16,99 zł</li>
        <li>Możliwość zmiany terminu dostawy i przekierowania paczki</li>
      </ul>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">🏪 Odbiór osobisty</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Możliwy w siedzibie firmy (adres: ul. Przykładowa 123, 00-000 Warszawa)</li>
        <li>Bezpłatny</li>
        <li>Godziny odbioru: pon–pt 9:00–16:00</li>
        <li>Oczekuj e-maila z potwierdzeniem gotowości do odbioru</li>
      </ul>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">🕒 Czas realizacji</h2>
      <p>
        Zamówienia złożone i opłacone do godziny 15:00 są zazwyczaj wysyłane tego samego dnia roboczego. W przypadku
        opóźnień poinformujemy Cię mailowo lub telefonicznie.
      </p>

      <h2 className="text-2xl font-semibold text-yellow-400 mt-6">📌 Uwagi</h2>
      <p>
        W przypadku nietypowych zamówień lub produktów gabarytowych zastrzegamy sobie prawo do indywidualnego kontaktu w
        celu ustalenia formy dostawy.
      </p>
    </div>
  );
}
