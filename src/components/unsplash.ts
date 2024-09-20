import axios from "axios";
import { Image, ImageResponse } from "../types";

const UNSPLASH_ACCESS_KEY = "Gs56Z9hK_7g-rs_rts-xHBxpmNL4Hn66p_DIphdnhqU";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export default async function getImages(
  query: string,
  page: number
): Promise<ImageResponse> {
  const params = {
    query,
    page,
    per_page: 12,
  };

  const response = await unsplashApi.get<ImageResponse>("search/photos", {
    params,
  });

  return response.data;
}
