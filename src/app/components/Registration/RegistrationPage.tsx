import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import {
  textChanged,
  getAllCountryList,
  getAllStatelist,
  getAllCitylist
} from '../../actions/user';
import { UserModel } from 'app/reducers/user';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { USER_SCHEMA } from '../../models/scema/UserSchema';
import Select from 'react-select';
import {
  RefrenceData,
  countryInterface,
  stateInterface,
  cityInterface
} from 'app/reducers/refrenceData';
import { saveUserDetails } from '../../actions/securityQuestion';
import { securityQuestionsInterface } from '../../reducers/securityQuestion';
import { history } from '../../../main';
import clsx from 'clsx';

export namespace Registration {
  export interface Props {
    classes?: any;
    user?: UserModel;
    securityQuestions?: Array<securityQuestionsInterface>;
    textChanged?: (key, value) => void;
    getAllCountryList?: () => void;
    getAllStatelist?: (value) => void;
    getAllCitylist?: (countryCode, value) => void;
    saveUserDetails: ({
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      gender,
      dateOfBirth,
      city,
      state,
      country,
      zip,
      phoneNo
    }) => void;
    refrenceData?: RefrenceData;
  }
  export interface State {
    showPassword?: any;
    error?: any;
  }
}
const styles: any = (theme) => ({
  container: {
    maxWidth: '500px',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    margin: '0 auto',
    background: 'white'
  },
  submit: {
    marginTop: '45px',
    background: 'rgba(0, 0, 0, 0.54)'
  },
  contPadding: {
    padding: '35px',
    width: 'auto',
    paddingRight: '-20px'
  },
  textField: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,

    width: '100%'
  },
  group: {
    display: 'flex',
    flexwrap: 'wrap',
    flexDirection: 'row'
  },
  padding: {
    padding: '-12px'
  },
  heading: {
    fontFamily: 'Colfax,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#546b81',
    textAlign: 'center'
  },

  '@global': {
    body: {
      fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
    }
  },
  errorText: {
    color: "#86181d",
    backgroundColor: '#ffdce0',
    fontSize: '14px',
    margin: '10px 0',
    padding: '10px',
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: '3px 3px 3px 3px',
    textAlign: 'center'
  },
  root: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3'
    }
  }
});

class Registration extends React.Component<Registration.Props, Registration.State> {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: null,
      error: {}
    };
  }

  componentDidMount() {
    const { getAllCountryList } = this.props;
    getAllCountryList();
  }

  createCountry() {
    const { countries } = this.props.refrenceData;
    return countries.map((country: countryInterface) => ({
      ...country,
      value: country.countryCode,
      label: country.countryName
    }));
  }

  createState() {
    const { states } = this.props.refrenceData;
    return states.map((state: stateInterface) => ({
      ...state,
      value: state.stateCode,
      label: state.stateName
    }));
  }

  createCity() {
    const { cities } = this.props.refrenceData;
    return cities.map((city: cityInterface) => ({
      ...city,
      value: city.cityCode,
      label: city.cityName
    }));
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  onInputChange = (fieldName) => (e) => {
    const value = e.target ? e.target.value : e;
    this.props.textChanged(fieldName, value);
    if (fieldName === 'country') {
      this.props.getAllStatelist(value.value);
    }
    if (fieldName === 'state') {
      this.props.getAllCitylist(this.props.user.country.countryCode, value.value);
    }
    this.setState({
      error: {
        ...this.state.error,
        [fieldName]: USER_SCHEMA(this.props.user.password)[fieldName].regex.test(value)
          ? false
          : true
      }
    });
  };

  blurHandler = (fieldName) => (e) => {
    const value = e.target ? e.target.value : e;
    const userSchema = USER_SCHEMA(this.props.user.password);
    if (
      (userSchema[fieldName].isRequired && value) ||
      (userSchema[fieldName].regex && userSchema[fieldName].regex.test(value))
    ) {
      this.props.textChanged(fieldName, value);
      if (fieldName === 'country') {
        this.props.getAllStatelist(value.value);
      }
      if (fieldName === 'state') {
        this.props.getAllCitylist(this.props.user.country.countryCode, value.value);
      }
      this.setState((state) => ({ error: { ...state.error, [fieldName]: false } }));
    } else {
      !this.state.error[fieldName] &&
        this.setState((state) => ({ error: { ...state.error, [fieldName]: true } }));
    }
  };

  StyledRadio = (props) => {
    const { classes } = this.props;
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  };

  handleSubmit = () => {
    event.preventDefault();
    const keysOfField = Object.keys(this.state.error);
    if (!keysOfField.every((key) => !this.state.error[key]) || keysOfField.length !== 11) {
      const requiredFields = [
        'firstName',
        'lastName',
        'addressLine1',
        'addressLine2',
        'gender',
        'dateOfBirth',
        'country',
        'state',
        'city',
        'zip',
        'phoneNo'
      ];
      requiredFields.forEach((name) => {
        this.blurHandler(name)({
          target: {
            value: this.props.user[name]
          }
        });
      });
    } else {
      const {
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        gender,
        dateOfBirth,
        country,
        state,
        city,
        zip,
        phoneNo
      } = this.props.user;
      this.props.saveUserDetails({
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        gender,
        dateOfBirth,
        country: country.value,
        state: state.value,
        city: city.value,
        zip,
        phoneNo
      });
      if (this.props.securityQuestions.some((question) => !!question.userAnswer)) {
        history.push('./userPreview');
      } else {
        history.push('./securityQuestion');
      }
    }
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      gender,
      dateOfBirth,
      country,
      state,
      city,
      zip,
      phoneNo
    } = this.props.user;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={classes.container}>
          <div className={classes.contPadding}>
            <div className={classes.heading}>
              <h2>Registration Form</h2>
            </div>
            <div className={classes.padding}>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.error['firstName']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">First Name</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('firstName')}
                      onBlur={this.blurHandler('firstName')}
                      value={firstName}
                      required
                    />
                    {this.state.error['firstName'] && (
                      <FormHelperText className={classes.errorText}>
                        contains letter only
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.error['lastName']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">Last Name</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('lastName')}
                      onBlur={this.blurHandler('lastName')}
                      value={lastName}
                      required
                    />
                    {this.state.error['lastName'] && (
                      <FormHelperText className={classes.errorText}>
                        contains letter only
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.error['addressLine1']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">Address Line 1</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('addressLine1')}
                      onBlur={this.blurHandler('addressLine1')}
                      value={addressLine1}
                      required
                    />
                    {this.state.error['addressLine1'] && (
                      <FormHelperText className={classes.errorText}>
                        please enter correct Address
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.error['addressLine2']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">Address Line 2</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('addressLine2')}
                      onBlur={this.blurHandler('addressLine2')}
                      value={addressLine2}
                      required
                    />
                    {this.state.error['addressLine2'] && (
                      <FormHelperText className={classes.errorText}>
                        please enter correct Address
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FormControl
                    component="fieldset"
                    required
                    className={classes.formControl}
                    error={this.state.error['gender']}
                    aria-describedby="component-error-text"
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      className={classes.group}
                      value={gender}
                      onBlur={this.blurHandler('gender')}
                      onChange={this.onInputChange('gender')}
                    >
                      <FormControlLabel value="male" control={<this.StyledRadio />} label="Male" />
                      <FormControlLabel
                        value="female"
                        control={<this.StyledRadio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<this.StyledRadio />}
                        label="Other"
                      />
                    </RadioGroup>
                    {this.state.error['gender'] && (
                      <FormHelperText className={classes.errorText}>
                        please select gender
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.error['dateOfBirth']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel shrink htmlFor="component-error">
                      Date Of Birth
                    </InputLabel>
                    <Input
                      id="date-picker"
                      type="date"
                      onChange={this.onInputChange('dateOfBirth')}
                      onBlur={this.blurHandler('dateOfBirth')}
                      value={dateOfBirth}
                      required
                    />
                    {this.state.error['dateOfBirth'] && (
                      <FormHelperText className={classes.errorText}>
                        please enter your DOB
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    className={classes.formControl}
                    error={false}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="country-native-helper">Country</InputLabel>
                    <Select
                      type="Reset"
                      value={country}
                      options={this.createCountry()}
                      onChange={this.onInputChange('country')}
                      placeholder="Select Country"
                      required
                    />
                    {this.state.error['country'] && (
                      <FormHelperText className={classes.errorText}>
                        select your country
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={false}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="state-native-helper">State</InputLabel>
                    <Select
                      value={state}
                      options={this.createState()}
                      onChange={this.onInputChange('state')}
                      placeholder="Select State"
                      required
                    />
                    {this.state.error['state'] && (
                      <FormHelperText className={classes.errorText}>
                        select your state
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={false}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="city-native-helper">City</InputLabel>
                    <Select
                      value={city}
                      options={this.createCity()}
                      onChange={this.onInputChange('city')}
                      placeholder="Select City"
                      required
                    />
                    {this.state.error['city'] && (
                      <FormHelperText className={classes.errorText}>
                        select your city
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.error['zip']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">Zip/Postal Code</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('zip')}
                      onBlur={this.blurHandler('zip')}
                      fullWidth
                      value={zip}
                      required
                    />
                    {this.state.error['zip'] && (
                      <FormHelperText className={classes.errorText}>
                        please enter Zip/Postal Code
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    className={classes.formControl}
                    error={this.state.error['phoneNo']}
                    aria-describedby="component-error-text"
                  >
                    <InputLabel htmlFor="component-error">Phone No.</InputLabel>
                    <Input
                      id="component-error"
                      onChange={this.onInputChange('phoneNo')}
                      onBlur={this.blurHandler('phoneNo')}
                      fullWidth
                      value={phoneNo}
                      required
                    />
                    {this.state.error['phoneNo'] && (
                      <FormHelperText className={classes.errorText}>
                        enter valid mobile number
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={this.handleSubmit}
              onMouseDown={this.handleSubmit}
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  refrenceData: state.refrenceData,
  securityQuestions: state.securityQuestions
});

const mapDispathFromProps = (dispatch) => ({
  textChanged: (fieldName, value) => dispatch(textChanged(fieldName, value)),
  getAllCountryList: () => dispatch(getAllCountryList()),
  getAllStatelist: (selectedCountry) => dispatch(getAllStatelist(selectedCountry)),
  getAllCitylist: (selectedCountry, selectedState) =>
    dispatch(getAllCitylist(selectedCountry, selectedState)),
  saveUserDetails: ({
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    gender,
    dateOfBirth,
    city,
    state,
    country,
    zip,
    phoneNo
  }) =>
    dispatch(
      saveUserDetails({
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        gender,
        dateOfBirth,
        city,
        state,
        country,
        zip,
        phoneNo
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispathFromProps
)(withStyles(styles, { withTheme: true })(Registration));
