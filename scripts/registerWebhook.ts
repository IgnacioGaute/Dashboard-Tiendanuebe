import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://dashboard-tiendanuebe-u1cw.vercel.app/api/webhooks";

const events = [
  "product/created",
  "product/updated",
  "product/deleted",
  "order/created",
  "order/updated",
  "order/cancelled",
  "order/paid",
  "category/created",
  "category/updated",
  "category/deleted",
];


(async () => {
  for (const event of events) {
    try {
      const [category] = event.split("/");
      const endpoint = `${BASE_URL}/${category}`;

      const res = await axios.post(
        `https://api.tiendanube.com/2025-03/${process.env.STORE_ID}/webhooks`,
        {
          event,
          url: endpoint,
        },
        {
          headers: {
            Authentication: `bearer ${process.env.TIENDANUBE_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": `my-dashboard ${process.env.EMAIL}`,
          },
        }
      );

      console.log(`Webhook '${event}' creado en ${endpoint}`);
    } catch (err: any) {
      console.error(`Error al crear webhook '${event}':`, err.response?.data || err.message);
    }
  }
})();
