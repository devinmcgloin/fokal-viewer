import { connect } from 'react-redux';
import { Header } from '../components/header';

const mapStateToProps = state => {
  console.log(state);
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
