"use client";

import { useState } from "react";
import SubmitButton from "@/componenets/SubmitButton";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { EditAddress } from "@/Action/profile";
import DeletForm from "./DeleteForm";

export default function EditForm({ adress, provinces, cities }) {
  const [citiesFilter, setCitiesFilter] = useState(cities);

  function changeProvince(e) {
    setCitiesFilter(
      cities.filter((city) => city.province_id == e.target.value)
    );
  }

  const [stateEdit, formActionEdit] = useFormState(EditAddress, {});
  useEffect(() => {
    toast(stateEdit?.message, { type: `${stateEdit?.status}` });
  }, [stateEdit]);

  return (
    <>
      <div key={adress.id} className="position-relative">
        <form action={formActionEdit} className="card card-body mt-3">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input
                defaultValue={adress.title}
                name="title"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input
                defaultValue={adress.cellphone}
                name="cellphone"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input
                defaultValue={adress.postal_code}
                name="postal_code"
                type="text"
                className="form-control"
              />
            </div>
            <div className="col col-md-6">
              <label className="form-label">استان</label>
              <select
                name="province_id"
                className="form-select"
                onChange={changeProvince}
                defaultValue={adress.province_id}
              >
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col col-md-6">
              <label className="form-label">شهر</label>
              <select
                name="city_id"
                className="form-select"
                defaultValue={adress.city_id}
              >
                {citiesFilter.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col col-md-12">
              <label className="form-label">آدرس</label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                name="address"
                defaultValue={adress.adress}
              ></textarea>
            </div>
            <input type="hidden" value={adress.id} name="address_id" />
          </div>
          <div>
            <SubmitButton title="ویرایش" style="btn btn-primary mt-4" />
          </div>
        </form>
        <DeletForm  adressId={adress.id}/>
      </div>
    </>
  );
}
