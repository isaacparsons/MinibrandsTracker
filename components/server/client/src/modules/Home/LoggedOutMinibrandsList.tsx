import MinibrandsList from './components/MinibrandsList/MinibrandsList';
import { MiniBrand } from '__generated__/graphql';

interface Props {
  minibrands: MiniBrand[];
}

function LoggedOutMinibrandsList(props: Props) {
  const { minibrands } = props;

  return (
    <MinibrandsList
      loading={false}
      minibrands={minibrands}
      collectedMinibrandsMap={{}}
    />
  );
}

export default LoggedOutMinibrandsList;
