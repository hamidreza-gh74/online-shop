import EditInfo from "@/componenets/profile/info/EditInfo";
import { getfetch } from "@/utils/fetch";
import { cookies } from "next/headers";

export default async function PageProfile() {
  const token = cookies().get("token");
  const user = await getfetch("/profile/info", {
    Authorization: `Bearer ${token.value}`,
  });
  return (
    <div className="vh-70">
      <EditInfo user={user} />
    </div>
  );
}
