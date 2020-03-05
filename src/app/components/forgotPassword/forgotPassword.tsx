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

export namespace forgotPassword {
  export interface Props {
    classes: any;
  }
  export interface State {
    email?: string;
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
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
    color: '#546b81'
  },
  small: {
    fontSize: '13px',
    lineHeight: '20px'
  }
});

class forgotPassword extends React.Component<forgotPassword.Props, forgotPassword.State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = (e) => {

  };

  render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={classes.main}
      >
        <Paper className={classes.paper}>
          <div className={classes.reset}>
            <h2>Reset Password</h2>
            <p className={classes.small}>To reset your password, please provide your email.</p>
            <main className={classes.form}>
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
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
              </FormControl>
              <div className={classes.errorInfo}>
                {this.state.error && (
                  <FormHelperText className={classes.errorText}>
                    <span> Enter valid Email-id </span>
                  </FormHelperText>
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                send otp
              </Button>
            </main>
          </div>
        </Paper>
      </form>
    );
  }
}
export default withStyles(styles, { withTheme: true })(forgotPassword);
