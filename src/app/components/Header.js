"use client";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Elisabeth-Verschueren-Moreau</h1>

        <nav className="hidden md:flex space-x-6 text-white">
          <a href="#about" onClick={(e) => handleClick(e, "about")} className="hover:underline">
            À propos
          </a>
          
          <a
            href="mailto:elisabethmoreau13@yahoo.fr"
            className="bg-white text-black px-4 py-1 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Écrire
          </a>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 text-white">
          <a
            href="#about"
            onClick={(e) => handleClick(e, "about")}
            className="block px-4 py-2 border-b border-white/20 hover:bg-white/10"
          >
            À propos
          </a>
       
          <a
            href="mailto:elisabethmoreau13@yahoo.fr"
            className="block px-4 py-2 hover:bg-white/10"
          >
            Écrire
          </a>
        </div>
      )}
    </header>
  );
}