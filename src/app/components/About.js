import Image from "next/image";

export default function About({ artiste }) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_DIRECTUS_STORAGE;
  const imageUrl = artiste.photo
    ? `${STORAGE_URL}/uploads/${artiste.photo}`
    : "/images/placeholder.jpg";

  return (
    <section
      id="about"
      className="relative rounded-xl overflow-hidden px-6 py-12 sm:px-10 lg:px-16"
    >
      <div className="backdrop-blur-md bg-black/60 text-white p-8 sm:p-10 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-8">
        <Image
          src={imageUrl}
          alt="Photo de l’artiste"
          width={220}
          height={220}
          className="rounded-full shadow-lg"
        />

        <div
          className="prose prose-description text-white max-w-3xl"
          dangerouslySetInnerHTML={{ __html: artiste.description }}
        />
      </div>
    </section>
  );
}