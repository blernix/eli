import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-20">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm flex flex-col items-center space-y-2">
        <a
          href="https://www.instagram.com/elisabethverschueren/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-pink-400 transition"
          aria-label="Instagram"
        >
          <FaInstagram className="text-2xl" />
        </a>
        <p>
          &copy; {new Date().getFullYear()} Elisabeth Verschueren Moreau. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}