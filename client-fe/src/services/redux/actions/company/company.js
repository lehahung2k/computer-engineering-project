export const newNameCompanyAction = (name) => {
  return {
    type: "COMPANY/NEW_NAME",
    payload: name,
  };
};

export const newAddressCompanyAction = (address) => {
  return {
    type: "COMPANY/NEW_ADDRESS",
    payload: address,
  };
};

export const newWebsiteCompanyAction = (website) => {
  return {
    type: "COMPANY/NEW_WEBSITE",
    payload: website,
  };
};

export const newContactNameCompanyAction = (contactName) => {
  return {
    type: "COMPANY/NEW_CONTACT_NAME",
    payload: contactName,
  };
};

export const newContactMailCompanyAction = (contactMail) => {
  return {
    type: "COMPANY/NEW_CONTACT_MAIL",
    payload: contactMail,
  };
};

export const newContactNumberCompanyAction = (contactNumber) => {
  return {
    type: "COMPANY/NEW_CONTACT_NUMBER",
    payload: contactNumber,
  };
};

export const newCompanyAction = (company) => {
  return {
    type: "COMPANY/NEW_COMPANY",
    payload: company,
  };
};
