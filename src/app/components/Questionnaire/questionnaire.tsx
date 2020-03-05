import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import MiniDrawer from '../miniDrawer/MiniDrawer';
import EditorBox from '../TextEditor/EditorBox';
import { connect } from 'react-redux';
import { question } from 'app/actions/questionAction';
import { activeQuestionInterface } from '../../reducers/activeQuestion';
import { questionData } from '../../reducers/question';
import { comment, commentOfComment, getComment } from '../../actions/EditorBox';
import { EditorModel } from '../../reducers/EditorBox';
import * as moment from 'moment';
import { activeQuestion } from 'app/actions/activeQuestion';
import { activeComment } from '../../actions/activeComment';
import { textChanged } from '../../actions/user';

export namespace Questionnaire {
  export interface Props {
    classes?: any;
    theme?: any;
    vote?: () => {};
    view?: () => {};
    activeQuestionId?: string;
    activeCommentId?: string;
    questions?: questionData;
    comments?: EditorModel;
    question?: string;
    editorValue?: any;
    value?: any;
    EditorBox?: any;
    getComment?: any;
    comment?: (editorBox, uuidComment) => void;
    onChange?: (value) => void;
    activeComment: (activeCommentId) => void;
    commentId?: () => {};
    commentOfComment?: (value, uuidComment) => void;
  }
  export interface State {
    editorValue: any;
    value: any;
  }
}

const styles: any = (theme) => ({
  questionHeader: {
    marginTop: '10px',
    borderBottom: '1px solid grey',
    marginBottom: '20px'
  },

  questionHeaderm: {
    marginTop: '10px',
    marginBottom: '12px'
  },

  '@global': {
    body: {
      color: '',
      fontFamily: [
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        '"Apple color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      padding: '70px 20px'
    },
    '.MuiTypography-h5-97': {
      marginBottom: '10px',
      marginLeft: '5px'
    },
    '.rdw-editor-toolbar': {
      display: 'inline-flex'
    },
    a: {
      textDecoration: 'none'
    }
  },
  maincontainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  container1: {
    display: 'block',
    marginTop: '10px',
    padding: '10px',
    width: '70%',
    float: 'left'
  },
  mainBar: {
    marginLeft: 50,
    fontSize: '22px'
  },
  sideBar: {
    width: '65px',
    float: 'left',
    textAlign: 'center'
  },
  side: {
    textAlign: 'center'
  },
  button: {
    fontSize: 45,
    marginLeft: -2
  },
  askQuestion: {
    marginBottom: '18px',
    float: 'right'
  },
  subBar: {
    padding: '5px',
    marginLeft: 60,
    marginTop: '4px'
  },
  subCode: {
    border: '2px solid black',
    padding: '10px',
    marginLeft: 65,
    marginTop: '10px',
    backgroundColor: '#E1ECF4'
  },
  comment: {
    padding: '8px',
    marginLeft: '10px',
    marginRight: '7px',
    marginTop: '5px'
  },
  subcoder: {
    margin: '10px'
  },

  tagArea: {
    width: 'auto',
    padding: 0,
    margin: 0,
    marginLeft: '60px',
    overflow: 'hidden'
  },
  tag: {
    textAlign: 'center',
    position: 'relative',
    color: '#39739d',
    backgroundColor: '#E1ECF4',
    padding: '.4em .5em',
    margin: '9px 16px 10px 0px',
    fontSize: '12px',
    lineHeight: '1',
    display: 'inline-block',
    borderRadius: '3px',
    border: '1px solid #E1ECF4',
    cursor: 'pointer'
  },
  container2: {
    float: 'left',
    width: '20%',
    marginRight: '50px',
    marginTop: '70px',
    padding: '15px 15px 10px',
    backgroundColor: '#FFF8DC',
    border: '1px solid #E0DCBF',
    borderRadius: '3px',
    boxShadow: '0 2px 8px rgba(59,64,69,0.1)',
    marginBottom: '10px',
    position: 'relative',
    marginLeft: '40px'
  },
  bulletin: {
    fontSize: '17px',
    lineHeight: '1.1',
    marginBottom: '1.0em',
    color: '#07C',
    cursor: 'pointer',
    fontWeight: 'normal'
  },
  bulletin1: {
    fontWeight: 'bold',
    fontSize: '17px',
    color: '#9C988B',
    textTransform: 'uppercase',
    marginTop: '5px'
  },
  userName: {
    float: 'right',
    width: 'auto',
    fontSize: '13px',
    fontFamily: 'cursive',
    marginRight: '8px'
  },

  post: {
    marginTop: '11px',
    marginRight: '40px',
    padding: '4px',
    marginLeft: '8px'
  },

  reply: {
    marginTop: '11px'
  },
  commentAsHTML: {
    border: '2px solid black',
    marginTop: '30px'
  }
});

class Questionnaire extends React.Component<Questionnaire.Props, Questionnaire.State> {
  constructor(props) {
    super(props);
    this.state = {
      editorValue: EditorState.createEmpty(),
      value: EditorState.createEmpty()
    };
  }

  handleChangeOfEditor = (value) => {
    this.setState({ editorValue: value });
    return value;
  };

  handleChange = (value) => {
    this.setState({ value: value });
    return value;
    
  };

  // onInputChange = (fieldName) => (e) => {
  //   const value = e.target ? e.target.value : e;
  //   this.props.textChanged(fieldName, value);
  // }

  defaultValue = () => {
    this.setState({
      editorValue: EditorState.createEmpty()
    });
  };

  handleComment = () => {
    const { comment, activeQuestionId } = this.props;
    const { editorValue } = this.state;
    comment(editorValue, activeQuestionId);
    this.setState({editorValue: EditorState.createEmpty()})
  };

  replyComment = () => {
    const { commentOfComment, activeCommentId } = this.props;
    const { value } = this.state;
    commentOfComment(value, activeCommentId);
    this.setState({value: EditorState.createEmpty()})
  };

  setActiveQuestionId = (activeCommentId) => () => {
    this.props.activeComment(activeCommentId);
  };

  requestedCommentId = {};

  renderComment = (ids) => {
    const { classes, activeCommentId, getComment } = this.props;
    ids.forEach((element) => {
      if (!this.props.comments[element] && !this.requestedCommentId[element] && element) {
        getComment(element);
        this.requestedCommentId[element] = element;
      }
    });
    return (
      <div>
        {ids.map((commentId) => {
          return this.props.comments[commentId] ? (
            <>
              <div className={classes.comment}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.comments[commentId].commentAsHTML
                  }}
                />
                {this.props.comments[commentId].subcommentId &&
                  this.renderComment(this.props.comments[commentId].subcommentId)}
              </div>

              {/* {this.props.comments[commentId].subcommentId &&
                  this.renderComment(this.props.comments[commentId].subcommentId)}  */}

              <div className={classes.tagArea}>
                <span color="primary">
                  <div className={classes.tag}>{this.props.comments[commentId].tagId} </div>
                </span>
              </div>
              <div className={classes.userName}>
                asked by{' '}
                <strong>
                  {this.props.comments[commentId].userName}{' '}
                  {moment(Number(this.props.comments[commentId].activeTime)).format(
                    'DD-MMM-YYYY hh-mm-ss a'
                  )}{' '}
                </strong>
              </div>
              <div>
                {activeCommentId === commentId ? (
                  <>
                    {' '}
                    <EditorBox editorValue={this.state.value} onChange={this.handleChange} />
                    <Button
                      onClick={this.replyComment}
                      variant="contained"
                      className={classes.reply}
                    >
                      Submit
                    </Button>{' '}
                  </>
                ) : (
                  <Button
                    onClick={this.setActiveQuestionId(commentId)}
                    variant="contained"
                    className={classes.reply}
                  >
                    Reply
                  </Button>
                )}
              </div>
            </>
          ) : (
            ''
          );
        })}
      </div>
    );
  };

  render() {
    const { classes, activeQuestionId, activeCommentId, questions, comment } = this.props;
    const question = questions[activeQuestionId];
    const comments = comment[activeCommentId];

    const commentIds = Object.keys(comment);
    commentIds.map((activeCommentId) => {
      return comment[activeCommentId];
    });
    return (
      <MiniDrawer>
        
        <div className={classes.maincontainer}>
          <div className={classes.container1}>
            <div className={classes.questionHeader}>
              <Typography variant="h5" className={classes.questionHeaderm}>
                here write title of related question
                <Button variant="contained" color="primary" className={classes.askQuestion}>
                  Ask Question
                </Button>
              </Typography>
            </div>

            <div className={classes.sideBar}>
              <IconButton color="primary" aria-label="ArrowDropUp">
                <ArrowDropUp className={classes.button} />
              </IconButton>
              <div className={classes.side}>{question.views}</div>
              <IconButton color="secondary" aria-label="ArrowDropDown">
                <ArrowDropDown className={classes.button} />
              </IconButton>
              <IconButton color="secondary" aria-label="StarBorder">
                <StarBorder />
              </IconButton>
            </div>
            <div>
              <Typography className={classes.mainBar}>
                <span>
                  <strong>{question.question}</strong>
                </span>
              </Typography>
            </div>
            <div className={classes.subBar}>Here is code :</div>
            <div className={classes.subCode}>
              wherrtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              wdddtyyddfffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            </div>
            <div className={classes.tagArea}>
              <span color="primary">
                {question.tagId.map((tag) => (
                  <div className={classes.tag}>{tag}</div>
                ))}
              </span>
            </div>
            <div className={classes.userName}>
              asked by <strong>{question.userName}</strong>
            </div>

            <div className={classes.commentAsHTML}>
              <div className={classes.comment}>
                comments
                {!!question.commentId && this.renderComment(question.commentId)}
              </div>
            </div>

            <EditorBox editorValue={this.state.editorValue} onChange={this.handleChangeOfEditor} />
            <Button
              onClick={this.handleComment}
              variant="contained"
              color="primary"
              className={classes.post}
            >
              Post
            </Button>
            <Button variant="contained" className={classes.post}>
              Cancel
            </Button>
          </div>

          <div className={classes.container2}>
            <div className={classes.bulletin1}>
              <span> BLOG </span>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                Responsive Design Themes - What can sites customize and how can they get…{' '}
              </a>
            </div>
            <div className={classes.bulletin1}>
              <span>FEATURED ON META </span>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                Help us improve the user profile and settings
              </a>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                The Ask Question Wizard Is Now In Testing!
              </a>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                Should we burninate the [music] tag?
              </a>
            </div>
            <div className={classes.bulletin1}>
              <span>HOT META POST</span>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                Job location overlaps with “within x km” for some queries
              </a>
            </div>
            <div className={classes.bulletin}>
              <a href="https://stackoverflow.com" target="_blank">
                Animated external ad in SO homepage{' '}
              </a>
            </div>
          </div>
        </div>
      </MiniDrawer>
    );
  }
}

const mapStateToProps = ({
  activeQuestion: { activeQuestionId },
  activeComment: { activeCommentId },
  questions,
  comments,
  saveSubcomment
}) => ({
  activeQuestionId,
  activeCommentId,
  questions,
  comments,
  saveSubcomment
});

export default connect(
  mapStateToProps,
  { comment, activeComment, commentOfComment, getComment }
)(withStyles(styles, { withTheme: true })(Questionnaire));
