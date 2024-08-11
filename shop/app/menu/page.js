import Loading from "@/componenets/Loading";
import CategoriesList from "@/componenets/menu/CategoriesList";
import ProductList from "@/componenets/menu/ProductList";
import Search from "@/componenets/menu/Search";
import Sort from "@/componenets/menu/Sort";
import { getfetch } from "@/utils/fetch";
import { Suspense } from "react";

export default async function MenuPage({ searchParams }) {
  const categories = await getfetch("/categories");
  const param = new URLSearchParams(searchParams);

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <Search />
            <hr />
            <CategoriesList categories={categories} />

            <hr />
            <Sort />
          </div>
          <div className="col-sm-12 col-lg-9">
            <Suspense key={param.toString()} fallback={<Loading />}>
              <ProductList param={param.toString()} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
