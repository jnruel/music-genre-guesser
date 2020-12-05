import { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { getArtist } from '../helper/fetch';
import { debounce } from 'lodash';
import { AppContext } from '../contexts/AppContext';

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class SearchContainer extends Component {
  static contextType = AppContext;

  constructor() {
    super();

    this.state = {
      value: '',
      selected_artist: null,
      suggestions: []
    };

    this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 500);
  }

  componentDidMount() {
    this.setState({ accessToken: this.context.accessToken });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  fetchSuggestions = async (value) => {
    const url = 'https://api.spotify.com/v1/search';
    const paramsObject = {
      q: value,
      type: 'artist',
      limit: 10
    };

    let params = new URLSearchParams(paramsObject);

    const response = await fetch(url + '?' + params.toString(), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.hasOwnProperty('artists') && data.artists.hasOwnProperty('items')) {
      this.setState({
        suggestions: data.artists.items
      });
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    this.debouncedFetchSuggestions(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue = (suggestion) => {
    this.setState({
      selected_artist: suggestion
    });

    return suggestion.name
  };

  handleClick = async () => {
    // TODO: error handling.
    let artist = await getArtist(this.state.accessToken, this.state.selected_artist.id);
    this.context.setArtist(artist);
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type an artist',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        <button onClick={this.handleClick}>Submit</button>
      </>
    );
  }
}
