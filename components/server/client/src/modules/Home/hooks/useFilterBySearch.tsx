import { MiniBrand } from '../../../__generated__/graphql';

const doesContainSubstring = (targetString: string, query: string) => {
  if (query.length === 0) {
    return true;
  }
  const targetStringQueue = targetString
    .split('')
    .map((char) => char.toLowerCase());
  const queue = query.split('').map((char) => char.toLowerCase());

  let queryTestChar = queue.shift();
  let targetTestChar = targetStringQueue.shift();

  while (targetTestChar !== queryTestChar) {
    targetTestChar = targetStringQueue.shift();

    if (!targetTestChar) {
      return false;
    }
  }

  while (queryTestChar === targetTestChar && queryTestChar && targetTestChar) {
    queryTestChar = queue.shift();
    targetTestChar = targetStringQueue.shift();
  }

  if (!queryTestChar) {
    return true;
  }
  return false;
};

const useFilterBySearch = (
  minibrands: MiniBrand[] | undefined,
  text: string
) => {
  if (!minibrands) {
    return [];
  }
  if (!text) {
    return minibrands;
  }
  return minibrands.filter((minibrand) => {
    if (!minibrand?.name) {
      return false;
    }
    return doesContainSubstring(minibrand.name, text);
  });
};

export default useFilterBySearch;
