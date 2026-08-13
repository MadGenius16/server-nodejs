const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};
const parseFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;
  const isFavourite = (favourite) => ['true', 'false'].includes(favourite);

  if (isFavourite(favourite)) return favourite;
};

export const parseFilterContactParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
