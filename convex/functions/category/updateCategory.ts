import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
    name: v.string(),
  },
  handler: async ({ db }, args) => {
    const existing = await db
      .query("categories")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (!existing) {
      console.warn("Categoria no encontrada para actualizar:", args.externalId);
      return;
    }

    await db.patch(existing._id, {
      name: args.name,
    });
  },
});
