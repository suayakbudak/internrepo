import { axiosAuth } from "../axios";
import { endpoints } from "../axios";

export const getAdvertImages = async (advertId) =>
  axiosAuth
    .get(`${endpoints.ilan.getImages}/${advertId}`)
    .then((response) => response.data.adImages || [])
    .catch((error) => {
      console.error("Error fetching images:", error);
      return [];
    });
