import * as React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { FormHelperText } from '@material-ui/core';

export namespace passwordResetForm {
  export interface Props {
    classes: any;
  }
  export interface State {
    password?: string;
    submitted?: boolean;
    error?: boolean;
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px`
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  options: {
    padding: 0
  },
  '@global': {
    a: {
      color: '#0095FF',
      textDecoration: 'none'
    }
  },
  reset: {
    fontFamily: 'Colfax,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#546b81',
    textAlign: 'center'
  },
  small: {
    fontSize: '13px',
    lineHeight: '20px'
  }
});

class passwordResetForm extends React.Component<passwordResetForm.Props, passwordResetForm.State> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: false
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = (e) => {};

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <div className={classes.reset}>
            <h2>Reset Password</h2>
            <form className="form" onSubmit={this.handleSubmit}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Current Password*</InputLabel>
                <Input
                  id="password-input"
                  className={classes.formControl}
                  aria-describedby="component-error-text"
                  autoComplete="current-password"
                  type={this.state.password ? 'text' : 'password'}
                  value={this.state.password}
                  // onChange={this.onChange('password')}
                  // onBlur={this.onBlur('password')}
                />
                <div className={classes.errorInfo}>
                  {this.state.error['password'] && (
                    <FormHelperText className={classes.errorText}>Password Required</FormHelperText>
                  )}
                </div>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">New Password*</InputLabel>
                <Input
                  id="password-input"
                  className={classes.formControl}
                  aria-describedby="component-error-text"
                  autoComplete="current-password"
                  type={this.state.password ? 'text' : 'password'}
                  value={this.state.password}
                  // onChange={this.onChange('password')}
                  // onBlur={this.onBlur('password')}
                />
                <div className={classes.errorInfo}>
                  {this.state.error['password'] && (
                    <FormHelperText className={classes.errorText}>Password Required</FormHelperText>
                  )}
                </div>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Confirm Password*</InputLabel>
                <Input
                  id="password-input"
                  className={classes.formControl}
                  aria-describedby="component-error-text"
                  autoComplete="current-password"
                  type={this.state.password ? 'text' : 'password'}
                  value={this.state.password}
                  // onChange={this.onChange('password')}
                  // onBlur={this.onBlur('password')}
                />
                <div className={classes.errorInfo}>
                  {this.state.error['password'] && (
                    <FormHelperText className={classes.errorText}>Password Required</FormHelperText>
                  )}
                </div>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles, { withTheme: true })(passwordResetForm);
