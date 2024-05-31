export interface ImageAsset {
    _ref: string;
    _type: string;
}
  
export interface ProductImage {
_key: string;
_type: string;
asset: ImageAsset;
}

export interface Products {
_createdAt: string;
_id: string;
_rev: string;
_type: string;
_updatedAt: string;
details: string;
image: ProductImage[];
name: string;
price: number;
slug: {
    _type: string;
    current: string;
};
}
  
export type ProductsResponse = Products[];
  