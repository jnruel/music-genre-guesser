import React, { Component, createContext } from 'react';

// type ClockState = {
//   time: Date
// }

export const AppContext = createContext();

export default class AppContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: this.props.accessToken,
      artist: null
    };
  }

  setArtist = (newArtist) => {
    this.setState({artist: newArtist});
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setArtist: this.setArtist
        }}
      >
        { this.props.children }
      </AppContext.Provider>
    );
  }
}
