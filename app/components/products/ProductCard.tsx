"use client";

import { formatPrice } from "@/utils/formatePrice";
import { truncateText } from "@/utils/truncate";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const AverageProductRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div
      onClick={() => router.push(`/product/${product.id}`)}
      className="col-span-1
    cursor-pointer 
    border-[1.2px]
    border-slate-200
    bg-slate-50
    rounded-md
    transition
    hover:scale-105
    text-center
    text-sm"
    >
      <div
        className="flex flex-col 
      items-center 
      w-full 
      gap-2 p-1"
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={product.images[0].image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="product-image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(product.name)}</div>
        <div>
          <Rating value={AverageProductRating} readOnly />
        </div>
        <div>{product.reviews.length} reviews </div>
        <div className="font-semibold">{formatPrice(product.price)}</div>
      </div>
    </div>
  );
}
