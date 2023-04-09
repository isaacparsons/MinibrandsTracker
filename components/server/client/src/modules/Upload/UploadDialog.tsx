import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DragAndDropUploader from './DragAndDropUploader';
import { IFileWithMeta } from 'react-dropzone-uploader';
import axios from 'axios';
import client from '../../graphql/client';
import { GET_IMAGE_UPLOAD_LINK } from '../../graphql/miniBrands';

interface Props {
  open: boolean;
  handleClose: () => void;
}
export default function UploadDialog(props: Props) {
  const { open, handleClose } = props;
  // const uploadFiles = async (files: IFileWithMeta[]) => {
  //   await Promise.all(
  //     files.map(async (file) => {
  //       const data = await client.query({
  //         query: GET_IMAGE_UPLOAD_LINK,
  //         variables: { name: 'test' }
  //       });
  //       const url = data.data.getImageUploadLink;
  //       console.log(url);
  //       const response = await axios.put(url, file.file, {
  //         headers: {
  //           'Content-Type': file.file.type
  //         }
  //       });
  //       console.log(response);
  //     })
  //   );
  // };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ style: { padding: 10 } }}
    >
      <DialogTitle>Upload Mini Brands</DialogTitle>
      <DragAndDropUploader />
    </Dialog>
  );
}
