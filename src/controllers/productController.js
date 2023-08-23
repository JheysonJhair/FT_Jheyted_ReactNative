import { getProducts, getPromociones } from "../api/productApi.js";

export async function traerProductos() {
  try {
    const videosData = await getProducts();
    return videosData;
  } catch (error) {
    throw error;
  }
}
export async function traerPomociones() {
    try {
      const videosData = await getPromociones();
      return videosData;
    } catch (error) {
      throw error;
    }
  }