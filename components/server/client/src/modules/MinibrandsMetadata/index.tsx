import { Button, Container } from '@mui/material';
import useMinibrandsMetadata from './hooks/useMinibrandsMetadata';
import { useState } from 'react';
import EditableList from './EditableList';
import useEditableList from './hooks/useEditableList';
import useSaveMinibrandsMetadata from './hooks/useSaveMinibrandsMetadata';
import WithLoading from '../../common/components/WithLoading';

function MinibrandsMetadataScreen() {
  const [editing, setEditing] = useState(false);
  const { data } = useMinibrandsMetadata();
  const { saveMinibrandsMetadata, loading } = useSaveMinibrandsMetadata();

  const {
    list: types,
    addItem: addType,
    removeItem: removeType
  } = useEditableList(data?.types ?? []);

  const {
    list: series,
    addItem: addSeries,
    removeItem: removeSeries
  } = useEditableList(data?.series ?? []);

  const {
    list: tags,
    addItem: addTag,
    removeItem: removeTag
  } = useEditableList(data?.tags ?? []);

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
