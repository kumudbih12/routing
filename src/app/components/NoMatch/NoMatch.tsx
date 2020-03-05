import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

export namespace NoMatch {
  export interface Props {
    classes?: any;
  }
  export interface State {}
}

const styles: any = (theme) => ({
  wrapper: {
    fontSize: '18px',
    padding: '8px',
    resize: 'none',
    border: 'none',
    lineHeight: 'normal',
    width: '100%',
    height: '100%'
  },

  error_page: {
    color: '#000000',
    margin: '0px',
    fontSize: '100%',
    textAlign: 'center',
    padding: '100px',
    
  },
});

class NoMatch extends React.Component<NoMatch.Props, NoMatch.State> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.error_page}>
          <h1>404 Page Not Found</h1>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NoMatch);
