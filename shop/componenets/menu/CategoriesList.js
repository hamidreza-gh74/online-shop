"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoriesList({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchparam = useSearchParams();
  const handlecategory = (id) => {
    const params = new URLSearchParams(searchparam);
    params.set("category", id);
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="filter-list">
      <div className="form-label">دسته بندی</div>
      <ul>
        {categories.map((category) => (
          <li
            onClick={() => handlecategory(category.id)}
            key={category.id}
            className={
              searchparam.has("category") &&
              searchparam.get("category") == category.id
                ? "my-2 cursor-pointer filter-list-active "
                : "my-2 cursor-pointer"
            }
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
