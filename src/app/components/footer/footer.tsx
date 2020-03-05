import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//  import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Avatar } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export namespace footer {
  export interface Props {
    classes?: any;
  }
  export interface State {}
}

const styles: any = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2
  },
  footer: {
    padding: theme.spacing.unit * 2,
    marginTop: 'auto',
    backgroundColor: 'white'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: '50%',
    textAlign: 'center'
  }
});

class footer extends React.Component<footer.Props, footer.State> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <div>
          <Typography variant="h2" component="h1" gutterBottom>
            Sticky footer
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Pin a footer to the bottom of the viewport.'}
            {'The footer will move as the main element of the page grows.'}
          </Typography>
          <Typography variant="body1">Sticky footer placeholder.</Typography>
        </div>
        <footer className={classes.footer}>
          <div>
            <Typography variant="h5" component="h2" gutterBottom>
              Follow Us
            </Typography>
            <Link color="inherit" href="https://material-ui.com/">
              <Avatar
                alt="Remy Sharp"
                src="src/image/facebook2.png"
                className={classes.bigAvatar}
              />
            </Link>{' '}
            <Link color="inherit" href="https://material-ui.com/">
              <Avatar alt="Remy Sharp" src="src/image/twitter1.png" className={classes.bigAvatar} />
            </Link>{' '}
            <Link color="inherit" href="https://material-ui.com/">
              Instagram
            </Link>{' '}
            <Link color="inherit" href="https://material-ui.com/">
              Google+
            </Link>{' '}
          </div>
          <div>
            <Typography variant="body1">My sticky footer can be found here.</Typography>
            <Copyright />
          </div>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(footer);

// return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Container component="main" className={classes.main} maxWidth="sm">
//         <Typography variant="h2" component="h1" gutterBottom>
//           Sticky footer
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           {'Pin a footer to the bottom of the viewport.'}
//           {'The footer will move as the main element of the page grows.'}
//         </Typography>
//         <Typography variant="body1">Sticky footer placeholder.</Typography>
//       </Container>
//       <footer className={classes.footer}>
//         <Container maxWidth="sm">
//           <Typography variant="body1">My sticky footer can be found here.</Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );