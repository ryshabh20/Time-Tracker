import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAppSelector, RootState } from "@/store/store";
interface projectOptions {
  label: string;
  value: string;
}
const SearchableDropdown = ({
  projectfn,
}: {
  projectfn: (id: string, name: string) => void;
}) => {
  const [cloptions, setOptions] = useState<projectOptions[]>([]);
  const user = useAppSelector((state: RootState) => state.userData);

  const prod = user?.currentTask?.currentProject;
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
    fetchingProject();

    setSelectedOption({
      label: user?.currentTask?.currentProject?.projectName || "Project",
      value: user?.currentTask?.currentProject?.projectId || "",
    });
  }, [user]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: projectOptions) => {
    setSelectedOption(option);
    projectfn(option.value, option.label);

    setIsOpen(false);
  };

  const filteredOptions = cloptions.filter((option) =>
    option?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative  ">
      <div
        className=" bg-white  lg:mr-4 md:mr-0  flex items-center text-md  "
        onClick={handleToggleDropdown}
      >
        {prod?.projectId ? prod?.projectName : "Project"}
        <RiArrowDropDownLine color="#00a8b2" />
      </div>
      {isOpen && (
        <div className="top-11 max-h-[20rem] overflow-y-auto p-2 absolute z-30 bg-white border ">
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
                  key={option?.value}
                  className="p-2 hover:bg-custom-green  hover:text-white"
                  onClick={() => handleOptionClick(option)}
                >
                  {option?.label}
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
