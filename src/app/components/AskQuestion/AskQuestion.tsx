import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MiniDrawer from 'app/components/miniDrawer/MiniDrawer';
import SignIn from '../loging/SignIn';

export namespace AskQuestion {
  export interface Props {
    classes: any;
  }
}

const styles: any = (theme) => ({
  container: {
    border: '1px solid orange',
    padding: '32px 80px',
    textAlign: 'center',
    marginTop: '130px',
    width: '100%',
    maxWidth: '640px',
    backgroundColor: '#fffdf6'
  },
  mainContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  line: {
    paddingLeft: '12px',
    paddingRight: '12px',
    fontSize: '15px',
    lineHeight: '1.2',
    fontWeight: '600',
    marginTop: '12px'
  },
  '@global': {
    a: {
      color: '#0095FF',
      textDecoration: 'none'
    },
    '.AskQuestion-paper-2': {
      marginTop: '30px'
    },
    '.SignIn-paper-220': {
      marginTop: '38px'
    }
  },
  questionAsk: {
    fontSize: '1.61538462rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '24px',
    textAlign: 'center'
  }
});

class AskQuestion extends React.Component<AskQuestion.Props, {}> {
  render() {
    const { classes } = this.props;

    return (
      <MiniDrawer>
        <div className={classes.mainContainer}>
          <div className={classes.container}>
            <Typography>
              <span className={classes.line}>
                You must be logged in to ask a question on Truth OR Truth
              </span>
              <span>
                Log in below or <a href="http://localhost:1729/signup"><u>{'SIGN UP'}</u></a>
              </span>
            </Typography>
          </div>
          <div className={classes.questionAsk}>You must login to ask question.</div>
          <SignIn />
        </div>
      </MiniDrawer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AskQuestion);
