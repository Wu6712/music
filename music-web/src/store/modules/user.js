import { login, getInfo, register, getUserList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(response => {
        const { data } = response
        console.log('login res')
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.user.username)
        commit('SET_AVATAR', data.user.avatar)
        commit('SET_ID', data.user.id)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  register(state, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password}).then(response => {
        console.log(response)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        console.log('getInfo-------------')
        console.log(data)

        if (!data) {
          return reject('验证失败，请重新登录')
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserList() {
    return new Promise((resolve, reject) => {
      getUserList().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      //logout(state.token).then(() => {
      //  removeToken() // must remove  token  first
      //  resetRouter()
      //  commit('RESET_STATE')
      //  resolve()
      //}).catch(error => {
      //  reject(error)
      //})
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

