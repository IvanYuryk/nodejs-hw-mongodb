import createError from 'http-errors';

import * as contactService from '../services/contacts.js';
import { Contact } from '../db/models/contact.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (req, res, next) => {
  const paginationParams = parsePaginationParams(req.query);
  const filterParams = parseFilterParams(req.query);
  const sortParams = parseSortParams(req.query, ['name', 'phoneNumber', 'email', 'contactType']);

  const filter = {};
  if (filterParams.type) filter.contactType = filterParams.type;
  if (filterParams.isFavourite !== undefined) filter.isFavourite = filterParams.isFavourite;

  try {
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
  } catch (error) {
      next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({ status: 'success', data: contact });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await contactService.createContact(req.body);
    res.status(201).json({
    status: 'success',
    message: 'Successfully created a contact!',
    data: newContact,
  });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactService.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactService.deleteContact(contactId);
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Contact successfully deleted',
      data: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};


