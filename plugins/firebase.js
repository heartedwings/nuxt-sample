import firebase from 'firebase'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDiNFk8ZpomYmtnfqrDVveweX1cQw9JQM0',
    authDomain: 'nuxtapp-d763c.firebaseapp.com',
    projectId: 'nuxtapp-d763c',
    storageBucket: 'nuxtapp-d763c.appspot.com',
    messagingSenderId: '32434330491',
    appId: '1:32434330491:web:2393139974951552a8fbde',
    measurementId: 'G-HZDXRTL6DV',
  })

  // // 今回は現在のセッションまたはタブでのみ状態が保持される設定 
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  //   console.log('Initialized!') // 確認用のメッセージ
  // })
}

export default firebase
