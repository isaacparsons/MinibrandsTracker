import { Button, Container } from '@mui/material';
import useMinibrandsMetadata from '../../graphql/hooks/queries/useMinibrandsMetadata';
import { useState, useMemo } from 'react';
import EditableList from './EditableList';
import useEditableList from './hooks/useEditableList';
import useSaveMinibrandsMetadata from '../../graphql/hooks/mutations/useSaveMinibrandsMetadata';
import WithLoading from '../../common/components/WithLoading';

function MinibrandsMetadataScreen() {
  const [editing, setEditing] = useState(false);
  const { data } = useMinibrandsMetadata();
  const { saveMinibrandsMetadata, loading } = useSaveMinibrandsMetadata();

  const typesRaw = useMemo(() => {
    return data?.types.map((item) => ({ value: item.value })) ?? [];
  }, [data?.types]);

  const seriesRaw = useMemo(() => {
    return data?.series.map((item) => ({ value: item.value })) ?? [];
  }, [data?.series]);

  const tagsRaw = useMemo(() => {
    return data?.tags.map((item) => ({ value: item.value })) ?? [];
  }, [data?.tags]);

  const {
    list: types,
    addItem: addType,
    removeItem: removeType
  } = useEditableList(typesRaw);

  const {
    list: series,
    addItem: addSeries,
    removeItem: removeSeries
  } = useEditableList(seriesRaw);

  const {
    list: tags,
    addItem: addTag,
    removeItem: removeTag
  } = useEditableList(tagsRaw);

  const handleCancel = () => {
    setEditing(false);
  };
  const handleSave = () => {
    saveMinibrandsMetadata({
      types,
      series,
      tags
    });
    setEditing(false);
  };

  return (
    <Container maxWidth="xs" sx={{ padding: 10 }}>
      <EditableList
        editing={editing}
        title="Type"
        data={types}
        onAddItem={addType}
        onRemoveItem={removeType}
      />
      <EditableList
        editing={editing}
        title="Series"
        data={series}
        onAddItem={addSeries}
        onRemoveItem={removeSeries}
      />
      <EditableList
        editing={editing}
        title="Tag"
        data={tags}
        onAddItem={addTag}
        onRemoveItem={removeTag}
      />
      <WithLoading loading={loading}>
        {editing ? (
          <>
            <Button
              style={{ margin: 10 }}
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              style={{ margin: 10 }}
              color="error"
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            sx={{ margin: 10 }}
            variant="contained"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        )}
      </WithLoading>
    </Container>
  );
}

export default MinibrandsMetadataScreen;
