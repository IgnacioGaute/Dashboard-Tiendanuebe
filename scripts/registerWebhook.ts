import axios from "axios";

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

const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN!;
const STORE_ID = process.env.STORE_ID!;

(async () => {
  for (const event of events) {
    try {
      const [category] = event.split("/");
      const endpoint = `${BASE_URL}/${category}`;

      const res = await axios.post(
        `https://api.tiendanube.com/2025-03/6458460/webhooks`,
        {
          event,
          url: endpoint,
        },
        {
          headers: {
            Authentication: `bearer 918d819701f9a053605cfa0329f4de2512e5aff5`,
            "Content-Type": "application/json",
            "User-Agent": "my-dashboard (nachitogaute@gmail.com)",
          },
        }
      );

      console.log(`✅ Webhook '${event}' creado en ${endpoint}`);
    } catch (err: any) {
      console.error(`❌ Error al crear webhook '${event}':`, err.response?.data || err.message);
    }
  }
})();
