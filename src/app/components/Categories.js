"use client";
import { useState } from "react";

export default function Categories({ categories, oeuvres, onFilter }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleClick = (id) => {
    setActiveCategory(id);
    const filtered =
      id === "all" ? oeuvres : oeuvres.filter((o) => o.categorie_id === id);
    onFilter(filtered);
  };

  const baseStyle =
    "px-5 py-2.5 rounded-full font-semibold text-sm shadow-md transition duration-300 transform hover:scale-105 focus:outline-none";

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6">
      <button
        onClick={() => handleClick("all")}
        className={`${baseStyle} ${
          activeCategory === "all"
            ? "bg-black text-white shadow-lg"
            : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
        }`}
      >
        Tous
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`${baseStyle} ${
            activeCategory === cat.id
              ? "bg-black text-white shadow-lg"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {cat.titre}
        </button>
      ))}
    </div>
  );
}