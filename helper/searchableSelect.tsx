import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAppSelector, RootState } from "@/store/store";

const SearchableDropdown = ({ projectfn }) => {
  const [cloptions, setOptions] = useState<string[]>([]);
  const user = useAppSelector((state: RootState) => state.userData);
  const fetchingProject = async () => {
    const response = await axios.get(
      `/api/admin/project/getprojects?items=100`
    );
    setOptions(() => [
      ...response.data.projects.map((project: any) => ({
        label: project.projectname,
        value: project._id,
      })),
    ]);
  };
  useEffect(() => {
    fetchingProject();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: user?.currentTask?.currentProject?.projectName || "Project",
    value: user?.currentTask?.currentProject?.projectId || "",
  });

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelectedOption({
      label: user?.currentTask?.currentProject?.projectName || "Project",
      value: user?.currentTask?.currentProject?.projectId || "",
    });
  }, [user]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    projectfn(option.value, option.label);
    setIsOpen(false);
  };

  const filteredOptions = cloptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative ">
      <div
        className=" bg-white  mr-4   flex items-center text-md  "
        onClick={handleToggleDropdown}
      >
        {selectedOption ? selectedOption.label : "Project"}
        <RiArrowDropDownLine color="#00a8b2" />
      </div>
      {isOpen && (
        <div className="top-11 border p-2 absolute z-30 bg-white ">
          <input
            type="text"
            className="border p-2 rounded-sm"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            autoFocus
          />
          {searchTerm && (
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-custom-green  hover:text-white"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
