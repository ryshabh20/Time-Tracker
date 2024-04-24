"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { countryOptions } from "@/helper/countryData";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";

import { MdCancel } from "react-icons/md";
interface form {
  projectname: string;
  client: string;
  clientname: string;
  technology: string;
  hoursAlloted: number | null;
  hoursConsumed: number | null;
  hoursLeft: number | null;
  description: string;
  assignedTeam: string[];
}
const FormProject: React.FC<{
  edit?: boolean;
  id?: string;
}> = ({ edit, id }) => {
  const [formData, setFormData] = useState<form>({
    projectname: "",
    client: "",
    clientname: "",
    technology: "",
    hoursAlloted: null,
    hoursConsumed: null,
    hoursLeft: null,
    description: "",
    assignedTeam: [],
  });
  const [clientOptions, setClientOptions] = useState<string[]>([]);
  const notify = (status: boolean, message: string) => {
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
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
  const fetchingProject = async () => {
    try {
      const response = await axios.get(`/api/admin/project/getproject/${id}`);
      if (response) {
        setFormData((prev) => ({
          ...prev,
          projectname: response.data.project.projectname,
          client: response.data.project.client,
          clientname: response.data.project.clientname,
          technology: response.data.project.technology,
          hoursAlloted: response.data.project.hoursAlloted,
          hoursConsumed: response.data.project.hoursConsumed,
          hoursLeft: response.data.project.hoursLeft,
          description: response.data.project.description,
          assignedTeam: response.data.project.assignedTeam,
        }));
        notify(response.data.success, response.data.message);
      }
    } catch (err: any) {
      notify(err.response.data.success, err.response.data.message);
    }
  };
  useEffect(() => {
    if (edit) {
      fetchingProject();
    }
    fetchingClient();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalUsedHours =
      (formData?.hoursConsumed || 0) + (formData?.hoursLeft || 0);
    if (totalUsedHours > (formData?.hoursAlloted || 0)) {
      notify(
        false,
        "Hours consumed and hoursLeft should be less than hours alloted combined"
      );
      return;
    }
    if (edit) {
      try {
        const response = await axios.post(
          `/api/admin/project/updateproject/${id}`,
          formData
        );
        setFormData({
          projectname: response.data.project.projectname,
          client: response.data.project.client,
          clientname: response.data.project.clientname,
          technology: response.data.project.technology,
          hoursAlloted: response.data.project.hoursAlloted,
          hoursConsumed: response.data.project.hoursConsumed,
          hoursLeft: response.data.project.hoursLeft,
          description: response.data.project.description,
          assignedTeam: response.data.project.assignedTeam,
        });

        notify(response.data.success, response.data.message);
      } catch (err: any) {
        notify(err.response.data.success, err.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(
          "/api/admin/project/addproject",
          formData
        );
        if (response) {
          setFormData({
            projectname: "",
            client: "",
            clientname: "",
            technology: "",
            hoursAlloted: null,
            hoursConsumed: null,
            hoursLeft: null,
            description: "",
            assignedTeam: [],
          });
          notify(response.data.success, response.data.message);
        }
      } catch (err: any) {
        notify(err.response.data.success, err.response.data.message);
      }
    }
  };
  const addTags = (event: any) => {
    if (
      event.target.value !== "" &&
      formData.assignedTeam.indexOf(event.target.value) === -1
    ) {
      setFormData({
        ...formData,
        assignedTeam: [...formData.assignedTeam, event.target.value],
      });
    }
  };
  const removeTags = (index: number) => {
    setFormData({
      ...formData,
      assignedTeam: [
        ...formData.assignedTeam.filter(
          (tag) => formData.assignedTeam.indexOf(tag) !== index
        ),
      ],
    });
  };

  const selectValue = edit
    ? {
        label: formData.clientname,
        value: formData.client,
      }
    : formData.client !== ""
    ? {
        label: formData.clientname,
        value: formData.client,
      }
    : null;
  return (
    <div>
      {edit ? "Edit Project" : " Add Project"}
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex mt-4 p-10">
          <div className="flex flex-col md:w-full lg:w-auto space-y-7">
            <input
              onChange={(e) =>
                setFormData({ ...formData, projectname: e.target.value })
              }
              value={formData.projectname}
              type="text"
              name="projectname"
              className="border w-full p-2 rounded-md"
              placeholder="Project Name"
              min={2}
              required
            />
            <Select
              id="ClientId"
              options={clientOptions}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  client: e?.value,
                  clientname: e?.label,
                });
              }}
              placeholder={edit ? "" : "Client"}
              value={selectValue}
            ></Select>
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technology: e.target.value,
                })
              }
              type="text"
              value={formData.technology}
              className="border w-full p-2 rounded-md"
              maxLength={10}
              placeholder="Technology"
              name="technology"
              required
            />
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursAlloted: Number(e.target.value),
                })
              }
              value={formData.hoursAlloted ? formData.hoursAlloted : ""}
              type="number"
              className="border w-full p-2 rounded-md"
              placeholder="Hours Alloted"
              name="allotedhours"
              required
            />
            <div className=" flex w-full space-x-2 ">
              <input
                type="number"
                value={formData.hoursConsumed ? formData.hoursConsumed : ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hoursConsumed: Number(e.target.value),
                  })
                }
                required
                className="p-2 w-full border rounded-md"
                placeholder="Hours Consumed"
                name="hoursConsumed"
              />
              <input
                value={formData.hoursLeft ? formData.hoursLeft : ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hoursLeft: Number(e.target.value),
                  })
                }
                type="number"
                className="p-2 border w-full rounded-md"
                placeholder="Hours left "
                name="hoursleft"
              />
            </div>
            <input
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
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
                <option className="p-2 border " value="design">
                  Design
                </option>
                <option className="p-2 border " value="QA">
                  QA
                </option>
                <option className="p-2 border " value="developer">
                  Developer
                </option>
                <option className="p-2 border " value="marketing">
                  Marketing
                </option>
                <option className="p-2 border " value="HR">
                  HR
                </option>
              </select>
            </div>
            <div className="flex ml-auto space-x-2">
              {formData?.assignedTeam?.map((tag, index) => (
                <div
                  className="flex items-center space-x-2 py-1  text-gray-600 rounded-lg bg-gray-200 px-2"
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
          {edit ? "Edit Project" : "Add Project"}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};
export default FormProject;
