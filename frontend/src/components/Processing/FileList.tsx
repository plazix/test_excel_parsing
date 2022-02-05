import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ProcessingService from "../../services/processing.service";


type Props = {};

type State = {
  message: string,
  loading: boolean,
  files: any[]
};

export default class FileList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
        files: [],
        loading: true,
        message: ""
      };
  }

  componentDidMount() {
    this.setState({
      files: [],
      loading: true,
      message: ""
    });

    ProcessingService.list().then(
      (response) => {
        this.setState({
          files: response.data,
          loading: false
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
          message: resMessage,
          loading: false
        });
      }
    );
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1: return "загружено";
      case 2: return "обрабатывается";
      case 3: return "обработано";
      case 4: return "ошибка"
      default: return "unknown"
    }
  }

  render() {
    const { message, loading, files } = this.state;

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Uploaded At</TableCell>
              <TableCell>Finished At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((row) => (
              <TableRow key={"id-row-" + row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.uploaded_at}</TableCell>
                <TableCell>{row.finished_at}</TableCell>
                <TableCell>{this.getStatusText(row.status)}</TableCell>
                <TableCell>
                  {row.state == 4 ? row.error : row.result}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
