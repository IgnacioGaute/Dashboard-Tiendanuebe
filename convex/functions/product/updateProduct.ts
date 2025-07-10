import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
    name: v.string(),
    price: v.number(),
    categories: v.array(
      v.object({
        externalId: v.string(),
        name: v.string(),
      })
    ),
  },
  handler: async ({ db }, args) => {
    const existing = await db
      .query("products")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (!existing) {
      console.warn("Producto no encontrado para actualizar:", args.externalId);
      return;
    }

    await db.patch(existing._id, {
      name: args.name,
      price: args.price,
      categories: args.categories,
    });
  },
});
