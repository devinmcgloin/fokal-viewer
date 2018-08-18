import { LoginComponent } from '../../components/auth/login';
import { Login } from '../../store/action-creators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    title: 'Login',
    redirect: '/'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSuccess: googleUser => dispatch(Login(googleUser.getAuthResponse().id_token))
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export { LoginContainer };
