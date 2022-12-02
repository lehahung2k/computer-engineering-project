import { ListBtc } from "../../../assets/fakeData/fakeBtc";
const initialState = {
  listTenant: ListBtc,
  tenant: {
    tenantName: "",
    tenantAddress: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    username: "",
    password: "",
    tenantCode: "",
  },
  pinnedTenantId: null,
  loading: false,
  success: false,
  failure: false,
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
      const newTenant = { ...state.tenant, tenantName: newName };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_ADDRESS": {
      const newAddress = action.payload;
      const newTenant = { ...state.tenant, tenantAddress: newAddress };

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
      const newTenant = { ...state.tenant, contactEmail: newContactMail };

      return {
        ...state,
        tenant: newTenant,
      };
    }

    case "TENANT/NEW_CONTACT_NUMBER": {
      const newContactNumber = action.payload;
      const newTenant = { ...state.tenant, contactPhone: newContactNumber };

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
    case "TENANT/FETCH_LIST_TENANT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "TENANT/FETCH_LIST_TENANT_SUCCESS": {
      const listTenant = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        listTenant: listTenant,
      };
    }

    case "TENANT/FETCH_LIST_TENANT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }

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
        pinnedTenantId: newTenant.tenantId,
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
        failure: true,
      };
    }

    case "TENANT/RESET_API_STATE": {
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        failure: false,
      };
    }

    /**
     * Delete tenant
     */

    /**
     * Update tenant
     */
    case "TENANT/UPDATE_TENANT": {
      return {
        ...state,
        loading: true,
      };
    }

    case "TENANT/UPDATE_TENANT_SUCCESS": {
      const tenantUpdated = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        tenant: tenantUpdated,
      };
    }

    case "TENANT/UPDATE_TENANT_FAIL": {
      return {
        ...state,
        loading: false,
        failure: true,
        message: action.message,
      };
    }
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
