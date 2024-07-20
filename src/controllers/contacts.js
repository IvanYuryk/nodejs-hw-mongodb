import createError from 'http-errors';

import * as contactService from '../services/contacts.js';
import { Contact } from '../db/models/contact.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToPublicDir } from '../utils/saveFileToPublicDir.js';
import { fieldList } from '../constants/index.js';

export const getAllContacts = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const filterParams = parseFilterParams(req.query);
  const sortParams = parseSortParams(req.query, fieldList);

  const filter = { userId: req.user._id };
  if (filterParams.type) filter.contactType = filterParams.type;
  if (filterParams.isFavourite !== undefined) filter.isFavourite = filterParams.isFavourite;

  const totalItems = await Contact.countDocuments(filter);
  const paginationData = calculatePaginationData(totalItems, paginationParams.perPage, paginationParams.page);

  const contacts = await Contact.find(filter)
    .sort({ [sortParams.sortBy]: sortParams.sortOrder === 'asc' ? 1 : -1 })
    .skip((paginationParams.page - 1) * paginationParams.perPage)
    .limit(paginationParams.perPage);

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      ...paginationData
    },
  });
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await contactService.getContactById({ _id: contactId, userId });
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Contact with id=${contactId} found success`,
    data: contact });
};

export const createContact = async (req, res) => {
  const { _id: userId } = req.user;
  let photo = "";
  if (req.file) {
    photo = await saveFileToPublicDir(req.file, "photos");
  };

  const newContact = await contactService.createContact({ ...req.body, userId, photo });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};


export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const updatedContact = await contactService.updateContact({ _id: contactId, userId }, req.body);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};


export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const deletedContact = await Contact.findOneAndDelete({ _id: contactId, userId });
  if (!deletedContact) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(204).send();
};


