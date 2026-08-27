const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};
const parseFavourite = (favourite) => {
  if (typeof favourite !== 'string') return;
  if (favourite.toLowerCase() === 'true') return true;
  if (favourite.toLowerCase() === 'false') return false;
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
