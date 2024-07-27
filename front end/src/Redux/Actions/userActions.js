import api from '../../services/api';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await api.post('/users/login', { username, password });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_LOGIN_FAIL', payload: error.message });
  }
};

export const register = (username, password, email) => async (dispatch) => {
  try {
    const response = await api.post('/users/register', { username, password, email });
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_REGISTER_FAIL', payload: error.message });
  }
};
