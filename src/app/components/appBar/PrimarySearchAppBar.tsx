import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Select from 'react-select';
import { searchQuestion } from '../../actions/search';
import { refrenceQuestion, questionInterface } from 'app/reducers/search';
import { questionData } from '../../reducers/question';
import { moveSearchQuestion } from '../../actions/search';
import { userAuth } from '../../reducers/auth';
import { UserModel } from '../../reducers/user';

export namespace PrimarySearchAppBar {
  export interface Props {
    classes?: any;
    appIconClassName?: any;
    buttonClassName?: any;
    onClickMenu?: any;
    user?: UserModel;
    auth?: userAuth;
    moveSearchQuestion?: () => void;
    searchQuestion?: (questionLike, tobeMoved?: boolean) => void;
    search?: refrenceQuestion;
    questions?: questionData;
  }
  export interface State {
    anchorEl: any;
    mobileMoreAnchorEl: any;
    searchValue: any;
    newValue: any;
    error?: any;
  }
}

const styles: any = (theme) => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: '10px'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '58%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    maxWidth: '100%',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 7,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbaar: {
    padding: 0
  },
  menu: {
    height: 'auto'
  },
  login: {
    textTransform: 'none',
    padding: '5px 22px'
  },
  signup: {
    textTransform: 'none',
    backgroundColor: '#0095ff',
    padding: '5px 17px'
  },
  signin: {
    marginLeft: 'auto'
  },
  rootButton: {
    '& > *': {
      margin: '5px'
    }
  }
});

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex'
});

const customStyles = {
  control: (styles) => ({ ...styles, background: 'none', border: 'none' }),
  dropdownIndicator: (styles) => ({
    ...styles,
    display: 'none'
  }),
  input: (styles) => ({ ...styles, ...dot(), color: '#FFFFFF' }),
  placeholder: (styles) => ({ ...styles, ...dot(), top: '47%', width: '98%', color: '#FFFFFF' }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color), color: '#FFFFFF' }),

  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    backgroundColor: '#253858',
    color: '#FFFFFF'
  }),
  valueContainer: (styles) => ({
    ...styles,
    color: '#FFFFFF',
    fontSize: '1.2em',
    width: '100%'
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none'
  }),
  menu: (styles) => ({
    ...styles,
    width: '94%'
  })
};

class PrimarySearchAppBar extends React.Component<
  PrimarySearchAppBar.Props,
  PrimarySearchAppBar.State
> {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      searchValue: '',
      newValue: '',
      error: {}
    };
  }

  onKeyPress = (e) => {
    if (Number(e.which) === 13) {
      this.props.moveSearchQuestion();
    }
  };

  onInputChange = (value) => {
    if (value.length >= 3) {
      this.props.searchQuestion(value);
    }
  };

  onChange = (value) => {
    value && value.question && this.props.searchQuestion(value.question, true);
  };

  searchQuestion() {
    const { questions } = this.props.search;
    return questions.map((question: questionInterface) => ({
      ...question,
      value: question.question,
      label: question.question
    }));
  }

  handleInputChange = (newValue) => {
    this.setState({ searchValue: newValue });
    return newValue;
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        className={classes.menu}
      >
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <a href="http://localhost:1729/logout" style={{ textDecoration: 'none' }}>
            Logout
          </a>
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <HelpIcon />
          </IconButton>
          <p>Help</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const renderContent = () => {
      switch (this.props.auth.token) {
        case null:
          return <></>;
        case '':
          return (
            <div className={classes.rootButton}>
              <Button variant="outlined" color="inherit" className={classes.login}>
                <a
                  href="http://localhost:1729/login"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Login
                </a>
              </Button>
              <Button variant="outlined" color="inherit" className={classes.signup}>
                <a
                  href="http://localhost:1729/signup"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Sign Up
                </a>
              </Button>
            </div>
          );
        default:
          return (
            <>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge badgeContent={14} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={27} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={2} color="secondary">
                    <HelpIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
              {renderMenu}
              {renderMobileMenu}
            </>
          );
      }
    };

    return (
      <div>
        <AppBar position="fixed" className={this.props.appIconClassName}>
          <Toolbar className={classes.toolbaar}>
            <IconButton
              className={this.props.buttonClassName}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.onClickMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <i>
                Truth{' '}
                <b>
                  <u>OR</u>
                </b>{' '}
                Truth{' '}
              </i>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <div className={classes.inputRoot}>
                <Select
                  className={classes.inputInput}
                  classNamePrefix="select"
                  placeholder="Search..."
                  isClearable={true}
                  isSearchable={true}
                  onInputChange={this.onInputChange}
                  onKeyDown={this.onKeyPress}
                  name="color"
                  styles={customStyles}
                  options={this.searchQuestion()}
                  value=""
                  onChange={this.onChange}
                  noOptionsMessage={() => 'please enter minimum 3 letter....'}
                />
              </div>
            </div>

            <a href={this.props.auth.token ? '/blogpage' : '/'} />
            <div className={classes.signin}>{renderContent()}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  refrenceData: state.refrenceData,
  auth: state.auth,
  question: state.question,
  search: state.search
});

const mapDispathFromProps = (dispatch) => ({
  searchQuestion: (questionLike, tobeMoved?: boolean) =>
    dispatch(searchQuestion(questionLike, tobeMoved)),
  moveSearchQuestion: () => dispatch(moveSearchQuestion())
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(PrimarySearchAppBar));
