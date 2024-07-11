import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = (filter) => {
  return Contact.findOne(filter);
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = (filter, updateData) => {
  return Contact.findOneAndUpdate(filter, updateData, { new: true });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};