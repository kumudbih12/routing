import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import SvgIcon from '@material-ui/core/SvgIcon';

import MiniDrawer from 'app/components/miniDrawer/MiniDrawer';

import { questionData } from '../../reducers/question';
import { question } from 'app/actions/questionAction';
import { history } from '../../../main';
import { activeQuestion } from '../../actions/activeQuestion';

export namespace BlogPage {
  export interface Props {
    classes?: any;
    children?: any;
    theme?: any;
    vote?: () => {};
    view?: () => {};
    questions?: questionData;
    answersCount?: () => {};
    questionId?: () => {};
    activeQuestion: (activeQuestionId) => void;
  }
  export interface State {}
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 2 * 2 }}>
      {props.children}
    </Typography>
  );
}

const styles: any = (theme) => ({
  container: {
    padding: '35px 8px'
  },
  button: {
    float: 'right'
  },
  maincontainer: {
    marginTop: 60,
    display: 'flex',
    width: 'auto',
    backgroundColor: '#FFF',
    padding: '9px',
    boxSizing: 'border-box'
  },
  mainbar: {
    display: 'block',
    padding: '10px',
    backgroundColor: '#FFFFFF',
    float: 'left'
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    borderBottom: '1px solid grey',
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 8px'
  },
  questions: {
    marginTop: '10px',
    lineHeight: '1.3',
    marginBottom: '2px',
    display: 'block',
    wordBreak: 'break-word',
    fontSize: '16px'
  },
  sidebar: {
    border: '1px solid gray',
    float: 'left',
    width: '18%',
    marginLeft: '7px',
    display: 'block',
    marginTop: '45px',
    backgroundColor: '#FFFFFF'
  },
  image: {
    background: 'url(src/image/purple.jpg)',
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    padding: '20px',
    backgroundSize: '100% 100%'
  },
  jobs: {
    borderBottom: '1px solid grey',
    padding: '8px',
    fontSize: '14px',
    lineHeight: '1.4'
  },
  tag: {
    textAlign: 'center',
    position: 'relative',
    color: '#39739d',
    backgroundColor: '#E1ECF4',
    padding: '.4em .5em',
    margin: '2px 4px 2px 0px',
    fontSize: '12px',
    lineHeight: '1',
    display: 'inline-block',
    borderRadius: '3px',
    border: '1px solid #E1ECF4',
    cursor: 'pointer'
  },
  image1: {
    background: 'url(src/image/orange.jpg)',
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    padding: '8px',
    backgroundSize: '100% 100%'
  },
  roots: {
    position: 'relative',
    borderBottom: '1px solid gray',
    padding: '0px 4px 16px 4px',
    display: 'flex',
    boxSizing: 'border-box',
    overflow: 'hidden',
    width: '100%'
  },
  icon: {
    margin: theme.spacing.unit * 2,
    fontSize: 40
  },
  userview: {
    display: 'block',
    height: '38px',
    minWidth: '38px',
    margin: '-5px 3px 0 0',
    fontSize: '18px',
    padding: '5px 4px',
    textAlign: 'center'
  },
  write: {
    margin: 0,
    padding: 0,
    border: 0,
    font: 'inherit',
    fontSize: '12px',
    verticalAlign: 'baseline'
  },
  counter: {
    margin: '-3px',
    padding: '4px 0px 0px 0px',
    font: 'inherit',
    fontSize: '16px',
    verticalAlign: 'baseline',
    border: '1px solid #3F51B5',
    borderRadius: '6px'
  },
  rating: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    marginRight: 0,
    padding: '0 8px 0 0',
    boxSizing: 'content-box',
    flexShrink: 0,
    cursor: 'pointer'
  },
  tagIds: {
    width: 'auto',
    paddingLeft: 0,
    lineHeight: '18px',
    float: 'left',
    margin: 0,
    padding: 0,
    border: 0,
    font: 'inherit',
    fontSize: '100%',
    verticalAlign: 'baseline'
  },
  '@global': {
    body: {
      color: '',
      fontFamily: [
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ].join(',')
    },
    '.MuiGrid-container-259': {
      width: '100%',
      wordBreak: 'break-word'
    },
    '.BlogPage-rating-19': {
      cursor: 'context-menu'
    },
    '.MuiTypography-body1-119': {
      fontSize: '18px'
    },
    '.MuiAppBar-colorDefault-58': {
      backgroundColor: '#fff'
    }
  },
  remotejob: {
    textTransform: 'none',
    padding: '2px 4px',
    marginTop: '4px'
  },
  hotquestion: {
    padding: 7,
    display: 'inline-block',
    fontWeight: 'normal',
    fontSize: '15px',
    whiteSpace: 'normal',
    width: 'auto'
  },
  questionList: {
    padding: 5,
    display: 'inline-block',
    fontWeight: 'normal',
    fontSize: '17px',
    whiteSpace: 'normal',
    width: 'auto',
    cursor: 'pointer',
  },
  summary: {
    width: '642px',
    padding: 0,
    margin: 0,
    marginLeft: '12px',
    overflow: 'hidden'
  },
  starRating: {
    width: '120px',
    padding: '0px',
    marginTop: '3px',
    float: 'left'
  },
  userName: {
    float: 'right',
    width: 'auto',
    fontSize: '13px',
    fontFamily: 'cursive',
    marginRight: '8px'
  },
  tagArea: {
    width: 'auto',
    padding: 0,
    margin: 0,
    marginLeft: '0px',
    overflow: 'hidden'
  }
});
function StarBorder(props) {
  return (
    <SvgIcon {...props}>
      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
    </SvgIcon>
  );
}

class BlogPage extends React.Component<BlogPage.Props, BlogPage.State> {
  state = {
    index: 0
  };

  handleChange = (event, value) => {
    this.setState({
      index: value
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index
    });
  };

  onClick = (activeQuestionId) => () => {
    this.props.activeQuestion(activeQuestionId);
    history.push('/questionnaire');
  };

  render() {
    const { classes, theme, questions } = this.props;
    const { index } = this.state;
    const questionIds = Object.keys(questions);
    questionIds.map((questionId) => {
      return questions[questionId];
    });

    return (
      <MiniDrawer>
        <Paper className={classes.maincontainer}>
          <div className={classes.mainbar}>
            <div className={classes.container}>
              <Typography paragraph variant="h5">
                Top Questions
                <Button className={classes.button} variant="contained" color="primary">
                  <a
                    href="http://localhost:1729/askQuestion"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {'Ask Question'}
                  </a>
                </Button>
              </Typography>
            </div>
            <AppBar position="static" color="default">
              <Tabs
                value={index}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Interesting" />
                <Tab label="Featured" />
                <Tab label="Hot" />
                <Tab label="New" />
                <Tab label="Others" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.index}
              onChangeIndex={this.handleChangeIndex}
            >
              {index === 0 && (
                <TabContainer>
                  {questionIds.map((questionId, index) => {
                    const ratingColor = `${(Number(questions[questionId].rateQuestion) / 5) *
                      100}%`;
                    return (
                      <Grid key={questionId} container className={classes.roots}>
                        <div className={classes.rating}>
                          <div className={classes.userview}>
                            <IconButton>
                              <TouchAppIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.vote}
                              />
                            </IconButton>
                            <div key={questionId} className={classes.counter}>
                              {questions[questionId].like || 0}
                              <div className={classes.write}>vote</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <CreateIcon className={classes.icon.count} color="primary" />
                            </IconButton>
                            <div key={questionId} className={classes.counter}>
                              {questions[questionId].answersCount || 0}
                              <div className={classes.write}>answers</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <VisibilityIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.view}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].views}
                              <div className={classes.write}>views</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton
                              key={`${(Number(questions[questionId].rateQuestion) / 5) * 100}%`}
                            >
                              <StarBorder
                                component={(svgProps) => (
                                  <svg {...svgProps}>
                                    <defs>
                                      <linearGradient id="gradient1">
                                        <stop offset="0%" stopColor="red" />
                                        <stop offset={ratingColor} stopColor="blue" />
                                        <stop offset="100%" stopColor="black" />
                                      </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {
                                      fill: 'url(#gradient1)'
                                    })}
                                  </svg>
                                )}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].rateQuestion}/5
                              <div className={classes.write}>Rating</div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.summary}>
                          <Typography className={classes.questions}>
                            <span className={classes.questionList}>
                              <a
                                onClick={this.onClick(questionId)}
                                style={{ textDecoration: 'none' }}
                              >
                                <span key={index}>{questions[questionId].question}</span>
                              </a>
                            </span>
                          </Typography>
                          <div className={classes.tagArea}>
                            {questions[questionId].tagId.map((tag) => (
                              <div key={questionId} className={classes.tagIds}>
                                <a style={{ textDecoration: 'none' }}>
                                  <div className={classes.tag}>{tag}</div>
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className={classes.userName}>
                            asked by <b>{questions[questionId].userName}</b>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </TabContainer>
              )}
              {index === 1 && (
                <TabContainer>
                  {questionIds.map((questionId) => {
                    const ratingColor = `${(Number(questions[questionId].rateQuestion) / 5) *
                      100}%`;
                    return (
                      <Grid key={questionId} container className={classes.roots}>
                        <div className={classes.rating}>
                          <div className={classes.userview}>
                            <IconButton>
                              <TouchAppIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.vote}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>vote</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <CreateIcon className={classes.icon.count} color="primary" />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>answers</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <VisibilityIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.view}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].views}
                              <div className={classes.write}>views</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton
                              key={`${(Number(questions[questionId].rateQuestion) / 5) * 100}%`}
                            >
                              <StarBorder
                                component={(svgProps) => (
                                  <svg {...svgProps}>
                                    <defs>
                                      <linearGradient id="gradient1">
                                        <stop offset="0%" stopColor="red" />
                                        <stop offset={ratingColor} stopColor="blue" />
                                        <stop offset="100%" stopColor="black" />
                                      </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {
                                      fill: 'url(#gradient1)'
                                    })}
                                  </svg>
                                )}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].rateQuestion}/5
                              <div className={classes.write}>Rating</div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.summary}>
                          <Typography className={classes.questions}>
                            <span className={classes.questionList}>
                              <a
                                href="www.google.com"
                                target="_blank"
                                style={{ textDecoration: 'none' }}
                              >
                                <span>{questions[questionId].question}</span>
                              </a>
                            </span>
                          </Typography>
                          <div className={classes.tagArea}>
                            {questions[questionId].tagId.map((tag, tagindex) => (
                              <div key={`${tag}${tagindex}`} className={classes.tagIds}>
                                <a
                                  href="www.google.com"
                                  target="_blank"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div className={classes.tag}>{tag}</div>
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className={classes.userName}>
                            asked by <b>{questions[questionId].userName}</b>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </TabContainer>
              )}
              {index === 2 && (
                <TabContainer>
                  {questionIds.map((questionId) => {
                    const ratingColor = `${(Number(questions[questionId].rateQuestion) / 5) *
                      100}%`;
                    return (
                      <Grid key={questionId} container className={classes.roots}>
                        <div className={classes.rating}>
                          <div className={classes.userview}>
                            <IconButton>
                              <TouchAppIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.vote}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>vote</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <CreateIcon className={classes.icon.count} color="primary" />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>answers</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <VisibilityIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.view}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].views}
                              <div className={classes.write}>views</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton
                              key={`${(Number(questions[questionId].rateQuestion) / 5) * 100}%`}
                            >
                              <StarBorder
                                component={(svgProps) => (
                                  <svg {...svgProps}>
                                    <defs>
                                      <linearGradient id="gradient1">
                                        <stop offset="0%" stopColor="red" />
                                        <stop offset={ratingColor} stopColor="blue" />
                                        <stop offset="100%" stopColor="black" />
                                      </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {
                                      fill: 'url(#gradient1)'
                                    })}
                                  </svg>
                                )}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].rateQuestion}/5
                              <div className={classes.write}>Rating</div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.summary}>
                          <Typography className={classes.questions}>
                            <span className={classes.questionList}>
                              <a
                                href="www.google.com"
                                target="_blank"
                                style={{ textDecoration: 'none' }}
                              >
                                <span>{questions[questionId].question}</span>
                              </a>
                            </span>
                          </Typography>
                          <div className={classes.tagArea}>
                            {questions[questionId].tagId.map((tag, tagindex) => (
                              <div key={`${tag}${tagindex}`} className={classes.tagIds}>
                                <a
                                  href="www.google.com"
                                  target="_blank"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div className={classes.tag}>{tag}</div>
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className={classes.userName}>
                            asked by <b>{questions[questionId].userName}</b>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </TabContainer>
              )}
              {index === 3 && (
                <TabContainer>
                  {questionIds.map((questionId) => {
                    const ratingColor = `${(Number(questions[questionId].rateQuestion) / 5) *
                      100}%`;
                    return (
                      <Grid key={questionId} container className={classes.roots}>
                        <div className={classes.rating}>
                          <div className={classes.userview}>
                            <IconButton>
                              <TouchAppIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.vote}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>vote</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <CreateIcon className={classes.icon.count} color="primary" />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>answers</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <VisibilityIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.view}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].views}
                              <div className={classes.write}>views</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton
                              key={`${(Number(questions[questionId].rateQuestion) / 5) * 100}%`}
                            >
                              <StarBorder
                                component={(svgProps) => (
                                  <svg {...svgProps}>
                                    <defs>
                                      <linearGradient id="gradient1">
                                        <stop offset="0%" stopColor="red" />
                                        <stop offset={ratingColor} stopColor="blue" />
                                        <stop offset="100%" stopColor="black" />
                                      </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {
                                      fill: 'url(#gradient1)'
                                    })}
                                  </svg>
                                )}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].rateQuestion}/5
                              <div className={classes.write}>Rating</div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.summary}>
                          <Typography className={classes.questions}>
                            <span className={classes.questionList}>
                              <a
                                href="www.google.com"
                                target="_blank"
                                style={{ textDecoration: 'none' }}
                              >
                                <span>{questions[questionId].question}</span>
                              </a>
                            </span>
                          </Typography>
                          <div className={classes.tagArea}>
                            {questions[questionId].tagId.map((tag, tagindex) => (
                              <div key={`${tag}${tagindex}`} className={classes.tagIds}>
                                <a
                                  href="www.google.com"
                                  target="_blank"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div className={classes.tag}>{tag}</div>
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className={classes.userName}>
                            asked by <b>{questions[questionId].userName}</b>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </TabContainer>
              )}
              {index === 4 && (
                <TabContainer>
                  {questionIds.map((questionId) => {
                    const ratingColor = `${(Number(questions[questionId].rateQuestion) / 5) *
                      100}%`;
                    return (
                      <Grid key={questionId} container className={classes.roots}>
                        <div className={classes.rating}>
                          <div className={classes.userview}>
                            <IconButton>
                              <TouchAppIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.vote}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>vote</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <CreateIcon className={classes.icon.count} color="primary" />
                            </IconButton>
                            <div className={classes.counter}>
                              0<div className={classes.write}>answers</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton>
                              <VisibilityIcon
                                className={classes.icon.count}
                                color="primary"
                                onClick={this.props.view}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].views}
                              <div className={classes.write}>views</div>
                            </div>
                          </div>
                          <div className={classes.userview}>
                            <IconButton
                              key={`${(Number(questions[questionId].rateQuestion) / 5) * 100}%`}
                            >
                              <StarBorder
                                component={(svgProps) => (
                                  <svg {...svgProps}>
                                    <defs>
                                      <linearGradient id="gradient1">
                                        <stop offset="0%" stopColor="red" />
                                        <stop offset={ratingColor} stopColor="blue" />
                                        <stop offset="100%" stopColor="black" />
                                      </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {
                                      fill: 'url(#gradient1)'
                                    })}
                                  </svg>
                                )}
                              />
                            </IconButton>
                            <div className={classes.counter}>
                              {questions[questionId].rateQuestion}/5
                              <div className={classes.write}>Rating</div>
                            </div>
                          </div>
                        </div>
                        <div className={classes.summary}>
                          <Typography className={classes.questions}>
                            <span className={classes.questionList}>
                              <a
                                href="www.google.com"
                                target="_blank"
                                style={{ textDecoration: 'none' }}
                              >
                                <span>{questions[questionId].question}</span>
                              </a>
                            </span>
                          </Typography>
                          <div className={classes.tagArea}>
                            {questions[questionId].tagId.map((tag, tagindex) => (
                              <div key={`${tag}${tagindex}`} className={classes.tagIds}>
                                <a
                                  href="www.google.com"
                                  target="_blank"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <div className={classes.tag}>{tag}</div>
                                </a>
                              </div>
                            ))}
                          </div>
                          <div className={classes.userName}>
                            asked by <b>{questions[questionId].userName}</b>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </TabContainer>
              )}
            </SwipeableViews>
          </div>
          <div className={classes.sidebar}>
            <div className={classes.image}>
              <b>Work From Anywhere</b>
            </div>
            <div className={classes.jobs}>
              Front End Developer [Remote]
              <div>Bitfinex London, LONDON</div>
              <div>$75K - $120K REMOTE</div>
              <span className={classes.tag}>Javascript</span>
              <span className={classes.tag}>React.js</span>
            </div>
            <div className={classes.jobs}>
              Front End Developer [Remote]
              <div>Bitfinex London, UK</div>
              <div>$75K - $120K REMOTE</div>
              <span className={classes.tag}>Javascript</span>
              <span className={classes.tag}>React.js</span>
            </div>
            <div className={classes.jobs}>
              Work remotely - from home or wherever you choose.
              <div>
                <Button variant="contained" color="primary" className={classes.remotejob}>
                  Browse remote jobs
                </Button>
              </div>
            </div>
            <div className={classes.hotSideBar}>
              <div className={classes.image1}>
                <b>Hot Network Questions</b>
              </div>
              <div className={classes.hotquestion}>
                {' '}
                <a href="www.google.com" target="_blank" style={{ textDecoration: 'none' }}>
                  The dynamic within our group has certainly changed: Katich
                </a>
              </div>
              <div className={classes.hotquestion}>
                {' '}
                <a href="www.google.com" target="_blank" style={{ textDecoration: 'none' }}>
                  Need to produce players who can form core of team: Ashwin
                </a>
              </div>
              <div className={classes.hotquestion}>
                {' '}
                <a href="www.google.com" target="_blank" style={{ textDecoration: 'none' }}>
                  KKR exit drop-ships SRH to playoffs; MI seal top spot
                </a>
              </div>
              <div className={classes.hotquestion}>
                {' '}
                <a href="www.google.com" target="_blank" style={{ textDecoration: 'none' }}>
                  Shoulder injury puts Jadhav in doubt for remainder of IPL 2019
                </a>
              </div>
              <div className={classes.hotquestion}>
                {' '}
                <a href="www.google.com" target="_blank" style={{ textDecoration: 'none' }}>
                  Qualification scenarios: Who will be in the final four?
                </a>
              </div>
            </div>
          </div>
        </Paper>
      </MiniDrawer>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions
});

export default connect(
  mapStateToProps,{activeQuestion}  
)(withStyles(styles, { withTheme: true })(BlogPage));
