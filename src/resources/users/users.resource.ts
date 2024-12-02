import { ManageRequestBody } from "@middlewares/manageRequest";

const decodeToken = (token?: string) => {
    try {
        if (!token) return undefined;
        const parts = token.split('.');
        if (parts.length !== 3) return undefined;
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        const paddedBase64 = pad ? base64 + '='.repeat(4 - pad) : base64;
        const decoded = atob(paddedBase64);
        return JSON.parse(decoded);
    } catch (error) {
        return undefined;
    }
};

const usersResource = {
    signInAuthUser: async ({ data, manageError }: ManageRequestBody) => {
        try {
            const token = data.token;
            if (!token) return manageError({ code: "no_credentials_send" });

            const decodedToken = decodeToken(token);
            return decodeToken;
        } catch (error) {
            manageError({ code: "internal_error", error });
        }
    }
};

export default usersResource;