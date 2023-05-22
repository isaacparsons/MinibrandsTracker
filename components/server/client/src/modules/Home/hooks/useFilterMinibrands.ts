import { MiniBrandsMetaData } from '__generated__/graphql';
import useFilterMap from './useFilterMap';
import { useMemo } from 'react';
import useMetadataIdMap from './useMetadataIdMap';
import useGetIds from './useGetIds';
import { useSessionContext } from 'context/SessionContext';

const useFilterMinibrands = (
  searchText: string,
  minibrandsMetadata: MiniBrandsMetaData | undefined
) => {
  const session = useSessionContext();

  const tagsIdMap = useMetadataIdMap(minibrandsMetadata?.tags);
  const typesIdMap = useMetadataIdMap(minibrandsMetadata?.types);
  const seriesIdMap = useMetadataIdMap(minibrandsMetadata?.series);

  const seriesFilter = useFilterMap('series', minibrandsMetadata?.series ?? []);
  const typesFilter = useFilterMap('types', minibrandsMetadata?.types ?? []);
  const tagsFilter = useFilterMap('tags', minibrandsMetadata?.tags ?? []);
  const collectedStatusFilter = useFilterMap(
    'collected status',
    [{ value: 'collected' }, { value: 'not-collected' }] ?? []
  );

  const typeIds = useGetIds(typesFilter.filterMap, typesIdMap);
  const tagIds = useGetIds(tagsFilter.filterMap, tagsIdMap);
  const seriesIds = useGetIds(seriesFilter.filterMap, seriesIdMap);

  const apiFilter = useMemo(() => {
    return {
      ...(searchText !== '' && { search: searchText }),
      tagIds,
      typeIds,
      seriesIds,
      collectedStatus: session.authenticated
        ? {
            collected: collectedStatusFilter.filterMap['collected'],
            notCollected: collectedStatusFilter.filterMap['not-collected']
          }
        : {
            collected: true,
            notCollected: true
          }
    };
  }, [
    session.authenticated,
    typeIds,
    tagIds,
    seriesIds,
    searchText,
    collectedStatusFilter
  ]);

  const filters = useMemo(() => {
    return session.authenticated
      ? [collectedStatusFilter, seriesFilter, typesFilter, tagsFilter]
      : [seriesFilter, typesFilter, tagsFilter];
  }, [
    session.authenticated,
    seriesFilter,
    typesFilter,
    tagsFilter,
    collectedStatusFilter
  ]);

  return { apiFilter, filters };
};

export default useFilterMinibrands;
