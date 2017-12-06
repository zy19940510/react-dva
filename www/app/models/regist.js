import { fakeRegister } from '../api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    mail : ''
  },

  effects: {
    *submit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeRegister ,  _.payload );
      // yield console.log(response);
      // yield console.log(_)
      yield put({
        type: 'registerHandle',
        payload: response 
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
      yield put({
        type: 'changemail',
        payload: _.payload.mail,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
    changemail(state , {payload}){
      return {
        ...state,
        mail : payload
      }
    }
  },
};
