import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import NativeSelect from '@material-ui/core/NativeSelect';
import { securityQuestionsInterface } from '../../reducers/securityQuestion';
import {
  updateSecurityQuestion,
  removeAnsweredQuestion,
  getAllSecurityQuestions,
  saveUserDetails
} from '../../actions/securityQuestion';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { FormHelperText } from '@material-ui/core';
import { history } from '../../../main';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';

export namespace securityQuestion {
  export interface Props {
    classes?: any;
    securityQuestions?: Array<securityQuestionsInterface>;
    getAllSecurityQuestions: () => void;
    updateSecurityQuestion: (question, userAnswer) => void;
    removeAnsweredQuestion: (question) => void;
    saveUserDetails: ({ questions }) => void;
  }
  export interface State {
    selectedQuestion?: any;
    userAnswer?: any;
    otherQuestion?: any;
    submitted?: boolean;
    error?: any;
    questions?: any;
  }
}

const regexOfSecurityQuestions = /[A-Za-z0-9]{3}([A-Za-z0-9]+ ?)*/;

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
    marginTop: theme.spacing.unit * 7,
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
    marginTop: theme.spacing.unit * 3,
    marginRight: '89px'
  },
  save: {
    marginTop: theme.spacing.unit * 3
  },
  skip: {
    marginLeft: '260px'
  },
  options: {
    padding: 0
  },
  '@global': {
    a: {
      color: '#0095FF',
      textDecoration: 'none'
    },
    '.MuiList-padding-160': {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 3
  },
  printQuestion: {
    width: '100%',
    fontSize: '18px'
  },
  ol: {
    background: '#ff9999',
    padding: '20px'
  },
  errorInfo: {},
  errorText: {
    color: "#86181d",
    backgroundColor: '#ffdce0',
    fontSize: "14px",
    borderWidth: "1px",
    margin: "0 auto 10px",
    padding: "20px 5px",
    borderStyle: "solid",
    borderRadius: "5px",
    textAlign: 'center',
    width: "340px",
    marginTop: '30px',
  },
  skipIcon: {
    marginLeft: theme.spacing.unit * 1
  }
});

class securityQuestion extends React.Component<securityQuestion.Props, securityQuestion.State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuestion: '',
      userAnswer: '',
      otherQuestion: '',
      questions: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.answerChangeHandler = this.answerChangeHandler.bind(this);
    this.otherQuestionChangeHandler = this.otherQuestionChangeHandler.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  submitButtonPressed = false;

  handleChange(event) {
    this.setState({ selectedQuestion: event.target.value, error: '' });
  }

  answerChangeHandler(event) {
    this.setState({
      userAnswer: event.target.value,
      error: event.target.value.length >= 3 ? '' : this.state.error
    });
  }

  otherQuestionChangeHandler(event) {
    this.setState({ otherQuestion: event.target.value, error: '' });
  }

  addQuestionHandler = () => {
    const sameQuestion = (question) => {
      return question.question === this.state.otherQuestion;
    };
    const isSameQuestion = this.props.securityQuestions.some(sameQuestion);
    if (this.state.selectedQuestion === 'Other questions') {
      if (
        regexOfSecurityQuestions.test(this.state.otherQuestion) &&
        regexOfSecurityQuestions.test(this.state.userAnswer) &&
        !isSameQuestion
      ) {
        this.state.error && this.setState({ error: '' });
        this.props.updateSecurityQuestion(this.state.otherQuestion, this.state.userAnswer);
        this.setState({ userAnswer: '', selectedQuestion: '', otherQuestion: '' });
      } else {
        this.setState({ error: isSameQuestion ? 'sameQuestion' : 'minCharacter' });
      }
    } else {
      if (regexOfSecurityQuestions.test(this.state.userAnswer)) {
        this.state.error && this.setState({ error: '' });
        this.props.updateSecurityQuestion(this.state.selectedQuestion, this.state.userAnswer);
        this.setState({ userAnswer: '', selectedQuestion: '', otherQuestion: '' });
      } else {
        this.setState({ error: 'minCharacter' });
      }
    }
  };

  removeQuestion = (question) => () => {
    this.props.removeAnsweredQuestion(question);
  };

  handleSkip = () => {
    history.push('/userPreview');
  };

  componentDidMount() {
    const { getAllSecurityQuestions, securityQuestions } = this.props;
    if (!securityQuestions.length) {
      getAllSecurityQuestions();
    }
  }

  componentDidUpdate() {
    if (this.submitButtonPressed) {
      if (!this.state.error) {
        const questions = this.props.securityQuestions.filter((question) => question.userAnswer);
        this.props.saveUserDetails({ questions });
        history.push('/userPreview');
      }
      this.submitButtonPressed = false;
    }
  }

  handleSubmit(e) {
    this.addQuestionHandler();
    this.submitButtonPressed = true;
  }

  render() {
    const { classes, securityQuestions } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Button
              type="submit"
              variant="outlined"
              onClick={this.handleSkip}
              className={classes.skip}
            >
              SKIP
              <ArrowForwardIcon className={classes.skipIcon} />
            </Button>
            <Typography component="div" variant="h6">
              <h3>Security Questions</h3>
            </Typography>
            <div className={classes.printQuestion}>
              {securityQuestions && (
                <ol>
                  {securityQuestions.map(
                    (question, questionIndex) =>
                      question.userAnswer && (
                        <li key={`${question}${questionIndex}`}>
                          <List className={classes.root}>
                            <ListItem>
                              <ListItemText
                                primary={question.question}
                                secondary={`- ${question.userAnswer}`}
                              />
                              <ListItemSecondaryAction>
                                <IconButton onClick={this.removeQuestion(question.question)}>
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </li>
                      )
                  )}
                </ol>
              )}
            </div>
            <FormControl margin="normal" fullWidth>
              <NativeSelect
                name="questions"
                className={classes.selectEmpty}
                onChange={this.handleChange}
                value={this.state.selectedQuestion}
              >
                <option value="">Choose your questions...</option>
                {securityQuestions.map(
                  (question, questionIndex) =>
                    !question.userAnswer && (
                      <option key={`${question}${questionIndex}`} value={question.question}>
                        {question.question}
                      </option>
                    )
                )}
              </NativeSelect>
            </FormControl>
            {this.state.selectedQuestion === 'Other questions' && (
              <Input
                fullWidth
                placeholder="Your question"
                className={classes.input}
                onChange={this.otherQuestionChangeHandler}
                inputProps={{
                  'aria-label': 'Description'
                }}
              />
            )}
            <Input
              fullWidth
              placeholder="Your answer"
              className={classes.input}
              onChange={this.answerChangeHandler}
              value={this.state.userAnswer}
              inputProps={{
                'aria-label': 'Description'
              }}
            />
            <div className={classes.errorInfo}>
              {this.state.error && (
                <FormHelperText className={classes.errorText}>
                  <span>
                    {this.state.error === 'minCharacter'
                      ? 'min 3 letters required'
                      : 'question already exist'}
                  </span>
                </FormHelperText>
              )}
            </div>
            <div style={{ marginTop: '60px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.addQuestionHandler}
              >
                ADD MORE QUESTIONS
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.save}
                onClick={this.handleSubmit}
              >
                SAVE
              </Button>
            </div>
          </Paper>
        </main>
      </form>
    );
  }
}
const mapStateToProps = ({ securityQuestions }) => ({
  securityQuestions
});

const mapDispathFromProps = (dispatch) => ({
  getAllSecurityQuestions: () => dispatch(getAllSecurityQuestions()),
  updateSecurityQuestion: (question, userAnswer) =>
    dispatch(updateSecurityQuestion(question, userAnswer)),
  removeAnsweredQuestion: (question) => dispatch(removeAnsweredQuestion(question)),
  saveUserDetails: ({ questions }) => dispatch(saveUserDetails({ questions }))
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(securityQuestion));
