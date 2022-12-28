export const newNameTenantAction = (name) => {
  return {
    type: "TENANT/NEW_NAME",
    payload: name,
  };
};

export const newAddressTenantAction = (address) => {
  return {
    type: "TENANT/NEW_ADDRESS",
    payload: address,
  };
};

export const newWebsiteTenantAction = (website) => {
  return {
    type: "TENANT/NEW_WEBSITE",
    payload: website,
  };
};

export const newContactNameTenantAction = (contactName) => {
  return {
    type: "TENANT/NEW_CONTACT_NAME",
    payload: contactName,
  };
};

export const newContactMailTenantAction = (contactMail) => {
  return {
    type: "TENANT/NEW_CONTACT_MAIL",
    payload: contactMail,
  };
};

export const newContactNumberTenantAction = (contactNumber) => {
  return {
    type: "TENANT/NEW_CONTACT_NUMBER",
    payload: contactNumber,
  };
};

export const newTenantCodeAction = (tenantCode) => {
  return {
    type: "TENANT/NEW_CODE",
    payload: tenantCode,
  };
};

export const newUsernameTenantAction = (username) => {
  return {
    type: "TENANT/NEW_USERNAME",
    payload: username,
  };
};

export const newPasswordTenantAction = (password) => {
  return {
    type: "TENANT/NEW_PASSWORD",
    payload: password,
  };
};

export const newTenantAction = (tenant) => {
  return {
    type: "TENANT/NEW_TENANT",
    payload: tenant,
  };
};

export const pinTenantId = (id) => {
  return {
    type: "TENANT/PIN_TENANT",
    payload: id,
  };
};

export const resetApiState = () => {
  return {
    type: "TENANT/RESET_API_STATE",
  };
};

export const resetState = () => {
  return {
    type: "TENANT/RESET_STATE",
  };
};
