import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    externalId: v.string(),
    status: v.string(),
    payment_status: v.string(),
    total: v.number(),
    createdAt: v.string(),
    customerName: v.string(),
  },
  handler: async ({ db }, args) => {
    await db.insert("orders", {
      externalId: args.externalId,
      status: args.status,
      payment_status: args.payment_status,
      total: args.total,
      createdAt: args.createdAt,
      customerName: args.customerName,
    });
  },
});
