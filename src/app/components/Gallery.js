// components/Gallery.js

"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "./AnimatedBackground";

export default function Gallery({ oeuvres }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_DIRECTUS_STORAGE;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGalleryVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Déclenche l'événement dès que 10% de l'élément est visible
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, [galleryRef]);

  const handleOpen = (index) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : oeuvres.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < oeuvres.length - 1 ? prev + 1 : 0));
  };

  const selectedOeuvre =
    selectedIndex !== null ? oeuvres[selectedIndex] : null;

  return (
    <>
      {/* L'orb lumineux est un composant indépendant qui réagit à la visibilité de la galerie */}
      <AnimatedBackground/>

      {/* Le conteneur de la galerie, maintenant avec une référence pour l'observer */}
      <div
        ref={galleryRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6 relative overflow-hidden z-10"
      >
      <AnimatePresence mode="wait">
  {oeuvres.map((oeuvre, index) => (
    <motion.div
      key={oeuvre.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer relative overflow-hidden aspect-square rounded-lg " // <-- Modifications ici
      onClick={() => handleOpen(index)}
    >
      {oeuvre.image && (
        <Image
          src={`${STORAGE_URL}/uploads/${oeuvre.image}`}
          alt={oeuvre.titre}
          fill
          className="object-contain p-2" // <-- Modifications ici
        />
      )}
      {oeuvre.video && (
        <video
          src={`${STORAGE_URL}/uploads/${oeuvre.video}`}
          title={oeuvre.titre}
          fill // <-- Modification ici
          autoPlay
          loop
          muted
          playsInline
                  className="absolute inset-0 w-full h-full object-contain p-2" 
        />
      )}
    </motion.div>
  ))}
</AnimatePresence>
      </div>

      {selectedOeuvre && (
        <Modal
          oeuvre={selectedOeuvre}
          close={handleClose}
          previous={handlePrevious}
          next={handleNext}
        />
      )}
    </>
  );
}