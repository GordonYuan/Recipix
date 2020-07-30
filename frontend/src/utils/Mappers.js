//Maps the tags object of type [{tag: name}, ...] to array of strings [name, ...]
export const mapTagsObjectToArray = (tags) => {
  return tags.map((item) => item.tag);
};

export const mapArrayToTagsObject = (array) => {
  return array.map((item) => ({
    tag: item,
  }));
};
