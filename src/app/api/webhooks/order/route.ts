import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";
import { api } from "../../../../../convex/_generated/api";
import { OrderProduct, RawOrderProduct } from "@/types/order.type";

const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { store_id, event, id: orderId } = body;

    const { data: order } = await axios.get(
      `https://api.tiendanube.com/2025-03/${store_id}/orders/${orderId}`,
      {
        headers: {
          Authentication: `bearer ${ACCESS_TOKEN}`,
          "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
        },
      }
    );

    const externalId = order.id.toString();
    const status = order.status;
    const payment_status = order.payment_status;
    const total = Number(order.total || 0);
    const createdAt = order.created_at;
    const customerName = order.contact_name || "Cliente sin nombre";

    const orderProducts: OrderProduct[] = order.products.map((p: RawOrderProduct ) => ({
      orderExternalId: order.externalId, 
      productId: p.product_id.toString(),
      name: p.name || "Sin nombre",
      price: Number(p.price || 0),
      quantity: Number(p.quantity || 1),
    }));

    switch (event) {
      case "order/created":
        await fetchMutation(api.functions.order.addOrder.default, {
          externalId,
          status,
          payment_status,
          total,
          createdAt,
          customerName,
        });

        await fetchMutation(api.functions.order.addOrderProduct.default, {
          orderExternalId: externalId,
          products: orderProducts,
        });

        console.log("Orden creada:", externalId);
        break;

      case "order/updated":
      case "order/paid":
        await fetchMutation(api.functions.order.updateOrder.default, {
          externalId,
          status,
          payment_status,
          total,
          customerName,
        });

        await fetchMutation(api.functions.order.updateOrderProduct.default, {
          orderExternalId: externalId,
          products: orderProducts,
        });

        console.log("Orden actualizada:", externalId);
        break;

      case "order/cancelled":
        await fetchMutation(api.functions.order.deleteOrder.default, {
          externalId,
        });
        console.log("Orden cancelada y eliminada:", externalId);
        break;

      default:
        console.log("Evento no manejado:", event);
    }

    return NextResponse.json({ ok: true });
  }catch (err) {
    if (err instanceof Error) {
      console.error("Error al procesar webhook:", err.message);
    } else {
      console.error("Error desconocido al procesar webhook:", err);
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
 }
}
