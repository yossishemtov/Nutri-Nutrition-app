// Mongoose schema for the Shopping List collection
// - Defines the structure of the Shopping List documents
// - Includes fields for user, name, items, and timestamps

import mongoose from "mongoose";

const ShoppingItemSchema = new mongoose.Schema({
  ingredient: String,
  quantity: Number, // e.g., 2
  unit: String // e.g., 'cups', 'tablespoons', etc.
});
const shoppingListSchema = new mongoose.Schema({
  items: [ShoppingItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const ShoppingListModel = mongoose.model("ShoppingList", shoppingListSchema);
