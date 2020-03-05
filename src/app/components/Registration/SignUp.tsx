import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import user, { UserModel } from 'app/reducers/user';
import { USER_SCHEMA, confirmPassword } from '../../models/scema/UserSchema';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import { textChanged } from '../../actions/user';
import { saveUserDetails } from '../../actions/securityQuestion';
import { history } from '../../../main';
import { userAuth } from '../../reducers/auth';
import { isMatchByCredentials, resetSignInError } from '../../actions/user';

export namespace SignUp {
  export interface Props {
    classes?: any;
    user?: UserModel;
    auth?: userAuth;
    isMatchByCredentials?: (userName, email) => void;
    textChanged?: (fieldName, value) => void;
    saveUserDetails?: ({ userName, email, password }) => void;
    resetSignInError?: () => void;
  }
  export interface State {
    userName?: any;
    email?: string;
    password?: string;
    confirmPassword?: string;
    showPassword?: any;
    showConfirmPassword?: any;
    value?: string;
    error?: any;
  }
}

const styles: any = (theme) => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 13,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 4
  },
  using: {
    fontSize: '14px',
    lineHeight: 2,
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    textAlign: 'center',
  },
  options: {
    padding: 10
  },
  forOr: {
    textAlign: 'center'
  },
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: '50%',
    textAlign: 'center'
  },
  '@global': {
    a: {
      color: '#0095FF',
      textDecoration: 'none'
    },
    '.MuiGrid-justify-xs-center-192': {
      marginTop: '20px'
    }
  },
  reset: {
    fontFamily: 'Colfax,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#546b81',
    textAlign: 'center'
  },
  errorText: {
    color: '#86181d',
    backgroundColor: '#ffdce0',
    fontSize: '14px',
    margin: '10px 0',
    padding: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px 3px 3px 3px',
    textAlign: 'center'
  }
});

class SignUp extends React.Component<SignUp.Props, SignUp.State> {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: null,
      showConfirmPassword: null,
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword = () => (event) => {
    this.setState({ value: event.target.value, error: '' });
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState((state) => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  onBlur = (fieldName) => (e) => {
    const value = e.target.value;
    const userSchema = USER_SCHEMA(this.props.user.password);
    if (userSchema[fieldName].regex.test(value)) {
      this.props.textChanged(fieldName, value);
      this.state.error[fieldName] &&
        this.setState((state) => ({ error: { ...state.error, [fieldName]: false } }));
    } else {
      !this.state.error[fieldName] &&
        this.setState((state) => ({ error: { ...state.error, [fieldName]: true } }));
    }
    if (fieldName === 'password') {
      confirmPassword.password = value;
    }
  };

  isUserValidate = (userName) => (e) => {
    e.target.value &&
      this.props.isMatchByCredentials(
        userName === 'email' ? undefined : this.state.userName,
        userName === 'email' ? this.state.email : undefined
      );
    this.onBlur(userName)(e);
  };

  onChange = (fieldName) => (e) => {
    const value = e.target.value;
    this.setState({
      [fieldName]: value,
      error: {
        ...this.state.error,
        [fieldName]: USER_SCHEMA(this.props.user.password)[fieldName].regex.test(value)
          ? false
          : true
      }
    });
    !this.props.auth.error && this.props.resetSignInError();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const keysOfField = Object.keys(this.state.error);
    if (!keysOfField.every((key) => !this.state.error[key]) || keysOfField.length !== 4) {
      const requiredFields = ['userName', 'email', 'password', 'confirmPassword'];
      requiredFields.forEach((name) => {
        this.onBlur(name)({
          target: {
            value: name === 'confirmPassword' ? this.state.confirmPassword : this.props.user[name]
          }
        });
      });
    } else {
      const { userName, email, password } = this.props.user;
      this.props.saveUserDetails({ userName, email, password });
      history.push('./registration');
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <div className={classes.reset}>
              <h2>Create Account</h2>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="userName">Username*</InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  }
                  id="userName"
                  name="userName"
                  autoComplete="userName"
                  className={classes.formControl}
                  error={this.state.error['userName']}
                  aria-describedby="component-error-text"
                  value={this.state.userName}
                  onChange={this.onChange('userName')}
                  onBlur={this.isUserValidate('userName')}
                />
                {this.state.error['userName'] && (
                  <FormHelperText className={classes.errorText}>
                    only alphanumeric value
                  </FormHelperText>
                )}
                {this.props.auth.error.userName && (
                  <FormHelperText className={classes.errorText}>
                    Username is already exist.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email*</InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Email />
                      </IconButton>
                    </InputAdornment>
                  }
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={classes.formControl}
                  error={this.state.error['email']}
                  aria-describedby="component-error-text"
                  value={this.state.email}
                  onChange={this.onChange('email')}
                  onBlur={this.isUserValidate('email')}
                />
                {this.state.error['email'] && (
                  <FormHelperText className={classes.errorText}>
                    Enter valid E-mail id.
                  </FormHelperText>
                )}
                {this.props.auth.error.email && (
                  <FormHelperText className={classes.errorText}>
                    This email address is already in use.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password*</InputLabel>
                <Input
                  id="password-input"
                  className={classes.formControl}
                  error={this.state.error['password']}
                  aria-describedby="component-error-text"
                  autoComplete="current-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.onChange('password')}
                  onBlur={this.onBlur('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.state.error['password'] && (
                  <FormHelperText className={classes.errorText}>
                    password contains alphanumeric and symbol only
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="confirmPassword">Re-enter Password*</InputLabel>
                <Input
                  id="adornment-password"
                  className={classes.formControl}
                  error={this.state.error['confirmPassword']}
                  aria-describedby="component-error-text"
                  autoComplete="current-password"
                  type={this.state.showConfirmPassword ? 'text' : 'password'}
                  value={this.state.confirmPassword}
                  onChange={this.onChange('confirmPassword')}
                  onBlur={this.onBlur('confirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowConfirmPassword}
                      >
                        {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.state.error['confirmPassword'] && (
                  <FormHelperText className={classes.errorText}>
                    The passwords don't match
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
                onMouseDown={this.handleSubmit}
              >
                Sign Up
              </Button>
              <div className={classes.options}>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src="src/image/facebook2.png"
                    className={classes.bigAvatar}
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src="src/image/twitter1.png"
                    className={classes.bigAvatar}
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src="src/image/google.png"
                    className={classes.bigAvatar}
                  />
                </Grid>
              </div>
              <div>
                <div className={classes.using}>
                  <Typography>
                    <strong>Have already an Account ? </strong>
                    
                    <a href="http://localhost:1729/login"><u><strong>{'Login here'}</strong></u></a>
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
        </main>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  refrenceData: state.refrenceData,
  auth: state.auth
});

const mapDispathFromProps = (dispatch) => ({
  textChanged: (fieldName, value) => dispatch(textChanged(fieldName, value)),
  saveUserDetails: ({ userName, email, password }) =>
    dispatch(saveUserDetails({ userName, email, password })),
  isMatchByCredentials: (userName, email) => dispatch(isMatchByCredentials(userName, email)),
  resetSignInError: () => dispatch(resetSignInError())
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(SignUp));
