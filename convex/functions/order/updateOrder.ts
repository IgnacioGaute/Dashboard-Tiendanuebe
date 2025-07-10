import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
    status: v.string(),
    payment_status: v.string(),
    total: v.number(),
    customerName: v.string(),
  },
  handler: async ({ db }, args) => {
    const existing = await db
      .query("orders")
      .withIndex("by_externalId", (q) => q.eq("externalId", args.externalId))
      .first();

    if (!existing) {
      console.warn("No se encontró la orden para actualizar:", args.externalId);
      return;
    }

    await db.patch(existing._id, {
      status: args.status,
      payment_status: args.payment_status,
      total: args.total,
      customerName: args.customerName,
    });
  },
});
