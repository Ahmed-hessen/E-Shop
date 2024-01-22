//Context Api to share the state
"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

interface CartContextType {
  cartProducts: CartProductType[] | null;
  cartTotalQty: number;
  cartTotalAmount: number;
  handleAddToCart: (product: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleIncreaseCartProductQuantity: (product: CartProductType) => void;
  handleDecreaseCartProductQuantity: (product: CartProductType) => void;
  handleClearCart: () => void;
  // Payment Intent for stripe
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
}
//1) First step to create the context
export const CartContext = createContext<CartContextType | null>(null);

//2) Create the provider
interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setcartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  //To store the products in the local storage
  useEffect(() => {
    const cartItems: any = localStorage.getItem("eshopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eshopPaymentIntent: any = localStorage.getItem("eshopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eshopPaymentIntent);
    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  // To calculate the subtotal and quantity of cart every time we added product
  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setcartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  // To added the products to the cart

  const handleAddToCart = useCallback((product: CartProductType) => {
    if (!product.inStock) {
      toast.error("Sorry, this product is out of stock", {
        duration: 4000,
      });
      return;
    }

    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    const updatedCartItems = JSON.parse(
      localStorage.getItem("eshopCartItems")!
    );

    if (updatedCartItems[updatedCartItems.length - 1].id === product.id) {
      toast.success("Product added to cart");
    }
    // console.log(x.length - 1);

    // console.log(localStorage.getItem("eshopCartItems")![x]);
  }, []);

  // To increase the product of cart by one
  const handleIncreaseCartProductQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Ooops ! maximum reached", {
          duration: 4000,
        });
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity++;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  //To decrease the products by one
  const handleDecreaseCartProductQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Ooops ! minimum reached", {
          duration: 4000,
        });
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity--;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eshopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleRemoveFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProduct = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filterProduct);
        toast.success("Product removed from cart", {
          duration: 3000,
        });
        localStorage.setItem("eshopCartItems", JSON.stringify(filterProduct));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    toast.success("Cart is cleared", {
      duration: 3000,
    });
    localStorage.setItem("eshopCartItems", JSON.stringify(null));
  }, []);

  // Add payment intent to local storage
  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eshopPaymentIntent", JSON.stringify(val));
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseCartProductQuantity,
    handleDecreaseCartProductQuantity,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};
//3) The component that will use the provider
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within acartContextProvider");
  }
  return context;
};
