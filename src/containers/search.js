import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchComponent } from '../components/search';
import { fetchResultsIfNeeded, setQuery } from '../store/search';

class Search extends Component {
  componentDidMount = () => {
    const { dispatch, query } = this.props;
    dispatch(setQuery(query));
    dispatch(fetchResultsIfNeeded(query));
  };
  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch(setQuery(''));
  };
  render = () => <SearchComponent {...this.props} />;
}

const mapStateToProps = (state, props) => {
  const query = props.match.params.query.split('-').join(' ');
  const { isLoading, isFailed, results } = state.search[query] || {
    isLoading: true,
    isFailed: false,
    results: []
  };
  return {
    query,
    results,
    isLoading,
    isFailed
  };
};

const SearchContainer = connect(mapStateToProps)(Search);

export default SearchContainer;
