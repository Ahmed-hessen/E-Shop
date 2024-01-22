import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "../SearchBar";
import { Suspense } from "react";

const redressed = Redressed({ subsets: ["latin"], weight: "400" });

export default async function NavBar() {
  const currentUser = await getCurrentUser();

  return (
    <header>
      <nav className="sticky top-0 bg-slate-200 z-50 shadow-sm ">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex justify-between items-center gap-3 md-gap-0">
              <Link
                href="/"
                className={`${redressed.className} text-2xl font-bold `}
              >
                E-Shop
              </Link>
              <Suspense>
                <SearchBar />
              </Suspense>
              <div className="flex items-center gap-8 md:gap-12 ">
                <Link href="/cart">
                  <CartCount />
                </Link>
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </Container>{" "}
        </div>
        <Categories />
      </nav>
    </header>
  );
}
