import { doesContainSubstring } from 'common/utils/doesContainSubstring';
import { MiniBrand } from '../../../__generated__/graphql';

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
