import React from 'react';
import Autosuggest from 'react-autosuggest';
import { debounce } from 'lodash';
  
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
 
export default class SearchContainer extends React.Component {
  constructor(props) {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };

    this.debouncedFetchSuggestions = debounce(this.fetchSuggestions, 500);
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
        'Authorization': 'Bearer ' + this.props.accessToken,
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
 
  render() {
    const { value, suggestions } = this.state;
 
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };
 
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
