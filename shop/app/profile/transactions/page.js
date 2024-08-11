import Loading from "@/componenets/Loading";
import Table from "@/componenets/profile/transAction/Table";
import { Suspense } from "react";

export default function TransActionsPage({ searchParams }) {
  const params = new URLSearchParams(searchParams);

  return (
    <Suspense key={params.toString()} fallback={<Loading />}>
      <Table params={params.toString()} />
    </Suspense>
  );
}
