import { Schema, model } from "mongoose";
import { IOrder } from "../interfaces/interface";

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        name: { type: String },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    orderedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
