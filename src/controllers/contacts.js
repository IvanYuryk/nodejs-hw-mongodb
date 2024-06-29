import { Contact } from '../db/models/contact.js';
import createError from 'http-errors';

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ status: 'success', data: contacts });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(200).json({ status: 'success', data: contact });
};

export const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ status: 'success', message: 'Successfully created a contact!', data: newContact });
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(200).json({ status: 'success', message: 'Successfully patched a contact!', data: updatedContact });
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(204).send();
};
