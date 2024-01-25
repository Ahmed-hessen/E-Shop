import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IproductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

export const revalidate = 0;

interface HomeProps {
  searchParams: IproductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops ! No Products found .click All to clear filters  " />
    );
  }

  // when go to the home page the arrangment of products will be changed
  function shuffleProductsArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffleProducts = shuffleProductsArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {shuffleProducts.map((product: any) => {
            {
              return <ProductCard key={product.id} product={product} />;
            }
          })}
        </div>
      </Container>
    </div>
  );
}
