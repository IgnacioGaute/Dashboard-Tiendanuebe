import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    name: v.string(),
    price: v.number(),
    externalId: v.string(),
    categories: v.array(
      v.object({
        externalId: v.string(),
        name: v.string(),
      })
    ),
    
  },
  handler: async ({ db }, args) => {
    await db.insert("products", {
      name: args.name,
      price: args.price,
      externalId: args.externalId,
      categories: args.categories,
    });
  },
});
