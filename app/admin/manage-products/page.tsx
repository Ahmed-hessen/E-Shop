import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { Suspense } from "react";

export default async function ManageProducts() {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops ! Access denied" />;
  }

  // if (currentUser.role !== "ADMIN") {
  //   return <NullData title="Oops ! Access denied" />;
  // }

  return (
    <div className="pt-8">
      <Container>
        <Suspense>
          <ManageProductsClient products={products} />
        </Suspense>
      </Container>
    </div>
  );
}
