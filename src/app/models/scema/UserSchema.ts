export const confirmPassword = {
  password: '',
  test: function(value) {
    const confirmPassword = value;
    if (this.password != confirmPassword) {
      return false;
    }
    return true;
  }
};

export const USER_SCHEMA = (password) => {
  return {
    userName: {
      isRequired: true,
      //regex: /^[a-zA-Z0-9]+([_\s\-]?[a-zA-Z0-9]){2,15}$/
      regex: /^[a-zA-Z0-9.\-_$@*!]{3,15}$/
    },

    email: {
      isRequired: true,
      //regex: /\S+@\S+\.\S+/
      regex: /^\S+@\S+\.\S+$/
    },

    password: {
      isRequired: true,
      regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    },

    confirmPassword: {
      isRequired: !!password,
      regex: confirmPassword
    },

    firstName: {
      isRequired: true,
      regex: /^[a-zA-Z]{2,30}$/
    },

    lastName: {
      isRequired: true,
      regex: /^[a-zA-Z]{2,30}$/
    },

    addressLine1: {
      isRequired: true,
      regex: /^[a-zA-Z0-9\s,.'-]{3,}$/
    },

    addressLine2: {
      isRequired: true,
      regex: /^[a-zA-Z0-9\s,.'-]{3,}$/
    },

    gender: {
      isRequired: true,
      regex: /^(?:m|M|male|Male|f|F|female|Female|o|O|other|Other)$/,
      option: ['Male', 'Female', 'Other']
    },

    dateOfBirth: {
      isRequired: true,
      regex: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
    },

    country: {
      isRequired: true,
      regex: /^[\s\t\r\n]*\S+/
    },

    state: {
      isRequired: true,
      regex: /^[\s\t\r\n]*\S+/
    },

    city: {
      isRequired: true,
      regex: /^[\s\t\r\n]*\S+/
    },

    zip: {
      isRequired: true,
      regex: /(^\d{6}$)|(^\d{6}-\d{5}$)/
    },

    phoneNo: {
      isRequired: true,
      //regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/
      regex: /^[1-9]\d{9}$/
    }
  };
};
