import { useQuery, useMutation, useQueryClient } from "react-query";
import { axiosCall } from "../index-client";
import { toast } from "react-toastify";

const useGetLocationsQuery = () => {
  return useQuery(
    ["locations"],
    () =>
      axiosCall({
        url: "/api/location",
        method: "GET",
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
};

const useSetLocationMutation = () => {
  return useMutation(
    (data) => axiosCall({ url: "/api/location/set", method: "POST", data }),
    {
      onSuccess: ({ data }) => {
        toast.success("You have been logged");
        console.log(data);
      },
    }
  );
};

const useDeleteLocationMutation = () => {
  const queryClient = useQueryClient();

  const queryResult = useMutation(
    ["content/delete"],
    (data) => axiosCall({ url: "/api/location", method: "POST", params: data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("location/get");
      },
    }
  );

  return queryResult;
};

const LocationHooks = {
  create: useSetLocationMutation,
  receive: useGetLocationsQuery,
  delete: useDeleteLocationMutation,
};

export default LocationHooks;
