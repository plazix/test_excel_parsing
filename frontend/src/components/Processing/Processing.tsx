import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ProcessingService from "../../services/processing.service"


type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  accessToken: string
};


export default class Processing extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      accessToken: ""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const list = ProcessingService.list();

    if (!currentUser) this.setState({ redirect: "/signin" });
    this.setState({ accessToken: "", userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return (
      <div>Processing</div>
    )
  }
};
