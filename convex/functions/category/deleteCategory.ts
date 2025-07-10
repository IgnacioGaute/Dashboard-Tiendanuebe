import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
  },
  handler: async ({ db }, args) => {
    const matching = await db
      .query("categories")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (!matching) {
      console.warn("Categoria no encontrada con externalId:", args.externalId);
      return;
    }

    await db.delete(matching._id);
  },
});
