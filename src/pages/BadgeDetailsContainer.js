import React, { Component } from "react";

import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import api from "../api";
import BadgeDetails from "./BadgeDetails";

class BadgeDetailsContainer extends Component {
  state = {
    loading: true,
    error: false,
    data: undefined,
    modalIsOpen: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleOpenModal = e => {
    this.setState({ modalIsOpen: true });
    console.log("Open Modal");
  };

  handleCloseModal = e => {
    this.setState({ modalIsOpen: false });
    console.log("Close Modal");
  };

  handleDeleteBadge = async () => {
    this.setState({ loading: true, error: null });
    try {
      await api.badges.remove(this.props.match.params.badgeId);
      this.setState({ loading: false });
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }
    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }
    return (
      <BadgeDetails
        badge={this.state.data}
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
      />
    );
  }
}

export default BadgeDetailsContainer;
