import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  items: [cartItemSchema],

  totalPrice: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;