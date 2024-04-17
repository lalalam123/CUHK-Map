import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query") || "";
    const response = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyAeknMMRheQTIzncV3Lxu_0kVhQiX140Oc",
        "X-Goog-FieldMask":
          "places.name,places.displayName,places.types,places.formattedAddress,places.location,places.rating,places.currentOpeningHours",
      }),
      body: JSON.stringify({
        maxResultCount: 6,
        textQuery: query + "at the chinese university of hong kong",
        languageCode: "en",
        locationBias: {
          circle: {
            center: { latitude: 22.418237, longitude: 114.207335 },
            radius: 300.0,
          },
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", {
      status: 500,
    });
  }
}
