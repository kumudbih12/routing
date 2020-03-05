import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { signIn, resetSignInError } from '../../actions/user';
import { UserModel } from '../../reducers/user';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { history } from '../../../main';
import { textChanged } from '../../actions/user';
import { USER_SCHEMA, confirmPassword } from '../../models/scema/UserSchema';
import FormHelperText from '@material-ui/core/FormHelperText';
import { userAuth } from '../../reducers/auth';

export namespace SignIn {
  export interface Props {
    classes: any;
    user?: UserModel;
    auth?: userAuth;
    textChanged?: (fieldName, value) => void;
    signIn?: (user_name, password) => void;
    resetSignInError?: () => void;
  }
  export interface State {
    userName?: string;
    password?: string;
    submitted?: boolean;
    showPassword?: boolean;
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
    marginTop: theme.spacing.unit * 2
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
  remember: {
    textAlign: 'left',
    marginTop: "4px"
  },
  reset: {
    fontFamily: 'Colfax,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#546b81',
    textAlign: 'center'
  },
  '@global': {
    a: {
      color: '#0095FF',
      textDecoration: 'none'
    }
  },
  errorText: {
    color: '#86181d',
    backgroundColor: '#ffdce0',
    fontSize: '14px',
    borderWidth: '1px',
    padding: '13px 20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    textAlign: 'center'
  },
  password: {
    float: 'right',
    marginTop: '15px',
    fontSize: '14px'
  }
});

class SignIn extends React.Component<SignIn.Props, SignIn.State> {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      submitted: false,
      showPassword: false,
      error: {}
    };
  }

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
    this.props.auth.error && this.props.resetSignInError();
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  onBlur = (fieldName) => (e) => {
    const value = e.target.value;
    const userSchema = USER_SCHEMA(this.props.user.password);
    if (userSchema[fieldName].regex.test(value)) {
      this.props.textChanged(fieldName, value);
      this.setState((state) => ({ error: { ...state.error, [fieldName]: false } }));
    } else {
      !this.state.error[fieldName] &&
        this.setState((state) => ({ error: { ...state.error, [fieldName]: true } }));
    }
    if (fieldName === 'password') {
      confirmPassword.password = value;
    }
  };

  signInSubmit = (e) => {
    e.preventDefault();
    const keysOfField = Object.keys(this.state.error);
    if (!keysOfField.every((key) => !this.state.error[key]) || keysOfField.length !== 2) {
      const requiredFields = ['userName', 'password'];
      requiredFields.forEach((name) => {
        this.onBlur(name)({
          target: {
            value: this.props.user[name]
          }
        });
      });
    } else {
      const { userName, password } = this.state;
      const { signIn } = this.props;
      this.setState({ submitted: true });
      signIn(userName, password);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <div className={classes.reset}>
            <h2>Account Login</h2>
            <div className={classes.errorInfo}>
              {this.props.auth.error.signInError && (
                <FormHelperText className={classes.errorText}>
                  Incorrect username or password.
                </FormHelperText>
              )}
            </div>
            <form className={classes.form}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="userName">Email/Username*</InputLabel>
                <Input
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Email />
                      </IconButton>
                    </InputAdornment>
                  }
                  id="userName"
                  name="userName"
                  autoComplete="userName"
                  className={classes.formControl}
                  aria-describedby="component-error-text"
                  value={this.state.userName}
                  onChange={this.onChange('userName')}
                  onBlur={this.onBlur('userName')}
                />
                <div className={classes.errorInfo}>
                  {this.state.error['userName'] && (
                    <FormHelperText className={classes.errorText}>
                      Email/Username Required
                    </FormHelperText>
                  )}
                </div>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password*</InputLabel>
                <Input
                  id="password-input"
                  className={classes.formControl}
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
                <div className={classes.errorInfo}>
                  {this.state.error['password'] && (
                    <FormHelperText className={classes.errorText}>Password Required</FormHelperText>
                  )}
                </div>
              </FormControl>
              <div className={classes.remember}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <span className={classes.password}>
                  <a href="http://localhost:1729/forgotPassword">
                    <u>{'Forgot Password ?'}</u>
                  </a>
                </span>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.signInSubmit}
              >
                Log in
              </Button>
              <div className={classes.options}>
                <div>Or Login With</div>
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
                    <strong>Don't have an Account ? </strong>

                    <a href="http://localhost:1729/signup">
                      <u>
                        <strong>{'Sign Up now'}</strong>
                      </u>
                    </a>
                  </Typography>
                </div>
              </div>
            </form>
          </div>
        </Paper>
      </main>
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
  signIn: (user_name, password) => dispatch(signIn(user_name, password)),
  resetSignInError: () => dispatch(resetSignInError())
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(SignIn));
