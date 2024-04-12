"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { MdCancel } from "react-icons/md";
interface form {
  employeename: string;
  code: string;
  designation: string;
  department: string;
  technologies: string[];
  permission: string[];
}
const EmployeeForm: React.FC<{
  edit?: boolean;
  id?: string;
}> = ({ edit, id }) => {
  const [formData, setFormData] = useState<form>({
    employeename: "",
    code: "",
    designation: "",
    department: "",
    technologies: [],
    permission: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const notify = (status: boolean, message: string) => {
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const fetchingemployee = async () => {
    try {
      const response = await axios.get(`/api/admin/employee/getemployee/${id}`);
      if (response) {
        setFormData((prev) => ({
          ...prev,
          employeename: response.data.employee.employeename,
          code: response.data.employee.code,
          designation: response.data.employee.designation,
          department: response.data.employee.department,
          technologies: response.data.employee.technologies,
          permission: response.data.employee.permission,
        }));

        notify(response.data.success, response.data.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (edit) {
      setHydrated(true);
      fetchingemployee();
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (edit) {
      try {
        const response = await axios.post(
          `/api/admin/employee/updateemployee/${id}`,
          formData
        );
        setFormData({
          employeename: response.data.employee.employeename,
          code: response.data.employee.code,
          designation: response.data.employee.designation,
          department: response.data.employee.department,
          technologies: response.data.employee.technologies,
          permission: response.data.employee.permission,
        });
        notify(response.data.success, response.data.message);
      } catch (err: any) {}
    } else {
      try {
        const response = await axios.post(
          "/api/admin/employee/addemployee",
          formData
        );
        if (response) {
          setFormData({
            employeename: "",
            code: "",
            designation: "",
            department: "",
            technologies: [],
            permission: [],
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
      formData.technologies.indexOf(event.target.value) === -1 &&
      event.target.name === "technologies"
    ) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, event.target.value],
      });
    }
    if (
      event.target.value !== "" &&
      formData?.permission?.indexOf(event.target.value) === -1 &&
      event.target.name === "permission"
    ) {
      setFormData({
        ...formData,
        permission: [...formData.permission, event.target.value],
      });
    }
  };
  const removeTags = (index: number, name: string) => {
    if (name === "technologies") {
      setFormData({
        ...formData,
        technologies: [
          ...formData.technologies.filter(
            (tag) => formData.technologies.indexOf(tag) !== index
          ),
        ],
      });
    }
    if (name === "permission") {
      setFormData({
        ...formData,
        permission: [
          ...formData.permission.filter(
            (tag) => formData.permission.indexOf(tag) !== index
          ),
        ],
      });
    }
  };

  if (edit) {
    if (!hydrated) return null;
  }
  return (
    <div>
      {edit ? "Edit Employee" : " Add Employee"}
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex mt-4 p-10">
          <div className="flex flex-col md:w-full lg:w-5/12 space-y-7">
            <input
              onChange={(e) =>
                setFormData({ ...formData, employeename: e.target.value })
              }
              value={formData.employeename}
              type="text"
              name="employeename"
              className="border w-full p-2 rounded-md"
              placeholder="Name"
              required
            />

            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code: e.target.value,
                })
              }
              type="text"
              value={formData.code}
              className="border w-full p-2 rounded-md"
              maxLength={10}
              placeholder="Code"
              name="code"
              required
            />
            <select
              onChange={(e) => {
                setFormData({
                  ...formData,
                  designation: e.target.value,
                });
              }}
              value={formData.designation}
              required
              className="border w-full bg-white p-2 rounded-md"
            >
              <option value="" disabled hidden>
                Designation
              </option>
              <option value="Trainee">Trainee</option>
              <option value="Junior">Junior</option>
              <option value="Associate">Associate</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
            </select>
            <select
              onChange={(e) => {
                setFormData({
                  ...formData,
                  department: e.target.value,
                });
              }}
              className="border w-full bg-white p-2 rounded-md"
              value={formData.department}
              required
            >
              <option value="" disabled hidden>
                Department
              </option>
              <option value="Marketing">Marketing</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
            </select>
            <div className="flex space-x-2 items-center w-full ">
              <label htmlFor="team" className="w-max text-nowrap ">
                Technologies
              </label>
              <select
                className="p-2 w-full border"
                id="technologies"
                name="technologies"
                multiple
                onChange={addTags}
                value={formData.technologies}
                required
              >
                <option className="p-2 border " value="Android">
                  Android
                </option>
                <option className="p-2 border " value="IOS">
                  IOS
                </option>
                <option className="p-2 border " value="Node.js">
                  Node.js
                </option>
                <option className="p-2 border " value="Prestashop">
                  Prestashop
                </option>
                <option className="p-2 border " value="PHP">
                  PHP
                </option>
              </select>
            </div>
            <div className="flex ml-auto space-x-2">
              {formData?.technologies?.map((tag, index) => (
                <div
                  className="flex items-center space-x-2 py-1  text-gray-600 rounded-lg bg-gray-200 px-2"
                  key={index}
                >
                  <span>{tag}</span>
                  <MdCancel
                    color="rgb(75 85 99)"
                    onClick={() => removeTags(index, "technologies")}
                  />
                </div>
              ))}
            </div>
            <div className="flex space-x-2 items-center w-full ">
              <label htmlFor="team" className="w-max text-nowrap ">
                Permission
              </label>
              <select
                className="p-2 w-full border"
                id="permission"
                name="permission"
                multiple
                onChange={addTags}
                value={formData.permission}
                required
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
              {formData?.permission?.map((tag, index) => (
                <div
                  className="flex items-center space-x-2 py-1  text-gray-600 rounded-lg bg-gray-200 px-2"
                  key={index}
                >
                  <span>{tag}</span>
                  <MdCancel
                    color="rgb(75 85 99)"
                    onClick={(e) => removeTags(index, "permission")}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-7/12 md:w-0"></div>
        </div>
        <button
          type="submit"
          className="bg-custom-green p-2 ml-auto float-right text-white align-right rounded-sm"
        >
          {edit ? "Edit Employee " : "Add Employee"}
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};
export default EmployeeForm;
