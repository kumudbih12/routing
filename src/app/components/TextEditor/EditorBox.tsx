import * as React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomOption from './CustomOption';
import { ColorPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import ColorPic from './colorPic';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { comment, editorBox } from '../../actions/EditorBox';
import { EditorModel } from '../../reducers/EditorBox';

export namespace EditorBox {
  export interface Props {
    classes?: any;
    theme?: any;
    style?: any;
    uploadImageCallBack?: any;
    ColorPic?: any;
    onChange?: (value) => void;
    comment?: (editorBox, uuidComment) => void;
    getAllComments?: () => {};
    editorValue?: any;
    EditorModel?: Array<EditorModel>;
    activeQuestionId?: string;
    activeCommentId?: string;
  }

  export interface State {}
}

const styles: any = (theme) => ({
  container: {
    width: '100%',
    padding: '8px'
  },
  '@global': {
    '.rdw-option-active': {
      border: '1px solid gray'
    },
    '.rdw-option-wrapper': {
      borderRadius: '50%',
      backgroundColor: ''
    },
    '.demo-editor.rdw-editor-main': {
      height: '200px',
      border: '1px solid #F1f1f1',
      padding: '5px'
    },
    '.rdw-editor-toolbar': {
      backgroundColor: '#ECEFF1'
    }
  },
  post: {
    marginTop: '11px',
    marginRight: '40px',
    padding: '4px'
  }
});

class EditorBox extends React.Component<EditorBox.Props, EditorBox.State> {
  onEditorStateChange: Function = (editorState) => {
    this.props.onChange(editorState);
  };

  handleComment = () => {
    const { comment, editorValue, activeQuestionId } = this.props;
    comment(editorValue, activeQuestionId);
  };

  render() {
    const { theme, classes, editorValue: editorState } = this.props;
    return (
      <div className={classes.container}>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          colorPicker={this.props.ColorPic}
          toolbarCustomButtons={[<CustomOption />]}
          placeholder="Begin typing..."
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history'
            ],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'monospace',
                'superscript',
                'subscript'
              ]
            },
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            },
            fontFamily: {
              options: [
                'Arial',
                'Georgia',
                'Impact',
                'Tahoma',
                'Times New Roman',
                'Verdana',
                'cursive'
              ],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered', 'ordered', 'indent', 'outdent']
            },
            textAlign: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['left', 'center', 'right', 'justify']
            },
            colorPicker: {
              className: classes.color,
              component: ColorPic,
              popupClassName: undefined,
              colors: [
                'rgb(97,189,109)',
                'rgb(26,188,156)',
                'rgb(84,172,210)',
                'rgb(44,130,201)',
                'rgb(147,101,184)',
                'rgb(71,85,119)',
                'rgb(204,204,204)',
                'rgb(65,168,95)',
                'rgb(0,168,133)',
                'rgb(61,142,185)',
                'rgb(41,105,176)',
                'rgb(85,57,130)',
                'rgb(40,50,78)',
                'rgb(0,0,0)',
                'rgb(247,218,100)',
                'rgb(251,160,38)',
                'rgb(235,107,86)',
                'rgb(226,80,65)',
                'rgb(163,143,132)',
                'rgb(239,239,239)',
                'rgb(255,255,255)',
                'rgb(250,197,28)',
                'rgb(243,121,52)',
                'rgb(209,72,65)',
                'rgb(184,49,47)',
                'rgb(124,112,107)',
                'rgb(209,213,216)'
              ]
            },
            link: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              dropdownClassName: undefined,
              showOpenOptionOnHover: true,
              defaultTargetOption: '_self',
              options: ['link', 'unlink']
            },
            emoji: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              emojis: [
                '😀',
                '😁',
                '😂',
                '😃',
                '😉',
                '😋',
                '😎',
                '😍',
                '😗',
                '🤗',
                '🤔',
                '😣',
                '😫',
                '😴',
                '😌',
                '🤓',
                '😛',
                '😜',
                '😠',
                '😇',
                '😷',
                '😈',
                '👻',
                '😺',
                '😸',
                '😹',
                '😻',
                '😼',
                '😽',
                '🙀',
                '🙈',
                '🙉',
                '🙊',
                '👼',
                '👮',
                '🕵',
                '💂',
                '👳',
                '🎅',
                '👸',
                '👰',
                '👲',
                '🙍',
                '🙇',
                '🚶',
                '🏃',
                '💃',
                '⛷',
                '🏂',
                '🏌',
                '🏄',
                '🚣',
                '🏊',
                '⛹',
                '🏋',
                '🚴',
                '👫',
                '💪',
                '👈',
                '👉',
                '👉',
                '👆',
                '🖕',
                '👇',
                '🖖',
                '🤘',
                '🖐',
                '👌',
                '👍',
                '👎',
                '✊',
                '👊',
                '👏',
                '🙌',
                '🙏',
                '🐵',
                '🐶',
                '🐇',
                '🐥',
                '🐸',
                '🐌',
                '🐛',
                '🐜',
                '🐝',
                '🍉',
                '🍄',
                '🍔',
                '🍤',
                '🍨',
                '🍪',
                '🎂',
                '🍰',
                '🍾',
                '🍷',
                '🍸',
                '🍺',
                '🌍',
                '🚑',
                '⏰',
                '🌙',
                '🌝',
                '🌞',
                '⭐',
                '🌟',
                '🌠',
                '🌨',
                '🌩',
                '⛄',
                '🔥',
                '🎄',
                '🎈',
                '🎉',
                '🎊',
                '🎁',
                '🎗',
                '🏀',
                '🏈',
                '🎲',
                '🔇',
                '🔈',
                '📣',
                '🔔',
                '🎵',
                '🎷',
                '💰',
                '🖊',
                '📅',
                '✅',
                '❎',
                '💯'
              ]
            },
            embedded: {
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              defaultSize: {
                height: 'auto',
                width: 'auto'
              }
            },
            image: {
              uploadCallback: () => {
                return new Promise((resolve, reject) => {
                  resolve(
                    '{"data":{"id":"TWK7cbk","title":null,"description":null,"datetime":1545142928,"type":"image/gif","animated":false,"width":395,"height":200,"size":7364,"views":0,"bandwidth":0,"vote":null,"favorite":false,"nsfw":null,"section":null,"account_url":null,"account_id":0,"is_ad":false,"in_most_viral":false,"has_sound":false,"tags":[],"ad_type":0,"ad_url":"","in_gallery":false,"deletehash":"3PiZ9Jyo53334ii","name":"","link":"https://i.imgur.com/TWK7cbk.gif"},"success":true,"status":200}'
                  );
                });
              },
              alt: { present: true, mandatory: true }
            },
            remove: { className: undefined, component: undefined },
            history: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['undo', 'redo'],
              undo: { className: undefined },
              redo: { className: undefined }
            }
          }}
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' }
            ]
          }}
          hashtag={{
            separator: ' ',
            trigger: '#'
          }}
        />
        
      </div>
    );
  }
}

const mapStateToProps = ({ activeQuestion: { activeQuestionId }, uuidComment }) => ({
  activeQuestionId,
  uuidComment
});

export default connect(
  mapStateToProps,
  { comment }
)(withStyles(styles, { withTheme: true })(EditorBox));
