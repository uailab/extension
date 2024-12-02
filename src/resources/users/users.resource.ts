import { ManageRequestBody } from "@middlewares/manageRequest";

const usersResource = {
    getUser: async ({ data, manageError }: ManageRequestBody) => {
        try {
            if (!data.email) return manageError({ code: "not_user_email"});
            return data;
        } catch (error) {
            manageError({ code: "internal_error", error });
        }
    }
};

export default usersResource;