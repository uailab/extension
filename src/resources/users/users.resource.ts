import { ManageRequestBody } from "@middlewares/manageRequest";

const usersResource = {
    getUser: async ({ data }: ManageRequestBody) => {
        console.log(data)
    },
    setUser: async ({ data }: ManageRequestBody) => {
        console.log(data)
    },
};

export default usersResource;