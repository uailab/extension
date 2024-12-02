import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    auth: {
        exp: {
            type: Number
        },
        iat: {
            type: Number
        },
        sub: {
            type: String,
            description: "user id"
        },
        email_verified: {
            type: Boolean
        },
        name: {
            type: String
        },
        scope: {
            type: String
        },
        preferred_username: {
            type: String,
            description: "user public id"
        }
    },
    id: {
        unique: true,
        type: String
    }

});

const usersModel = mongoose.model("users", usersSchema);

export default usersModel;