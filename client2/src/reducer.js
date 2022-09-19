//LOCAL STORAGE
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
//
//GLOBAL STATE
export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
};

const reducer = (state, action) => {
  //console.log(action);

  switch (action.type) {
    case "DISPLAY__ALERT":
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all Values!",
      };
    case "CLEAR__ALERT":
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    case "REGISTER_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "User Created! Redirecting...",
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertType: "success",
        alertText: "Login Successfull! Redirecting...",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case "LOGOUT_USER":
      return {
        ...initialState,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    case "HANDLE_CHANGE":
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default reducer;
