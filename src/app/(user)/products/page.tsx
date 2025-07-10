import { ProductsRealtime } from "./components/products-realtime";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-6 sm:mb-8 bg-secondary/100 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Productos</h1>
        </div>
      </div>
      <ProductsRealtime />
    </div>
  );
}
