const initialCompany = {
  name: "",
  address: "",
  website: "",
  contactName: "",
  contactMail: "",
  contactNumber: "",
};

const companyReducer = (state = initialCompany, action) => {
  switch (action.type) {
    case "COMPANY/NEW_COMPANY": {
      const newCompany = action.payload;

      return newCompany;
    }

    case "COMPANY/NEW_NAME": {
      const newName = action.payload;

      return {
        ...state,
        name: newName,
      };
    }

    case "COMPANY/NEW_ADDRESS": {
      const newAddress = action.payload;

      return {
        ...state,
        address: newAddress,
      };
    }

    case "COMPANY/NEW_WEBSITE": {
      const newWebsite = action.payload;

      return {
        ...state,
        website: newWebsite,
      };
    }

    case "COMPANY/NEW_CONTACT_NAME": {
      const newContactName = action.payload;

      return {
        ...state,
        contactName: newContactName,
      };
    }

    case "COMPANY/NEW_CONTACT_MAIL": {
      const newContactMail = action.payload;

      return {
        ...state,
        contactMail: newContactMail,
      };
    }

    case "COMPANY/NEW_CONTACT_NUMBER": {
      const newContactNumber = action.payload;

      return {
        ...state,
        contactNumber: newContactNumber,
      };
    }

    default:
      return state;
  }
};

export default companyReducer;
