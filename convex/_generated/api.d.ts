/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_category_addCategory from "../functions/category/addCategory.js";
import type * as functions_category_deleteCategory from "../functions/category/deleteCategory.js";
import type * as functions_category_getAllCategories from "../functions/category/getAllCategories.js";
import type * as functions_category_updateCategory from "../functions/category/updateCategory.js";
import type * as functions_order_addOrder from "../functions/order/addOrder.js";
import type * as functions_order_addOrderProduct from "../functions/order/addOrderProduct.js";
import type * as functions_order_deleteOrder from "../functions/order/deleteOrder.js";
import type * as functions_order_getAllOrderProducts from "../functions/order/getAllOrderProducts.js";
import type * as functions_order_getAllOrders from "../functions/order/getAllOrders.js";
import type * as functions_order_updateOrder from "../functions/order/updateOrder.js";
import type * as functions_order_updateOrderProduct from "../functions/order/updateOrderProduct.js";
import type * as functions_product_addProduct from "../functions/product/addProduct.js";
import type * as functions_product_deleteProduct from "../functions/product/deleteProduct.js";
import type * as functions_product_getAllProducts from "../functions/product/getAllProducts.js";
import type * as functions_product_updateProduct from "../functions/product/updateProduct.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/category/addCategory": typeof functions_category_addCategory;
  "functions/category/deleteCategory": typeof functions_category_deleteCategory;
  "functions/category/getAllCategories": typeof functions_category_getAllCategories;
  "functions/category/updateCategory": typeof functions_category_updateCategory;
  "functions/order/addOrder": typeof functions_order_addOrder;
  "functions/order/addOrderProduct": typeof functions_order_addOrderProduct;
  "functions/order/deleteOrder": typeof functions_order_deleteOrder;
  "functions/order/getAllOrderProducts": typeof functions_order_getAllOrderProducts;
  "functions/order/getAllOrders": typeof functions_order_getAllOrders;
  "functions/order/updateOrder": typeof functions_order_updateOrder;
  "functions/order/updateOrderProduct": typeof functions_order_updateOrderProduct;
  "functions/product/addProduct": typeof functions_product_addProduct;
  "functions/product/deleteProduct": typeof functions_product_deleteProduct;
  "functions/product/getAllProducts": typeof functions_product_getAllProducts;
  "functions/product/updateProduct": typeof functions_product_updateProduct;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
