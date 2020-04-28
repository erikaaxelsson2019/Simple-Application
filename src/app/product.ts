export interface IProduct {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId?: number;
    category?: string;
    amount: number;
  }
  