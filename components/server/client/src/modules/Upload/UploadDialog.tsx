import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMinibrandsMetadata from '../MinibrandsMetadata/hooks/useMinibrandsMetadata';
import FileInput from './FileInput/FileInput';
import SeriesInput from './SeriesInput';
import TypesInput from './TypesInput';
import Previews from './Previews/Previews';
import client from '../../graphql/client';
import axios from 'axios';
import useSaveMinibrand from './hooks/useSaveMinibrand';
import { GET_IMAGE_UPLOAD_LINK } from '../../graphql/miniBrands';

export interface MiniBrand {
  file: File;
  preview: string;
  name: string;
  tagIds: number[];
}

interface Props {
  open: boolean;
  handleClose: () => void;
}
export default function UploadDialog(props: Props) {
  const { open, handleClose } = props;
  const { data, loading } = useMinibrandsMetadata();
  const { saveMinibrand, loading: savingMiniBrand } = useSaveMinibrand();
  const [miniBrands, setMiniBrands] = useState<MiniBrand[]>([]);
  const [seriesId, setSeriesId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      setMiniBrands((miniBrands) => {
        const newMiniBrands = acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          name: '',
          tagIds: []
        }));
        return [...miniBrands, ...newMiniBrands];
      });
    }
  });

  function wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const handleSubmit = async () => {
    await Promise.all(
      miniBrands.map(async (miniBrand) => {
        const id = Math.random().toString(16).slice(2);
        const data = await client.query({
          query: GET_IMAGE_UPLOAD_LINK,
          variables: { name: miniBrand.name + id }
        });
        const url = data.data.getImageUploadLink;
        const response = await axios.put(url, miniBrand.file, {
          headers: {
            'Content-Type': miniBrand.file.type
          }
        });
        if (response.status === 200 && typeId && seriesId) {
          const imgUrl = url.split('?');
          saveMinibrand({
            input: {
              name: miniBrand.name,
              typeId,
              seriesId,
              tagIds: miniBrand.tagIds,
              imgUrl: imgUrl[0]
            }
          });
        }
        await wait(1000);
      })
    );
  };

  const handleSeriesChange = (seriesId: number) => {
    setSeriesId(seriesId);
  };

  const handleTypesChange = (typeId: number) => {
    setTypeId(typeId);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ style: { padding: 20, width: '100%' } }}
    >
      <DialogTitle>Upload Mini Brands</DialogTitle>
      {data && (
        <Box>
          <FileInput
            rootProps={getRootProps({ style: fileInputStyle })}
            inputProps={getInputProps()}
            miniBrands={miniBrands}
            setMiniBrands={setMiniBrands}
          />
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
          <Previews
            miniBrands={miniBrands}
            tags={data?.tags ?? []}
            setMiniBrands={setMiniBrands}
            handleSubmit={handleSubmit}
          />
        </Box>
      )}
    </Dialog>
  );
}

const fileInputStyle = {
  flex: 1,
  display: 'flex',
  // flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 20,
  padding: 20,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
