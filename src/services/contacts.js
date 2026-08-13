import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (contact) => {
  const newContact = await ContactsCollection.create(contact);
  return newContact;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findByIdAndDelete(id);
  return contact;
};

export const upsertContact = async (id, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return contact;
};
