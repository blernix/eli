"use client";
import { useEffect } from "react";

function decodeHTMLEntities(str) {
  if (typeof window === "undefined") return str;
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export default function Modal({ oeuvre, close, previous, next }) {
  const imageUrl = oeuvre.image
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_STORAGE}/uploads/${oeuvre.image}`
    : "/images/placeholder.jpg";

  const cleanDescription = decodeHTMLEntities(
    oeuvre.description.replace(/<[^>]+>/g, "")
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") previous();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, previous, next]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative bg-white rounded-xl shadow-lg max-w-2xl w-full h-[80vh] p-6 overflow-hidden flex flex-col">
        {/* Bouton fermeture */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl z-10"
        >
          ✖
        </button>

        {/* Zone scrollable */}
        <div className="overflow-auto mt-2 space-y-4">
          {/* Image + navigation */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={oeuvre.titre}
              className="max-h-[50vh] w-full object-contain rounded-lg"
            />

            <button
              onClick={previous}
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
            >
              ›
            </button>
          </div>

          <div className="px-1 text-center">
            <h2 className="text-2xl text-black font-semibold">{oeuvre.titre}</h2>
            <p className="text-gray-700">{cleanDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}