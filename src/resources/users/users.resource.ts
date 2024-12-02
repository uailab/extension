import jwt, { JwtPayload } from "jsonwebtoken";

import { ManageRequestBody } from "@middlewares/manageRequest";
import usersModel from "@database/models/users";

const usersResource = {
    signInExternalAuthUser: async ({ data, manageError }: ManageRequestBody) => {
        try {
            const token = data.token;
            if (!token) return manageError({ code: "no_credentials_send" });

            const decoded = jwt.decode(token) as JwtPayload | null;
            if (!decoded || typeof decoded === 'string') return;
    
            const preferredUsername = decoded.preferred_username as string | undefined;
            if (!preferredUsername) return manageError({ code: "invalid_credentials" })
            
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
    }
};

export default usersResource;