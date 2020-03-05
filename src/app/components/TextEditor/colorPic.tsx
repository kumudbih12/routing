import * as React from 'react';
import { BlockPicker } from 'react-color';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ColorLens from '@material-ui/icons/ColorLens';
import { withStyles } from '@material-ui/core/styles';

export namespace ColorPic {
  export interface Props {
    classes?: any;
    onChange?: any;
    currentState?: any;
    expanded?: any;
    onExpandEvent?: any;
  }
  export interface State {}
}

const styles: any = (theme) => ({
  position: {
    position: 'relative'
  },
  stopPropagation: {
    position: 'absolute',
    transform: 'translate(-35%,0)'
  }
});
class ColorPic extends React.Component<ColorPic.Props, ColorPic.State> {
  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  };

  renderModal = () => {
    const { color } = this.props.currentState;
    const { classes } = this.props;
    return (
      <div className={classes.stopPropagation} onClick={this.stopPropagation}>
        <BlockPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };
  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        className={this.props.classes.position}
      >
        <div onClick={onExpandEvent}>
          <IconButton aria-label="colorPicker">
            <ColorLens />
          </IconButton>
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ColorPic);
