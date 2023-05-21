import { Box, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { MiniBrand } from '../../../../__generated__/graphql';
import MinibrandNameInput from 'common/components/MinibrandNameInput';
import { useEffect, useState } from 'react';
import SeriesInput from 'modules/Upload/SeriesInput';
import TypesInput from 'modules/Upload/TypesInput';
import useMinibrandsMetadata from 'modules/MinibrandsMetadata/hooks/useMinibrandsMetadata';
import TagsInput from 'modules/Upload/Previews/TagsInput';
import useUpdateMinibrand from './hooks/useUpdateMinibrand';

interface Props {
  minibrand: MiniBrand;
  handleFinishEditing: () => void;
}

const EditMinibrandContent = (props: Props) => {
  const { minibrand, handleFinishEditing } = props;

  const { data, loading } = useMinibrandsMetadata();

  const [seriesId, setSeriesId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const [name, setName] = useState('');
  const [tagIds, setTagIds] = useState<number[]>([]);

  const onMinibrandUpdated = () => {
    handleFinishEditing();
  };

  const { updateMinibrand, loading: updatingMinibrand } =
    useUpdateMinibrand(onMinibrandUpdated);

  useEffect(() => {
    if (minibrand.name) setName(minibrand.name);
    if (minibrand.seriesId) setSeriesId(minibrand.seriesId);
    if (minibrand.typeId) setTypeId(minibrand.typeId);
    if (minibrand.tags) {
      const _tagIds = minibrand.tags.map((tag) => tag.id);
      setTagIds(_tagIds);
    }
  }, [minibrand]);

  const handleSeriesChange = (seriesId: number) => {
    setSeriesId(seriesId);
  };

  const handleTypesChange = (typeId: number) => {
    setTypeId(typeId);
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleTagChange = (newTagIds: number[]) => {
    setTagIds(newTagIds);
  };

  const handleSaveClick = () => {
    updateMinibrand({
      id: minibrand.id,
      input: {
        name,
        typeId,
        seriesId,
        tagIds
      }
    });
  };

  return (
    <Box sx={styles.container}>
      <SeriesInput
        seriesId={seriesId}
        series={data?.series ?? []}
        handleSeriesChange={handleSeriesChange}
      />
      <TypesInput
        typeId={typeId}
        types={data?.types ?? []}
        handleTypesChange={handleTypesChange}
      />
      <MinibrandNameInput onChange={handleNameChange} value={name} />
      {minibrand?.imgUrl && (
        <Box
          component="img"
          sx={{
            height: 300,
            objectFit: 'contain',
            width: '100%'
          }}
          src={minibrand.imgUrl}
          alt={name}
        />
      )}
      <TagsInput
        tags={data?.tags ?? []}
        tagIds={tagIds}
        onTagChange={handleTagChange}
      />
      <Box sx={styles.btnsContainer}>
        <LoadingButton
          sx={styles.btn}
          variant="contained"
          loading={updatingMinibrand}
          onClick={handleSaveClick}
        >
          Save
        </LoadingButton>
        <Button
          sx={styles.btn}
          variant="contained"
          color="error"
          onClick={handleFinishEditing}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  btn: {
    margin: 1
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default EditMinibrandContent;
