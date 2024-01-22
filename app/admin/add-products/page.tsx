import Container from "@/app/components/Container";
import AddProductForm from "./AddProductForm";
import FormWrap from "@/app/components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { Suspense } from "react";

export default async function page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops ! Access denied" />;
  }
  // if (currentUser.role !== "ADMIN") {
  //   return <NullData title="Oops ! Access denied" />;
  // }

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <Suspense>
            <AddProductForm />
          </Suspense>
        </FormWrap>
      </Container>
    </div>
  );
}
