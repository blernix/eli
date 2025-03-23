export default function Hero({ image }) {
  const imageUrl = image
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_STORAGE}/uploads/${image}`
    : "/images/placeholder.jpg";

  return (
    <div className="w-full flex mt-7 justify-center items-center py-8">
      <img
        src={imageUrl}
        alt="Image de couverture"
        className="max-w-5xl w-full h-auto rounded-xl shadow-lg object-cover"
      />
    </div>
  );
}