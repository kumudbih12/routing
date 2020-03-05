import * as React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CreatableSelect from 'react-select/lib/Creatable';
import draftToHtml from 'draftjs-to-html';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MiniDrawer from 'app/components/miniDrawer/MiniDrawer';
import EditorBox from '../TextEditor/EditorBox';

import { getAllTagList, saveNewTag } from '../../actions/questionAction';
import { saveQuestion } from '../../actions/questionAction';
import { RefrenceData, tagInterface } from 'app/reducers/refrenceData';
import { connect } from 'react-redux';
import { FormHelperText, FormControl } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

export namespace QuestionPage {
  export interface Props {
    classes: any;
    saveQuestion: (tagId, comment, question) => void;
    getAllTagList?: () => void;
    saveNewTag?: (newValue) => void;
    refrenceData?: RefrenceData;
  }
  export interface State {
    titleValue: any;
    tagValue: any;
    editorValue: any;
    error?: boolean;
  }
}

const styles: any = (theme) => ({
  container: {
    width: 'calc(100% - 365px - 24px)',
    marginTop: '80px',
    maxWidth: '650px',
    marginLeft: 'auto',
    marginRight: 'auto',
    font: 'inherit',
    fontSize: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ]
  },
  askQuestion: {
    marginBottom: '24px',
    lineHeight: '1.3',
    marginTop: '10px',
    width: '100%',
    fontFamily: 'Colfax,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#546b81',
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
    marginTop: '30px'
  },
  field: {
    padding: '3px 8px',
    color: '#0C0D0E',
    fontFamily: 'inherit',
    fontSize: '1.15384615rem',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: 20,
    width: '100%'
  },
  '@global': {
    '.MuiOutlinedInput-input-231': {
      padding: '11px'
    },
    '.MuiOutlinedInput-input-208': {
      padding: '12px 14px'
    },
    '.EditorBox-container-235': {
      padding: 10
    },
    '.MuiFormControl-marginNormal-184': {
      marginTop: '7px'
    }
  },
  footer: {
    width: '100% !important',
    height: '100px !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3E4551',
    color: 'white',
    fontSize: '18px',
    fontWeight: 300,
    marginTop: '20px',
    bottom: 0
  },
  wrapper: {
    width: '100%'
  },
  errorText: {
    color: 'red',
    padding: '4px 4px 4px 4px',
    fontSize: '14px'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: lightBlue
  },
  typography: { useNextVariants: true }
});

class QuestionPage extends React.Component<QuestionPage.Props, QuestionPage.State> {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      tagValue: '',
      editorValue: EditorState.createEmpty(),
      error: false
    };
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  componentDidMount() {
    const { getAllTagList } = this.props;
    getAllTagList();
  }

  handleInputTitleChange = (e) => {
    this.setState({ titleValue: e.target.value });
  };

  handleChangeOfEditor = (value) => {
    this.setState({ editorValue: value });
    return value;
  };

  handleInputTagChange = (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      const newOptions = newValue.filter((val) => val.__isNew__);
      const newOption = newOptions[newOptions.length - 1].value;
      if (/^[a-zA-Z 0-9]{3,100}$/.test(newOption)) {
        this.state.error && this.setState({ error: false });
        this.setState({ tagValue: newValue });
        this.props.saveNewTag(newOption);
      } else {
        !this.state.error && this.setState({ error: true });
      }
    } else {
      this.setState({ tagValue: newValue });
      this.state.error && this.setState({ error: false });
    }
    return newValue;
  };

  defaultValue = () => {
    this.setState({
      titleValue: '',
      tagValue: '',
      editorValue: EditorState.createEmpty()
    });
  };

  createTag() {
    const { tags } = this.props.refrenceData;
    return tags.map((tag: tagInterface) => ({
      ...tag,
      value: tag.tagName,
      label: tag.tagName
    }));
  }

  submitQuestion() {
    const { tagValue, editorValue, titleValue } = this.state;
    const { saveQuestion } = this.props;
    saveQuestion(
      tagValue.map((value) => value.value),
      draftToHtml(convertToRaw(editorValue.getCurrentContent())),
      titleValue
    );
  }

  render() {
    const { classes } = this.props;
    const { titleValue, tagValue, editorValue } = this.state;
    const enabled = (titleValue.length > 0 || editorValue.length > 0) && tagValue.length > 0;

    return (
      <MiniDrawer>
        <div className={classes.wrapper}>
          <Paper className={classes.container}>
            <div className={classes.askQuestion}>
              <h1>Ask a question</h1>
            </div>
            <div className={classes.field}>Title</div>
            <MuiThemeProvider theme={theme}>
              <TextField
                id="outlined-bare"
                className={classes.textField}
                placeholder="inter your question title..."
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.titleValue}
                onChange={this.handleInputTitleChange}
              />
            </MuiThemeProvider>
            <div className={classes.field}>Body</div>
            <EditorBox editorValue={this.state.editorValue} onChange={this.handleChangeOfEditor} />
            <div className={classes.field}>Tags</div>
            <FormControl
              className={classes.formControl}
              error={false}
              aria-describedby="component-error-text"
            >
              <CreatableSelect
                isMulti
                cacheOptions
                defaultOptions
                value={this.state.tagValue}
                onChange={this.handleInputTagChange}
                options={this.createTag()}
                isRequired={true}
              />
              {this.state.error && (
                <FormHelperText className={classes.errorText}>
                  **only alphanumeric value**
                </FormHelperText>
              )}
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submitQuestion}
            >
              Post Your Question
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={this.defaultValue}
              disabled={!enabled}
            >
              Discard
            </Button>
          </Paper>
          <span className={classes.footer}>
            <p>Made with ❤ by team HVL</p>
          </span>
        </div>
      </MiniDrawer>
    );
  }
}

const mapStateToProps = ({ refrenceData }) => ({
  refrenceData
});

const mapDispathFromProps = (dispatch) => ({
  getAllTagList: () => dispatch(getAllTagList()),
  saveNewTag: (tag) => dispatch(saveNewTag(tag)),
  saveQuestion: (tagId, comment, question) => dispatch(saveQuestion(tagId, comment, question))
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(QuestionPage));
