import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";
import { Suspense } from "react";

export default async function ManageOrders() {
  const orders = await getOrders();
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
          <ManageOrdersClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
}
