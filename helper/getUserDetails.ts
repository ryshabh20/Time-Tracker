import axios from "axios";
const getUserDetails = async () => {
  const response = await axios.get("/api/users/currentUser");
  return response;
};

export default getUserDetails;
