"use client";

import {
  SelectedImgType,
  CartProductType,
} from "@/app/product/[productId]/ProductDetails";

interface setColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export default function SetColor({
  images,
  cartProduct,
  handleColorSelect,
}: setColorProps) {
  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold ">COLOR : </span>
      <div className="flex gap-1">
        {images.map((image) => {
          return (
            <div
              className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "none"
              }`}
              key={image.colorCode}
              onClick={() => handleColorSelect(image)}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
