import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import ForumIcon from '@material-ui/icons/Forum';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { securityQuestionsInterface } from '../../reducers/securityQuestion';
import { inherits } from 'util';
import user, { UserModel } from 'app/reducers/user';
import { history } from '../../../main';
import question from 'app/reducers/question';
import {
  updateSecurityQuestion,
  removeAnsweredQuestion,
  getAllSecurityQuestions,
  saveUserDetails
} from '../../actions/securityQuestion';

export namespace userPreview {
  export interface Props {
    classes?: any;
    user?: UserModel;
    saveSecurityQuestion: ({ selectedQuestions }) => void;
    securityQuestions?: Array<securityQuestionsInterface>;
  }
  export interface State {}
}

const styles: any = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  roots: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: inherits
  },
  rootss: {
    maxWidth: 360,
    backgroundColor: inherits
  },
  container: {
    width: '800px',
    margin: 'auto',
    border: '2px solid blue',
    padding: '2px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  user: {
    flex: '0 0 100%',
    border: '1px solid black',
    padding: '10px',
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: 'sans-serif',
    lineHeight: '1.33em',
    fontWeight: '300',
    backgroundColor: 'antiqueWhite'
  },
  personal: {
    border: '1px solid black',
    marginTop: '20px',
    padding: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  security: {
    border: '1px solid black',
    marginTop: '20px',
    padding: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  image: {
    width: '160px',
    height: '170px',
    border: '1px solid red',
    marginTop: '10px',
    background: 'url(src/image/person.png)',
    backgroundSize: '100% 100%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  both: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    display: 'flex',

    padding: '30px',
    backgroundColor: 'ghostWhite'
  },
  button: {
    margin: theme.spacing * 1,
    float: 'right',
    textTransform: 'none'
  },
  submit: {
    textAlign: 'center',
    padding: '14px',
    backgroundColor: 'ghostWhite'
  }
});

class userPreview extends React.Component<userPreview.Props, userPreview.State> {
  handleSubmit = () => {
    history.push('./blogPage');
  };

  handleEditDetails = () => {
    history.push('./registration');
  };

  handleEditQuestion = () => {
    history.push('./securityQuestion');
  };

  render() {
    const { classes, user, securityQuestions } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.container}>
          <div className={classes.user}>
            <h3>User Preview</h3>
          </div>
          <div className={classes.both}>
            <div className={classes.user}>Sign Up Details</div>
            <div className={classes.image} />
            <List className={classes.rootss}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Username" secondary={user.userName} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LockIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Password" secondary={user.password} />
              </ListItem>
            </List>
          </div>
          <div className={classes.both}>
            <div className={classes.personal}>
              <div className={classes.user}>Personal Details</div>
              <List className={classes.roots}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Name" secondary={`${user.firstName} ${user.lastName}`} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SupervisedUserCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Gender" secondary={user.gender} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DateRangeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Date Of Birth" secondary={user.dateOfBirth} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PlaceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Address"
                    secondary={`${user.addressLine1} ${user.addressLine2} ${user.city.label} ${
                      user.state.label
                    } ${user.country.label}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SmartphoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Mobile No." secondary={user.phoneNo} />
                </ListItem>
              </List>
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.handleEditDetails}
              >
                Edit
              </Button>
            </div>
            <div className={classes.security}>
              <div className={classes.user}>Security Questions</div>
              <List className={classes.roots}>
                {securityQuestions.map(
                  (question, questionIndex) =>
                    question.userAnswer && (
                      <ListItem key={`${question}${questionIndex}`}>
                        <ListItemAvatar>
                          <Avatar>
                            <ForumIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${question.question}`}
                          secondary={`${question.userAnswer}`}
                        />
                      </ListItem>
                    )
                )}
              </List>
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.handleEditQuestion}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className={classes.submit}>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ user, refrenceData, securityQuestions }) => ({
  user,
  refrenceData,
  securityQuestions
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(userPreview));
