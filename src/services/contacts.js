import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
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

export const updateContact = async (id, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return contact;
};

export const upsertContact = async (id, payload, options = {}) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return contact;
};
