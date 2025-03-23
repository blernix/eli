"use client";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Notification from "./components/Notification";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [filteredOeuvres, setFilteredOeuvres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/front");
      const json = await res.json();
      setData(json);
      setFilteredOeuvres(json.oeuvres); // Initialise avec toutes les œuvres
    };

    fetchData();
  }, []);

  if (!data) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <>
      <Header />
      <Notification data={data.notification} />

      <Hero image={data.hero} />


      <Categories
        categories={data.categories}
        oeuvres={data.oeuvres}
        onFilter={setFilteredOeuvres}
      />

      <Gallery oeuvres={filteredOeuvres} />


      <section id="about">
        <About artiste={data.artiste} />
      </section>
      <Footer />
    </>
  );
}