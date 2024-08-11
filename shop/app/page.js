import About from "@/componenets/home/About";
import Contact from "@/componenets/home/contact/Contact";
import Features from "@/componenets/home/features";
import Products from "@/componenets/home/Products";
import { getfetch } from "@/utils/fetch";

export default async function Home() {
  const productTab = await getfetch("/products/products-tabs");
  console.log(productTab);

  return (
    <>
      <Features />
      <Products tabList={productTab.tabList} tabPanel={productTab.tabPanel} />
      <About />
      <Contact />
    </>
  );
}
