import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("🔍 Requête API - Récupération des données du site");

  try {
    const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_API;
    const TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

    if (!API_URL || !TOKEN) {
      throw new Error("❌ API_URL ou TOKEN manquant dans .env !");
    }

    const headers = { Authorization: `Bearer ${TOKEN}` };

    const [
      heroRes,
      categoriesRes,
      oeuvresRes,
      artisteRes,
      photoRes,
      notificationRes,
    ] = await Promise.all([
      fetch(`${API_URL}/items/couverture?fields=image.filename_disk`, { headers }),
      fetch(`${API_URL}/items/categories_oeuvres?fields=id,titre`, { headers }),
      fetch(`${API_URL}/items/oeuvres?fields=id,titre,description,image.filename_disk,categorie_id.id`, { headers }),
      fetch(`${API_URL}/items/description?fields=contenu`, { headers }),
      fetch(`${API_URL}/items/photo_profil?fields=image.filename_disk`, { headers }),
      fetch(`${API_URL}/items/notification?filter[activation][_eq]=true&filter[status][_eq]=published&fields=type,message,date_start,start_end`, { headers }),
    ]);

    if (![heroRes, categoriesRes, oeuvresRes, artisteRes, photoRes, notificationRes].every(res => res.ok)) {
      throw new Error("❌ Erreur lors de la récupération des données Directus.");
    }

    const [
      heroData,
      categoriesData,
      oeuvresData,
      artisteData,
      photoData,
      notificationData,
    ] = await Promise.all([
      heroRes.json(),
      categoriesRes.json(),
      oeuvresRes.json(),
      artisteRes.json(),
      photoRes.json(),
      notificationRes.json(),
    ]);

    const formattedData = {
      hero: heroData.data?.[0]?.image?.filename_disk || null,
      categories: categoriesData.data || [],
      oeuvres: oeuvresData.data.map(oeuvre => ({
        id: oeuvre.id,
        titre: oeuvre.titre,
        description: oeuvre.description,
        image: oeuvre.image?.filename_disk || null,
        categorie_id: oeuvre.categorie_id?.id || null,
      })),
      artiste: {
        description: artisteData.data?.[0]?.contenu || "",
        photo: photoData.data?.[0]?.image?.filename_disk || null,
      },
      notification: notificationData.data?.[0] || null,
    };

    console.log("📦 Données formatées :", JSON.stringify(formattedData, null, 2));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("❌ Erreur API :", error);
    return NextResponse.json({ message: error.message || "Erreur serveur" }, { status: 500 });
  }
}