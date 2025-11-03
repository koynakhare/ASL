import { get } from "lodash";

export const ALERT_SUCCESS = "ALERT_SUCCESS";

const initialState = {
  success: false,
  message: "",
  error: false
};

export default (state = initialState, action) => {
  switch (action?.type) {
    case ALERT_SUCCESS:

      return {
        success: get(action,'payload.success',false),
        message: get(action,'payload.message',''),
        error:  get(action,'payload.error',false),
        warning:  get(action,'payload.warning',false),
      };
    default:
      return state;
  }
};
