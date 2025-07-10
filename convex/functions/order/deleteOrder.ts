import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
  },
  handler: async ({ db }, args) => {
    const order = await db
      .query("orders")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (order) await db.delete(order._id);

    const products = await db
      .query("orderProducts")
      .withIndex("by_orderExternalId", (q) => q.eq("orderExternalId", args.externalId))
      .collect();

    for (const product of products) {
      await db.delete(product._id);
    }
  },
});
