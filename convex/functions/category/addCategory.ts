import { mutation } from "../../_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    name: v.string(),
    externalId: v.string()
    
  },
  handler: async ({ db }, args) => {
    await db.insert("categories", {
      name: args.name,
      externalId: args.externalId
    });
  },
});
