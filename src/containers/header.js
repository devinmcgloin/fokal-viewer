import { connect } from 'react-redux';
import { Header } from '../components/header';
import { fetchResultsIfNeeded, setQuery } from '../store/search';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    query: state.search.current_query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: query => dispatch(fetchResultsIfNeeded(query)),
    setQuery: query => dispatch(setQuery(query))
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
