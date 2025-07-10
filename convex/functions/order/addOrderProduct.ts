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
    for (const product of args.products) {
      await db.insert("orderProducts", {
        orderExternalId: args.orderExternalId,
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }
  },
});
