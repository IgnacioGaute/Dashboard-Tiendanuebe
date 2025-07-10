import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    orderExternalId: v.string(),
    products: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
  },
  handler: async ({ db }, args) => {
    const existingProducts = await db
      .query("orderProducts")
      .withIndex("by_orderExternalId", (q) => q.eq("orderExternalId", args.orderExternalId))
      .collect();

    for (const product of existingProducts) {
      await db.delete(product._id);
    }

    for (const p of args.products) {
      await db.insert("orderProducts", {
        orderExternalId: args.orderExternalId,
        productId: p.productId,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
    }
  },
});
