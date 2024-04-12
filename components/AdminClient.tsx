"use client";
import axios from "axios";
import { useState } from "react";
import { countryOptions } from "@/helper/countryData";
import { useAppSelector } from "@/store/store";
import toast, { Toaster } from "react-hot-toast";

const AddClient: React.FC = () => {
  const user = useAppSelector((state) => state?.userData);
  const [formData, setFormData] = useState({
    clientname: "",
    contactnumber: "",
    email: "",
    country: "",
  });
  const notify = (status: boolean, message: string) => {
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.country === "" || formData.country === "placeholder") {
      console.error("Please select a country.");
      return;
    }
    const data = { formData, user };
    try {
      const response = await axios.post("/api/admin/client/addclient", data);
      setFormData({
        clientname: "",
        contactnumber: "",
        email: "",
        country: "",
      });
      notify(response.data.success, response.data.message);
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.message);
    }
  };

  return (
    <div>
      Add/Edit Client
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex mt-4 p-10">
          <div className="flex flex-col space-y-7">
            <input
              onChange={(e) =>
                setFormData({ ...formData, clientname: e.target.value })
              }
              value={formData.clientname}
              type="text"
              name="clientname"
              className="border w-full p-2 rounded-md"
              placeholder="Client Name"
              required
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, contactnumber: e.target.value })
              }
              type="tel"
              value={formData.contactnumber}
              className="border w-full p-2 rounded-md"
              maxLength={10}
              placeholder="Contact Number"
              name="contactnumber"
              required
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="email"
              className="border w-full p-2 rounded-md"
              placeholder="Email"
              name="email"
              required
            />
            <select
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              value={formData.country}
              id="country"
              className="border w-full bg-white p-2 rounded-md"
              name="country"
              required
            >
              {countryOptions.map((country, i) => {
                return (
                  <option key={i} value={country.value}>
                    {country.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-custom-green p-2 ml-auto float-right text-white align-right rounded-sm"
        >
          Add Client
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AddClient;
