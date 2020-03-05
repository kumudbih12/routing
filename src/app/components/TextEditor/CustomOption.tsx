import * as React from 'react';
import { EditorState, Modifier } from 'draft-js';
import { withStyles } from '@material-ui/core/styles';

export namespace CustomOption {
  export interface Props {
    onChange?: (val) => void;
    editorState?: any;
    classes?: any;
  }
  export interface State {}
}

const styles: any = (theme) => ({
  star: {
    marginTop: '5px'
  }
});

class CustomOption extends React.Component<CustomOption.Props, CustomOption.State> {
  addStar = (): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle()
    );
    this.props.onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.star} onClick={this.addStar}>
        ⭐
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(CustomOption);
