import firebase from '~/plugins/firebase'

const DB = firebase.firestore()
const itemRef = DB.collection('Items')

export const state = () => ({
  login_user: null,
  midLogin:false,
  // loggedIn: false,
  userUid: '',
  userName: '',
  userPhoto: '',
  items: [],
})

export const mutations = {
  // loginStatusChange(state, status) {
  //   // 認証状態を双方向に変化
  //   state.loggedIn = status
  // },
  setLoginUser(state, user){
    state.login_user = user
    // ログインユーザー情報をstateのlogin_userにセット
  },
  deleteLoginUser(state){
    state.login_user = null // ログインユーザー情報(stateのlogin_user)を空にする
    state.CartItems = { CartItem:{ cartItemList:[] }}  // ログアウト時にリセット
  },

  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserPhoto(state, userPhoto) {
    state.userPhoto = userPhoto
  },

  addItem(state, item) {
    state.items.push(item)
  },

  clearItem(state) {
    state.items = []
  },
}

export const actions = {
  setLoginUser({ commit }, user){
    commit('setLoginUser', user) // mutationのログイン情報登録を呼び出し
  },
  login({ commit }) {
    console.log('login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then( result => {
        const user = result.user
        console.log(user)
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setUserPhoto', user.photoURL)
      })
      .catch(function (error) {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
  logOut() {
    firebase.auth().signOut()
  },


  fetchItems({ commit }) {
    itemRef
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log('success : ' + `${doc.id} => ${doc.data()}`)
          commit('addItem', doc.data())
        })
      })
      .catch((error) => {
        console.log('error : ' + error)
      })
  },

  addItem({ commit }, item) {
    console.log(item)
    itemRef
      .add({
        name: item.name,
        age: item.age,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
        commit('addItem', item)
      })
      .catch(function (error) {
        console.error('Error adding document: ', error)
      })
  },
}

export const getters = {
  userName: state => state.login_user ? state.login_user.displayName : '',
  photoURL: state => state.login_user ? state.login_user.photoURL : '',    
  uid: state => state.login_user ? state.login_user.uid : null,    
  midLogin: state => state.midLogin,

  getUser: (state) => state.user,
  getUserUid: (state) => state.userUid,
  getUserName: (state) => state.userName,
  getUserPhoto: (state) => state.userPhoto,

  getItems: (state) => state.items,
}
