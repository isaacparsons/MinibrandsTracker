import {
  AchievementCategory,
  MiniBrand,
  MiniBrandTag,
  MiniBrandType
} from "../../generated/graphql";

export const getAchievementsByTag = (
  collected: {
    minibrand: MiniBrand & {
      tags: MiniBrandTag[];
      type: MiniBrandType;
    };
  }[],
  tags: MiniBrandTag[],
  minibrands: MiniBrand[]
) => {
  return tags.reduce((result, tag) => {
    const filteredCollected = collected.filter((item) => {
      return item.minibrand.tags.find((itemTag) => itemTag.id === tag.id);
    });
    const filteredMinibrands = minibrands.filter((item) => {
      return item.tags?.find((itemTag) => itemTag.id === tag.id) ?? false;
    });
    if (filteredMinibrands.length === 0) {
      return result;
    }
    result.push({
      type: {
        id: tag.id,
        value: tag.value
      },
      collectedCount: filteredCollected.length,
      totalCount: filteredMinibrands.length
    });
    return result;
  }, [] as AchievementCategory[]);
};

export const getAchievementsByType = (
  collected: {
    minibrand: MiniBrand & {
      tags: MiniBrandTag[];
      type: MiniBrandType;
    };
  }[],
  types: MiniBrandType[],
  minibrands: MiniBrand[]
) => {
  return types.reduce((result, type) => {
    const filteredCollected = collected.filter((item) => {
      return item.minibrand.typeId === type.id;
    });
    const filteredMinibrands = minibrands.filter((item) => {
      return item.typeId === type.id;
    });
    if (filteredMinibrands.length === 0) {
      return result;
    }
    result.push({
      type: {
        id: type.id,
        value: type.value
      },
      collectedCount: filteredCollected.length,
      totalCount: filteredMinibrands.length
    });
    return result;
  }, [] as AchievementCategory[]);
};
