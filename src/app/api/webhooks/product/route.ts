import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { api } from "../../../../../convex/_generated/api";

const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { store_id, event, id: productId } = body;

    switch (event) {
      case "product/created": {
        const { data: product } = await axios.get(
          `https://api.tiendanube.com/2025-03/${store_id}/products/${productId}`,
          {
            headers: {
              Authentication: `bearer ${ACCESS_TOKEN}`,
              "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
            },
          }
        );

        const name = product.name?.es || product.name || "Sin nombre";
        const price = Number(product.variants?.[0]?.price || 0);
        const externalId = product.id.toString();
        const categories = product.categories?.map((cat: any) => ({
          externalId: cat.id.toString(),
          name: cat.name?.es || "Sin nombre",
        })) || [];

        await fetchMutation(api.functions.product.addProduct.default, {
          name,
          price,
          externalId,
          categories
        });

        console.log("Producto creado:", name);
        break;
      }

      case "product/deleted": {
        await fetchMutation(api.functions.product.deleteProduct.default, {
          externalId: productId.toString(),
        });
        console.log("Producto eliminado:", productId);
        break;
      }

      case "product/updated": {
        const { data: updatedProduct } = await axios.get(
          `https://api.tiendanube.com/2025-03/${store_id}/products/${productId}`,
          {
            headers: {
              Authentication: `bearer ${ACCESS_TOKEN}`,
              "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
            },
          }
        );

        const name = updatedProduct.name?.es || updatedProduct.name || "Sin nombre";
        const price = Number(updatedProduct.variants?.[0]?.price || 0);
        const externalId = updatedProduct.id.toString();
        const categories = updatedProduct.categories?.map((cat: any) => ({
          externalId: cat.id.toString(),
          name: cat.name?.es || "Sin nombre",
        })) || [];

        await fetchMutation(api.functions.product.updateProduct.default, {
          name,
          price,
          externalId,
          categories
        });

        console.log("Producto actualizado:", name);
        break;
      }

      default:
        console.log("Evento no manejado:", event);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ Error al procesar webhook:", err.response?.data || err.message);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
