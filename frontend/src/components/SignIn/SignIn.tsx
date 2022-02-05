import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress"

import AuthService from "../../services/auth.service";


type Props = {
  navigate: NavigateFunction
}

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
};

function withNavigation(Component: any) {
  return (props: any) => <Component {...props} navigate={useNavigate()} />;
}

class SignIn extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let username = data.get('username')?.toString();
    let password = data.get('password')?.toString();

    if (!username || !password) {
      this.setState({
        message: "Incorrect username or password",
        loading: false
      });

      return;
    }

    this.setState({
      message: "",
      loading: true
    });

    AuthService.login(username, password).then(
      () => {
        this.props.navigate("/", { replace: true });
        //window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { loading, message } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
              {message && (
                <Typography color="error">{message}</Typography>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                endIcon={loading && (<CircularProgress size={20}/>)}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>

        </Box>
      </Container>
    );
  }
}

export default withNavigation(SignIn);
