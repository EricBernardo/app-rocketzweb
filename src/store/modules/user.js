import { getProfile, login } from '@/api/user';
import { resetRouter } from '@/router';
import { getToken, removeToken, setToken } from '@/utils/auth';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  role: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getProfile({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getProfile(state.token).then(response => {
        const {
          data
        } = response.data

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar,
          role
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLE', role)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_ROLE', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
