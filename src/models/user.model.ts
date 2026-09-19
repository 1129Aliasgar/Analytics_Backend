import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

export const UserModel = mongoose.model("User", UserSchema);
