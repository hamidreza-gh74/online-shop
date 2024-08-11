import CreateForm from "@/componenets/profile/adressess/CreateForm";
import EditForm from "@/componenets/profile/adressess/EditForm";
import { getfetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export default async function AdressPage() {
  const token = cookies().get("token");
  const { addresses, provinces, cities } = await getfetch(
    "/profile/addresses",
    {
      Authorization: `Bearer ${token.value}`,
    }
  );
  return (
    <>
      <CreateForm provinces={provinces} cities={cities} />
      <hr />
      {addresses.map((adress) => (
        <EditForm adress={adress} provinces={provinces} cities={cities} />
      ))}
    </>
  );
}
