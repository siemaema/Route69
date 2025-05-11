import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
export default function Footer() {
    return (
      <footer className="bg-zinc-950 text-yellow-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-4">
          <div>
            <h2 className="font-bold text-xl mb-2">Route69</h2>
            <p className="text-yellow-300/90 text-sm">
              ul. Przykładowa 12<br />
              00-123 Warszawa<br />
              NIP: 123-456-78-90
            </p>
          </div>
          <div>
            <div className="font-bold mb-2">Informacje</div>
            <ul className="space-y-1 text-sm">
              <li><a href="/rodo" className="hover:underline">Polityka RODO</a></li>
              <li><a href="/dostawa" className="hover:underline">Dostawa</a></li>
              <li><a href="/platnosci" className="hover:underline">Płatności</a></li>
              <li><a href="/kontakt" className="hover:underline">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Znajdziesz nas</div>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
                <FaFacebook className="w-6 h-6 text-yellow-400 hover:text-yellow-200" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
                <FaInstagram className="w-6 h-6 text-yellow-400 hover:text-yellow-200" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube">
                <FaYoutube className="w-6 h-6 text-yellow-400 hover:text-yellow-200" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-yellow-600 mt-6 text-xs">
          &copy; {new Date().getFullYear()} Route69. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    );
  }
  