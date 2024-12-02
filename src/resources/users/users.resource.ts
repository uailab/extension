import jwt, { JwtPayload } from "jsonwebtoken";

import { ManageRequestBody } from "@middlewares/manageRequest";
import usersModel from "@database/models/users";
import filterObject from "@utils/functions/filterObject";

const usersResource = {
    signInExternalAuthUser: async ({ data, manageError }: ManageRequestBody) => {
        try {
            const token = data.token;
            if (!token) return manageError({ code: "no_credentials_send" });

            const decoded = jwt.decode(token) as JwtPayload | null;
            if (!decoded || typeof decoded === 'string') return manageError({ code: "invalid_credentials" });
    
            const preferredUsername = decoded.preferred_username as string | undefined;
            if (!preferredUsername) return manageError({ code: "invalid_credentials" });
            
            const hasLoggedUser = await usersModel.findOne({ id : preferredUsername });

            if (hasLoggedUser){
                const internalToken = jwt.sign({ id: preferredUsername }, process.env.SECRET as string);
                return { token: internalToken, firstLogin: false };
            };

            const user = new usersModel({
                lastUpdate: Date.now(),
                id: preferredUsername,
                auth: decoded,
            });
            await user.save();

            const internalToken = jwt.sign({ id: preferredUsername }, process.env.SECRET as string);

            return { token: internalToken, firstLogin: true };

        } catch (error) {
            manageError({ code: "internal_error", error });
        }
    },
    getUser: async ({ ids, manageError }: ManageRequestBody) => {
        try {
            const user = await usersModel.findOne({ id: ids.userID });
            if (!user) return manageError({ code: "user_not_found" });

            return user;
        } catch (error) {
            manageError({ code: "internal_error", error });
        }
    },
    updateUser: async ({ ids, data, manageError }: ManageRequestBody) => {
        try {
            const user = await usersModel.findOne({ id: ids.userID });
            if (!user) return manageError({ code: "user_not_found" });

            const excludedKeys = ['role', 'auth', '_id', 'id'];
            const updateUserData = filterObject(data.data, excludedKeys);

            const newUser = await usersModel.findByIdAndUpdate(ids.userID, { $set:{ ...updateUserData, lastUpdate: Date.now() } }, { new: true });
            return newUser;
        } catch (error) {
            manageError({ code: "internal_error", error });
        }
    },
};

export default usersResource;