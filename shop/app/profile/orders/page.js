import Loading from "@/componenets/Loading";
import Table from "@/componenets/profile/order/Table";
import { Suspense } from "react";

export default function OrderPage({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  return (
    <Suspense key={params.toString()} fallback={<Loading />}>
      <Table params={params.toString()} />
    </Suspense>
  );
}
