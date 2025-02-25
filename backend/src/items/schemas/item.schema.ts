import { Schema, Document } from "mongoose";

export interface Item extends Document {
    title: string;
    description: string;
    image: string
}

export const ItemSchema = new Schema<Item>({
    title: { type: String, required: true },
    description: {type: String, required: true},
    image: {type: String, required: true},
})
