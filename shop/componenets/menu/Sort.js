"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparam = useSearchParams();

  const handleclick = (type) => {
    const params = new URLSearchParams(searchparam);
    params.set("sortBy", type);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label className="form-label">مرتب سازی</label>
      <div className="form-check my-2">
        <input
          checked={
            searchparam.has("sortBy") && searchparam.get("sortBy") == "max"
          }
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={() => handleclick("max")}
        />
        <label className="form-check-label cursor-pointer">بیشترین قیمت</label>
      </div>
      <div className="form-check my-2">
        <input
          checked={
            searchparam.has("sortBy") && searchparam.get("sortBy") == "min"
          }
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={() => handleclick("min")}
        />
        <label className="form-check-label cursor-pointer">کمترین قیمت</label>
      </div>
      <div className="form-check my-2">
        <input
          checked={
            searchparam.has("sortBy") &&
            searchparam.get("sortBy") == "bestceller"
          }
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={() => handleclick("bestceller")}
        />
        <label className="form-check-label cursor-pointer">پرفروش ترین</label>
      </div>
      <div className="form-check my-2">
        <input
          checked={
            searchparam.has("sortBy") && searchparam.get("sortBy") == "sale"
          }
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          onChange={() => handleclick("sale")}
        />
        <label className="form-check-label cursor-pointer">با تخفیف</label>
      </div>
    </div>
  );
}
