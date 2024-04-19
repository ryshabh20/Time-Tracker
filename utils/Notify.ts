import toast from "react-hot-toast";

export const notify = (status: boolean, message: string) => {
  if (status) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
