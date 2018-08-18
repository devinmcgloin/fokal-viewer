import { connect } from 'react-redux';
import { Header } from '../components/header';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
