"use client";
import { formatPrice } from "@/utils/formatePrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import { truncateText } from "@/utils/truncate";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContenProps {
  item: CartProductType;
}
export default function ItemContent({ item }: ItemContenProps) {
  const {
    handleRemoveFromCart,
    handleIncreaseCartProductQuantity,
    handleDecreaseCartProductQuantity,
  } = useCart();
  return (
    <div
      className="grid grid-cols-5 text-xs md:text-sm gap-4
     border-t-[1.5px] borter-slate-200
     py-4 items-center "
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className=" relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt="product-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between gap-1">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <span>{item.selectedImg.color}</span>
          <div className="w-[70px]">
            <button
              className="text-left underline text-slate-600 mt-2"
              onClick={() => {
                handleRemoveFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center font-semibold">
        {formatPrice(item.price)}
      </div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyDecrease={() => {
            handleDecreaseCartProductQuantity(item);
          }}
          handleQtyIncrease={() => {
            handleIncreaseCartProductQuantity(item);
          }}
        />
      </div>
      <div className="justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
}
