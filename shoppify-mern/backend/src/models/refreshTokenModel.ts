import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/interface";

export interface IRefreshToken extends Document {
  token: string;
  user: IUser["_id"];
  expiresAt: Date;
}

const refreshTokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
