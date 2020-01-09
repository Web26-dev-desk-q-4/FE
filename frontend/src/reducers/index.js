import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  CREATE_TICKET_START,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  HELPER_EDIT_TICKET_START,
  HELPER_EDIT_TICKET_SUCCESS,
  HELPER_EDIT_TICKET_FAIL,
  DELETE_TICKET_START,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_RESOLVED,
  HELPER_ID_NEW_TOKEN_START,
  HELPER_ID_NEW_TOKEN_SUCCESS,
  HELPER_ID_NEW_TOKEN_FAIL,
  STUDENT_ID_NEW_TOKEN_START,
  STUDENT_ID_NEW_TOKEN_SUCCESS,
  STUDENT_ID_NEW_TOKEN_FAIL,
  RESOLVE_TICKET_START,
  RESOLVE_TICKET_SUCCESS,
  RESOLVE_TICKET_FAIL,
  CREATE_START,
  CREATE_SUCCESS,
  CREATE_FAIL,
  CREATE_RESOLVED,
  GET_USER,
  GET_USER_FAIL
} from "../actions/actions";
const initialState = {
  errorStatusCode: null,
  fetchingData: false,
  isLoggingIn: false,
  isLoggedIn: false,
  isSigningUp: false,
  creatingTicket: false,
  updatingTicket: false,
  resolvingTicket: false,
  deletingTicket: false,
  status: null,
  error: null,
  credentials: [],
  users: [],
  user: {
    student_id: ""
  },
  categories: ["None", "Vue", "React", "JavaScript", "HTML", "CSS"],
  tickets: []
};
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        fetchingData: true,
        error: null
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        tickets: action.payload
      };
    case FETCH_DATA_FAIL:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    case CREATE_TICKET_START:
      return {
        ...state,
        error: "",
        creatingTicket: true
      };
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        creatingTicket: false,
        tickets: [...state.tickets, action.payload]
      };
    case CREATE_TICKET_FAIL:
      return {
        ...state,
        creatingTicket: false,
        error: action.payload
      };
    case DELETE_TICKET_START:
      return {
        ...state,
        error: "",
        deletingTicket: true
      };
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        deletingTicket: false,
        tickets: action.payload
      };
    case DELETE_TICKET_FAIL:
      return {
        ...state,
        deletingTicket: false,
        error: action.payload
      };
    case HELPER_EDIT_TICKET_START:
      return {
        ...state,
        error: "",
        updatingTicket: true
      };
    case HELPER_EDIT_TICKET_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.map(ticket => {
          if (Number(ticket.id) === Number(action.id)) {
            ticket = action.payload;
          }
          return ticket;
        })
      };
    case HELPER_EDIT_TICKET_FAIL:
      return {
        ...state,
        updatingTicket: false,
        error: action.payload
      };
    case LOGIN_START: {
      return {
        ...state,
        isLoggingIn: true
      };
    }
    case LOGIN_SUCCESS: {
      console.log(state);
      console.log(action);
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        token: action.token,
        id: action.id,
        student_id: action.student_id,
        status: action.status,
        error: action.message
      };
    }
    case LOGIN_RESOLVED: {
      return {
        ...state,
        isLoggingIn: false,
        status: null,
        error: null
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isLoggingIn: false,
        error: action.payload,
        status: action.status
      };
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      };
    case HELPER_ID_NEW_TOKEN_START:
      return {
        ...state,
        fetchingData: true,
        error: null
      };
    case HELPER_ID_NEW_TOKEN_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        tickets: action.payload
      };
    case HELPER_ID_NEW_TOKEN_FAIL:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
      case STUDENT_ID_NEW_TOKEN_START:
      return {
        ...state,
        fetchingData: true,
        error: null
      };
    case STUDENT_ID_NEW_TOKEN_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        tickets: action.payload
      };
    case STUDENT_ID_NEW_TOKEN_FAIL:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    case CREATE_START: {
      return {
        ...state,
        isSigningUp: true
      };
    }
    case CREATE_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        error: action.payload,
        status: action.status
        // user: action.user
      };
    }
    case CREATE_RESOLVED: {
      return {
        ...state,
        isSigningUp: false,
        error: null,
        status: null
      };
    }
    case CREATE_FAIL: {
      return {
        ...state,
        isSigningUp: false,
        error: action.payload
      };
    }
    case RESOLVE_TICKET_START:
      const editTicket = state.tickets.map(ticket => {
        if (Number(ticket.id) === Number(action.id)) {
          ticket.resolved = !ticket.resolved;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: editTicket
      };
    case RESOLVE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: [...state.ticket, action.payload]
      };
    case RESOLVE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case GET_USER:
      return {
        ...state,
        users: ``
      };
    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
export default reducers;