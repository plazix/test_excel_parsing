import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress"
import Typography from '@mui/material/Typography';

import ProcessingService from "../../services/processing.service"


const Input = styled('input')({
  display: 'none',
});


type Props = {};

type State = {
  selectedFile: File | null,
  message: string,
  uploaded: boolean
};


export default class UploadFile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      selectedFile: null,
      message: "",
      uploaded: false
    };
  }

  handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    this.setState({
      message: "",
      uploaded: false
    });
    if (fileList && fileList.length > 0) {
      this.setState({selectedFile: fileList[0]});
      this.uploadFile(fileList[0]);
    }
  }

  uploadFile(f: File) {
    ProcessingService.upload(f).then(
      () => {
        this.setState({
          selectedFile: null,
          uploaded: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      }
    )
  }

  render() {
    const { selectedFile, message, uploaded } = this.state;

    return (
      <div>
        <label htmlFor="contained-button-file">
          <Input id="contained-button-file" type="file" onChange={this.handleFileChange} />
          <Button variant="contained" component="span">
            Upload XLS or XLSX
          </Button>

          {selectedFile && (
            <span style={{marginLeft: "10px"}}>
              <CircularProgress size={20} />
              {selectedFile.name}
            </span>
          )}

          {uploaded && (
            <span style={{marginLeft: "10px"}}>Success</span>
          )}
        </label>
        {message && (
          <Typography color="error">{message}</Typography>
        )}
      </div>
    )
  }
}
