import {routerRedux} from 'dva/router';
import {fakeAccountLogin, fakeMobileLogin, checklogin} from '../api';

export default {
  namespace : 'login',

  state : {
    status: undefined,
    _login : undefined
  },

  effects : {
    *accountSubmit({
      payload
    }, {call, put}) {
      yield put({type: 'changeSubmitting', payload: true});
      const response = yield call(fakeAccountLogin, payload);
      yield put({type: 'changeLoginStatus', payload: response});
      yield put({type: 'changeSubmitting', payload: false});
    },
    *mobileSubmit(_, {call, put}) {
      yield put({type: 'changeSubmitting', payload: true});
      const response = yield call(fakeMobileLogin);
      yield put({type: 'changeLoginStatus', payload: response});
      yield put({type: 'changeSubmitting', payload: false});
    },
    *logout(_, {put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false
        }
      });
      yield put(routerRedux.push('/user/login'));
    },
    *checklogin(_, {call, put}) {
      const _login = yield call(checklogin);
      yield put({type: 'changeshow', payload: _login.login});
    }
  },

  reducers : {
    changeLoginStatus(state, {payload}) {
      return {
        ...state,
        status: payload.status,
        type: payload.type
      };
    },
    changeSubmitting(state, {payload}) {
      return {
        ...state,
        submitting: payload
      };
    },
    changeshow(state, {payload}) {
      return {
        ...state,
        _login: payload
      };
    }
  }
};
