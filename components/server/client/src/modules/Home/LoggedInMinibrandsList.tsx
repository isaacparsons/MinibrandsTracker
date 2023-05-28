import useMe from 'graphql/hooks/queries/useMe';
import useCollectedMinibrandsMap from 'modules/Home/hooks/useCollectedMinibrandsMap';

import MinibrandsList from './components/MinibrandsList/MinibrandsList';
import { MiniBrand } from '__generated__/graphql';

interface Props {
  minibrands: MiniBrand[];
}

function LoggedInMinibrandsList(props: Props) {
  const { minibrands } = props;
  const { data: me, loading: loadingMe } = useMe();
  const collectedMinibrandsMap = useCollectedMinibrandsMap(me?.collected);
  return (
    <MinibrandsList
      loading={loadingMe}
      minibrands={minibrands}
      collectedMinibrandsMap={collectedMinibrandsMap}
    />
  );
}

export default LoggedInMinibrandsList;
