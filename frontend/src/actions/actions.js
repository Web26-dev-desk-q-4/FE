import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// Action to Perform Login operation
const API = "https://dev-desk-back-end.herokuapp.com/api";
const authAxios = axiosWithAuth();
// Create User Actions
export const CREATE_START = "CREATE_START";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_RESOLVED = "CREATE_RESOLVED";
export const CREATE_FAIL = "CREATE_FAIL";
export const create = user => dispatch => {
  dispatch({ type: CREATE_START });
  return axios
    .post(`${API}/auth/register`, user)
    .then(res => {
      dispatch({
        type: CREATE_SUCCESS,
        payload: res.data.msg,
        status: "success"
      });
      setTimeout(() => dispatch({ type: CREATE_RESOLVED }), 1500);
    })
    .catch(err => {
      dispatch({ type: CREATE_FAIL, payload: err.response });
    });
};
// Login actions
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_RESOLVED = "LOGIN_RESOLVED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};
export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post(`${API}/auth/login`, credentials)
    .then(res => {
      if (res.status === 200) {
        console.log(`Success 1: ${res.data.token}.`);
        localStorage.setItem("Authorization", res.data.token);
        axios.create({
            baseURL: "https://dev-desk-back-end.herokuapp.com/",
            headers: {
                Authorization: res.data.token
            }
        }) // LOGIN_SUCCESS should be here
      } else {
        console.log("Status: " + res.status);
      }
    })
    .catch(err => {
      if (err.response.status === 500 || err.response.status === 404) {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response.data.msg,
          status: "error"
        });
      }
      setTimeout(() => dispatch({ type: LOGIN_RESOLVED }), 1500);
    });
};
// Action to fetch list of tickets available
export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_DATA_FAIL";
export const getData = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axiosWithAuth()
    .get(`${API}/tickets/3`)
    .then(res => {
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_DATA_FAIL, payload: err });
    });
};
export const GET_USER = "GET_USER";
export const GET_USER_FAIL = "GET_USER_FAIL";
export const getUser = id => dispatch => {
  axiosWithAuth()
    .get(`${API}/tickets/${id}`)
    .then(res => {
      dispatch({ type: GET_USER, payload: res.data.username });
    })
    .catch(err => {
      dispatch({ type: GET_USER_FAIL, payload: err });
    });
};
// Action to create a new ticket as students
export const CREATE_TICKET_START = "CREATE_TICKET_START";
export const CREATE_TICKET_SUCCESS = "CREATE_TICKET_SUCCESS";
export const CREATE_TICKET_FAIL = "CREATE_TICKET_FAIL";
export const createTicket = (newTicket) => dispatch => {
  dispatch({ type: CREATE_TICKET_START });
  axiosWithAuth()
    .post(`${API}/tickets/create/3`, newTicket)
    .then(res => {
      dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: CREATE_TICKET_FAIL, payload: err.response });
    });
};
// Action to update ticket information
export const HELPER_EDIT_TICKET_START = "HELPER_EDIT_TICKET_START";
export const HELPER_EDIT_TICKET_SUCCESS = "HELPER_EDIT_TICKET_SUCCESS";
export const HELPER_EDIT_TICKET_FAIL = "HELPER_EDIT_TICKET_FAIL";
export const helperEditTicket = (id, updatedTicket) => dispatch => {
  dispatch({ type: HELPER_EDIT_TICKET_START });
  axiosWithAuth()
    .put(
      `${API}/tickets/edit/${id}`,
      updatedTicket
    )
    .then(res => {
      dispatch({
        type: HELPER_EDIT_TICKET_SUCCESS,
        payload: res.data,
        id
      });
    })
    .catch(err => {
      dispatch({ type: HELPER_EDIT_TICKET_FAIL, payload: err.response });
    });
};
// Helper ID
export const HELPER_ID_NEW_TOKEN_START = "HELPER_ID_NEW_TOKEN_START";
export const HELPER_ID_NEW_TOKEN_SUCCESS = "HELPER_ID_NEW_TOKEN_SUCCESS";
export const HELPER_ID_NEW_TOKEN_FAIL = "HELPER_ID_NEW_TOKEN_FAIL";
export const helperIdNewToken = () => dispatch => {
  return axiosWithAuth()
    .post(`${API}/helpers`)
    .then(res => {
      console.log("First thing's first", res);
      localStorage.setItem("Authorization", res.data.token);
        // axios.put({
        //     baseURL: "https://dev-desk-back-end.herokuapp.com/api",
        //     headers: {
        //         Authorization: res.data.token
        //     }
        // })
    })
    .catch(err => {
      console.log("I'm the realest", err)
    })
}
// Student IDs
export const STUDENT_ID_NEW_TOKEN_START = "STUDENT_ID_NEW_TOKEN_START";
export const STUDENT_ID_NEW_TOKEN_SUCCESS = "STUDENT_ID_NEW_TOKEN_SUCCESS";
export const STUDENT_ID_NEW_TOKEN_FAIL = "STUDENT_ID_NEW_TOKEN_FAIL";
export const studentIdNewToken = () => dispatch => {
  return axiosWithAuth()
    .post(`${API}/students`)
    .then(res => {
      console.log("Student's thing first", res);
      localStorage.setItem("Authorization", res.data.token);
        // axios.put({
        //     baseURL: "https://dev-desk-back-end.herokuapp.com/api",
        //     headers: {
        //         Authorization: res.data.token
        //     }
        // })
    })
    .catch(err => {
      console.log("I'm a student...", err)
    })
}
// Action for admins to resolve & reopen tickets
export const RESOLVE_TICKET_START = "RESOLVE_TICKET_START";
export const RESOLVE_TICKET_SUCCESS = "RESOLVE_TICKET_SUCCESS";
export const RESOLVE_TICKET_FAIL = "RESOLVE_TICKET_FAIL";
export const resolveTicket = (id, updatedTicket) => dispatch => {
  dispatch({ type: RESOLVE_TICKET_START, id });
  axiosWithAuth()
    .put(
      `${API}/tickets/edit/${id}`,
      updatedTicket
    )
    .then(res => {
      dispatch({ type: RESOLVE_TICKET_SUCCESS, payload: res.data, id });
    })
    .catch(err => {
      dispatch({ type: RESOLVE_TICKET_FAIL, payload: err });
    });
};
// Action to perform Delete operation
export const DELETE_TICKET_START = "DELETE_TICKET_START";
export const DELETE_TICKET_SUCCESS = "DELETE_TICKET_SUCCESS";
export const DELETE_TICKET_FAIL = "DELETE_TICKET_FAIL";
export const deleteTicket = id => dispatch => {
  dispatch({ type: DELETE_TICKET_START });
  axiosWithAuth()
    .delete(`${API}/tickets/delete/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_TICKET_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: DELETE_TICKET_FAIL, payload: err.response });
    });
};