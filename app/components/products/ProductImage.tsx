"use client";

import {
  SelectedImgType,
  CartProductType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

export default function ProductImage({
  cartProduct,
  product,
  handleColorSelect,
}: ProductImageProps) {
  return (
    <div
      className="grid grid-cols-6 gap-2
      h-full max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]"
    >
      <div
        className="flex flex-col items-center justify-center gap-4 cursor-pointer border
          h-full max-h-[500px]
              min-h-[300px]
              sm:min-h-[400px]"
      >
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              className={`relative w-[80%]
                aspect-square rounded
                border-teal-300 
                ${
                  cartProduct.selectedImg.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }
              `}
              key={image.colorCode}
              onClick={() => handleColorSelect(image)}
            >
              <Image
                className="object-contain"
                alt="images"
                src={image.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>

      <div className="relative aspect-square col-span-5 ">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain w-fll  h-full max-h-[500px]
          min-h-[300px]
          sm:min-h-[400px]"
        />
      </div>
    </div>
  );
}
