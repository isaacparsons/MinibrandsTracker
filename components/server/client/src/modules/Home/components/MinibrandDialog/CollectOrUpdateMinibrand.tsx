import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  CollectedMinibrand,
  MutationUpdateCollectedMinibrandArgs
} from '__generated__/graphql';
import { useEffect, useState } from 'react';
import { MutationCollectMinibrandArgs } from '../../../../__generated__/graphql';

interface Props {
  minibrandId: number;
  collectedMinibrand?: CollectedMinibrand;
  handleCollectMinibrand: (
    variables: MutationUpdateCollectedMinibrandArgs
  ) => void;
  handleUpdateMinibrand: (variables: MutationCollectMinibrandArgs) => void;
  loading: boolean;
}

const CollectOrUpdateMinibrand = (props: Props) => {
  const {
    minibrandId,
    collectedMinibrand,
    handleCollectMinibrand,
    handleUpdateMinibrand,
    loading
  } = props;
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    if (collectedMinibrand?.quantity)
      setNewQuantity(collectedMinibrand?.quantity);
  }, [collectedMinibrand]);

  const incrementQuantity = () => {
    setNewQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setNewQuantity((prevQuantity) => {
      if (prevQuantity === 0) return 0;
      return prevQuantity - 1;
    });
  };
  const handleCollectClick = () => {
    handleCollectMinibrand({
      id: minibrandId,
      input: { quantity: newQuantity }
    });
  };
  const handleUpdateClick = () => {
    handleUpdateMinibrand({
      id: minibrandId,
      input: { quantity: newQuantity }
    });
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box sx={styles.quantityContainer}>
        <IconButton onClick={incrementQuantity}>
          <AddIcon />
        </IconButton>
        <TextField
          value={newQuantity}
          hiddenLabel
          id={`quantity-input`}
          defaultValue="Normal"
          variant="filled"
        />
        <IconButton onClick={decrementQuantity}>
          <RemoveIcon />
        </IconButton>
      </Box>

      {collectedMinibrand ? (
        <LoadingButton
          variant="contained"
          onClick={handleUpdateClick}
          loading={loading}
        >
          Update
        </LoadingButton>
      ) : (
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={!Boolean(newQuantity)}
          onClick={handleCollectClick}
        >
          Collected
        </LoadingButton>
      )}
    </>
  );
};

const styles = {
  quantityContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 50,
    marginRight: 1
  }
};

export default CollectOrUpdateMinibrand;
