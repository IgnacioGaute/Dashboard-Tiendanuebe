import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { api } from "../../../../../convex/_generated/api";

const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { store_id, event, id: categoryId } = body;


    switch (event) {
      case "category/created": {
        const { data: category } = await axios.get(
          `https://api.tiendanube.com/2025-03/${store_id}/categories/${categoryId}`,
          {
            headers: {
              Authentication: `bearer ${ACCESS_TOKEN}`,
              "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
            },
          }
        );

        const name = category.name?.es || category.name || "Sin nombre";
        const externalId = category.id.toString();

        await fetchMutation(api.functions.category.addCategory.default, {
          name,
          externalId,
        });

        console.log("Categoria creada:", name);
        break;
      }

      case "category/deleted": {
        await fetchMutation(api.functions.category.deleteCategory.default, {
          externalId: categoryId.toString(),
        });
        console.log("Categoria eliminada:", categoryId);
        break;
      }

      case "category/updated": {
        const { data: updatedCategory } = await axios.get(
          `https://api.tiendanube.com/2025-03/${store_id}/categories/${categoryId}`,
          {
            headers: {
              Authentication: `bearer ${ACCESS_TOKEN}`,
              "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
            },
          }
        );

        const name = updatedCategory.name?.es || updatedCategory.name || "Sin nombre";
        const externalId = updatedCategory.id.toString();

        await fetchMutation(api.functions.category.updateCategory.default, {
          name,
          externalId,
        });

        console.log("🔄 Categoria actualizada:", name);
        break;
      }

      default:
        console.log("⚠️ Evento no manejado:", event);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error al procesar webhook:", err.message);
    } else {
      console.error("Error desconocido al procesar webhook:", err);
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
 }
}
