import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ProcessingService from "../../services/processing.service";
import Typography from "@mui/material/Typography";


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

  refresh() {
    ProcessingService.list().then(
      (response) => {
        this.setState({
          message: "",
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

  componentDidMount() {
    this.setState({
      files: [],
      loading: true,
      message: ""
    });

    this.refresh();

    setInterval(() => this.refresh(), 1000);
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
      <div>
        {message && (
          <Typography color="error">{message}</Typography>
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Uploaded At</TableCell>
                <TableCell>Finished At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Error</TableCell>
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
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.error}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
