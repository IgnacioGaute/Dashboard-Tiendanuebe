'use client';

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ProductsTable } from "./products-table";
import { productColumns } from "./product-columns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMemo, useState } from "react";

type Category = {
  _id: string;
  name: string;
};

export function ProductsRealtime() {
  const rawProducts = useQuery(api.functions.product.getAllProducts.default, {});
  const rawCategories = useQuery(api.functions.category.getAllCategories.default, {});
  const rawOrderProducts = useQuery(api.functions.order.getAllOrderProducts.default, {});

  const products = useMemo(() => rawProducts ?? [], [rawProducts]);
  const categories = useMemo(() => rawCategories ?? [], [rawCategories]);
  const orderProducts = useMemo(() => rawOrderProducts ?? [], [rawOrderProducts]);

  const [selected, setSelected] = useState("TODOS");

  const filteredProducts = useMemo(() => {
    if (selected === "TODOS") return products;

    return products.filter((product) =>
      product.categories?.some((cat: { name: string }) => cat.name === selected)
    );
  }, [selected, products]);

  return (
    <Tabs
      defaultValue="TODOS"
      value={selected}
      onValueChange={setSelected}
      className="space-y-6"
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Filtrar por categoría</p>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full bg-transparent p-0">
          <TabsTrigger
            className="w-full border border-muted rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/70 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white"
            value="TODOS"
          >
            Todas
          </TabsTrigger>
          {categories.map((cat: Category) => (
            <TabsTrigger
              key={cat._id}
              value={cat.name}
              className="w-full border border-muted rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/70 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value={selected} className="pt-10">
        <ProductsTable columns={productColumns(orderProducts)} data={filteredProducts} />
      </TabsContent>
    </Tabs>
  );
}
