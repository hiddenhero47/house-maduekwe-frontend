import { useQuery, useMutation } from "react-query";
import { axiosCall } from "../index-client";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../../store/slice/auth";

const useGetUserQuery = () => {
  return useQuery(
    ["user/me"],
    () =>
      axiosCall({
        url: "/api/users/me",
        method: "GET",
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

const useRegisterUserMutation = () => {
  const dispatch = useDispatch();
  return useMutation(
    (data) => axiosCall({ url: "/api/users", method: "POST", data }),
    {
      onSuccess: (data) => {
        dispatch(setToken(data?.token));
        dispatch(setUser(data));
        toast.success("You have been registered");
      },
    }
  );
};

const useLoginUserMutation = () => {
  const dispatch = useDispatch();
  return useMutation(
    (data) => axiosCall({ url: "/api/users/login", method: "POST", data }),
    {
      onSuccess: (data) => {
        console.log(data, "kkkdddddddddd");
        
        dispatch(setToken(data?.token));
        dispatch(setUser(data));
        toast.success("Log in successful");
      },
    }
  );
};

// Export hooks individually
export { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation };

// Optionally, provide a wrapper hook
const UserServices = {
  register: useRegisterUserMutation,
  get: useGetUserQuery,
  login: useLoginUserMutation,
};

export default UserServices;
