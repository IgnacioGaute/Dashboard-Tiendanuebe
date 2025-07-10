

export type Product = {
    name: string;
    price: number;
    externalId: string;
}


export type RawCategory = {
  id: string | number;
  name?: {
    es?: string;
    [key: string]: string | undefined;
  };
};