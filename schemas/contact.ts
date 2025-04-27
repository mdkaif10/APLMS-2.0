import mongoose, { Document, Schema, model, models } from "mongoose";

export interface Contact extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    createdAt: Date;
}

const ContactSchema = new Schema<Contact>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['unread', 'read', 'replied'],
        default: 'unread'
    }
}, {
    timestamps: true
});

export const ContactModel = models.Contact || model('Contact', ContactSchema); 