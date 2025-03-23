"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ oeuvres }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_DIRECTUS_STORAGE;
  const [selectedIndex, setSelectedIndex] = useState(null);

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
        <AnimatePresence mode="wait">
          {oeuvres.map((oeuvre, index) => (
            <motion.div
              key={oeuvre.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => handleOpen(index)}
            >
              <Image
                src={`${STORAGE_URL}/uploads/${oeuvre.image}`}
                alt={oeuvre.titre}
                width={300}
                height={300}
                className="object-cover rounded-lg"
              />
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