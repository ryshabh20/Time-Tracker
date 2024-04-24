"use client";
import axios from "axios";
import { useState } from "react";
import { countryOptions } from "@/helper/countryData";
import { useAppSelector } from "@/store/store";
import AdminRoute from "@/helperComponents/AdminRoute";
import toast, { Toaster } from "react-hot-toast";
interface AddClientForm {
  clientname?: string;
  contactnumber?: string;
  email?: string;
  country?: string;
}

const AddClient = () => {
  const user = useAppSelector((state) => state.userData);
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
  const [formError, setformError] = useState<AddClientForm>({
    clientname: "",
    contactnumber: "",
    email: "",
    country: "",
  });
  const formValidation = () => {
    let isValid = true;
    let errors: AddClientForm = {};
    if (formData.clientname.trim() === "") {
      errors.clientname = "Client name cannot be empty";
      isValid = false;
    }
    if (!formData.contactnumber) {
      errors.contactnumber = "Contact number cannot be empty";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.contactnumber)) {
      errors.contactnumber = "Phone number is not valid";
      isValid = false;
    }
    if (!formData.email) {
      errors.email = "Email cannot be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }
    if (!formData.country) {
      errors.country = "Country cannot be empty";
      isValid = false;
    }
    setformError(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = formValidation();

    if (formData.country === "" || formData.country === "placeholder") {
      notify(false, "Please select a country");
    }
    if (isValid) {
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
    } else {
      const { clientname, contactnumber, email, country } = formError;
      if (clientname) {
        notify(false, clientname);
      }
      if (contactnumber) {
        notify(false, contactnumber);
      }
      if (email) {
        notify(false, email);
      }
      if (country) {
        notify(false, country);
      }
    }
  };

  return (
    <div>
      Add Client
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
              className={`border w-full p-2 rounded-md `}
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
