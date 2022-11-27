import { ListBtc } from "../../../assets/fakeData/fakeBtc";
const initialState = {
  listTenant: ListBtc,
  tenant: {
    name: "",
    address: "",
    website: "",
    contactName: "",
    contactMail: "",
    contactNumber: "",
    username: "",
    password: "",
    tenantCode: "",
  },
  pinnedTenantId: null,
  loading: false,
  success: false,
  message: "",
};

const tenantReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * Filling tenant info form
     */
    case "TENANT/NEW_TENANT": {
      const newTenant = action.payload;

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_NAME": {
      const newName = action.payload;
      const newTenant = { ...state.tenant, name: newName };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_ADDRESS": {
      const newAddress = action.payload;
      const newTenant = { ...state.tenant, address: newAddress };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_WEBSITE": {
      const newWebsite = action.payload;
      const newTenant = { ...state.tenant, website: newWebsite };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_CONTACT_NAME": {
      const newContactName = action.payload;
      const newTenant = { ...state.tenant, contactName: newContactName };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_CONTACT_MAIL": {
      const newContactMail = action.payload;
      const newTenant = { ...state.tenant, contactMail: newContactMail };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_CONTACT_NUMBER": {
      const newContactNumber = action.payload;
      const newTenant = { ...state.tenant, contactNumber: newContactNumber };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_USERNAME": {
      const newUsername = action.payload;
      const newTenant = { ...state.tenant, username: newUsername };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_PASSWORD": {
      const newPassword = action.payload;
      const newTenant = { ...state.tenant, password: newPassword };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_CODE": {
      const newCode = action.payload;
      const newTenant = { ...state.tenant, tenantCode: newCode };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    /**
     * Fetching list of tenant
     */

    /**
     * Posting create new tenant
     */
    case "TENANT/CREATE_NEW_TENANT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "TENANT/CREATE_NEW_TENANT_SUCCESS": {
      const newTenant = action.payload;
      return {
        ...state,
        tenant: newTenant,
        success: true,
        loading: false,
      };
    }

    case "TENANT/CREATE_NEW_TENANT_FAIL": {
      return {
        ...state,
        loading: false,
        success: false,
        message: action.message,
      };
    }

    /**
     * Delete tenant
     */

    /**
     * Update tenant
     */

    /**
     * Pin tenant for view detail
     */
    case "TENANT/PIN_TENANT": {
      return {
        ...state,
        pinnedTenantId: action.payload,
      };
    }
    default:
      return state;
  }
};

export default tenantReducer;
