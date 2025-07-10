import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    price: v.number(),
    externalId: v.string(),
    categories: v.optional(
      v.array(
        v.object({
          externalId: v.string(),
          name: v.string(),
        })
      )
    ),
  }).index("by_externalId", ["externalId"]),


  orders: defineTable({
    externalId: v.string(),
    status: v.string(),
    payment_status: v.string(),
    total: v.number(),
    createdAt: v.string(),
    customerName: v.string(),
  }).index("by_externalId", ["externalId"]),

  orderProducts: defineTable({
    orderExternalId: v.string(), 
    productId: v.string(),
    name: v.string(),
    price: v.number(),
    quantity: v.number(),
  }).index("by_orderExternalId", ["orderExternalId"]),

  categories: defineTable({
    externalId: v.string(), 
    name: v.string(),
  }).index("by_externalId", ["externalId"]),
});
