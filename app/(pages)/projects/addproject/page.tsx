"use client";
import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import { countryOptions } from "@/helper/countryData";
import { useAppSelector } from "@/store/store";
import { debounce } from "chart.js/helpers";
import Select from "react-select";
import { MdCancel } from "react-icons/md";

const AddProject = () => {
  const user = useAppSelector((state) => state.userData);
  const [formData, setFormData] = useState({
    projectname: "",
    client: "",
    email: "",
    country: "",
  });
  const [clientOptions, setClientOptions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const fetchingClient = async () => {
    const response = await axios.get(`/api/admin/client/getclients?items=100`);
    setClientOptions((prevClients) => [
      ...prevClients,
      ...response.data.clients.map((client: any) => ({
        label: client.clientname,
        value: client._id,
      })),
    ]);
  };
  console.log("clientOptions", clientOptions);

  useEffect(() => {
    fetchingClient();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.country === "" || formData.country === "placeholder") {
      console.error("Please select a country.");
      return;
    }
    const data = { formData, user };
    const response = await axios.post("/api/admin/client/addclient", data);
    setFormData({
      projectname: "",
      client: "",
      email: "",
      country: "",
    });
  };
  let debounceTimer: NodeJS.Timeout;
  const addTags = (event: any) => {
    if (event.target.value !== "" && tags.indexOf(event.target.value) === -1) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    clearTimeout(debounceTimer);
    const value: string = event.target.value;
    debounceTimer = setTimeout(async () => {
      try {
        const response = await axios.get(
          `/api/admin/client/getclient?search=${value}&items=100`
        );
      } catch (error) {}
    }, 500);
    setFormData({ ...formData, client: value });
  };
  return (
    <div>
      Add Project
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex mt-4 p-10">
          <div className="flex flex-col space-y-7">
            <input
              onChange={(e) =>
                setFormData({ ...formData, projectname: e.target.value })
              }
              value={formData.projectname}
              type="text"
              name="projectname"
              className="border w-full p-2 rounded-md"
              placeholder="Project Name"
              required
            />
            <Select options={clientOptions} placeholder="Client"></Select>
            <input
              onChange={handleChange}
              type="text"
              value={formData.client}
              className="border w-full p-2 rounded-md"
              maxLength={10}
              placeholder="Technology"
              name="technology"
              required
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="text"
              className="border w-full p-2 rounded-md"
              placeholder="Hours Alloted"
              name="allotedhours"
              required
            />
            <div className=" flex w-full  space-x-2 ">
              <input
                type="text"
                className="p-2 border rounded-md"
                placeholder="Hours Consumend"
                name="hoursconsumed"
              />
              <input
                type="text"
                className="p-2 border rounded-md"
                placeholder="Hours left "
                name="hoursleft"
              />
            </div>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="textarea"
              className="border w-full p-2 rounded-md"
              placeholder="Description "
              name="description"
              required
            />
            <div className="flex space-x-2 items-center w-full ">
              <label htmlFor="team" className="w-max text-nowrap ">
                Assigned Team
              </label>
              <select
                className="p-2 w-full border"
                id="team"
                name="team"
                multiple
                onChange={addTags}
              >
                <option className="p-2" value="design">
                  Design
                </option>
                <option className="p-2" value="QA">
                  QA
                </option>
                <option className="p-2" value="developer">
                  Developer
                </option>
                <option className="p-2" value="marketing">
                  Marketing
                </option>
                <option className="p-2" value="HR">
                  HR
                </option>
              </select>
            </div>
            <div className="flex ml-auto space-x-2">
              {tags.map((tag, index) => (
                <div
                  className="flex items-center space-x-2 py-1 text-gray-600 rounded-lg bg-gray-200 px-2"
                  key={index}
                >
                  <span>{tag}</span>
                  <MdCancel
                    color="rgb(75 85 99)"
                    onClick={() => removeTags(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-custom-green p-2 ml-auto float-right text-white align-right rounded-sm"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};
export default AddProject;
