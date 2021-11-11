<template>
  <div class="main">
    <h2>Hello Trehalose !!</h2>
     <p><img src="../assets/threhalose.png" /></p>

    <div>
      <p><img :src="getUserPhoto" /></p>
      <p>user: {{ getUserName }}</p>
      <button @click="login">ログイン</button>
      <!-- <button @click="logOut">ログアウト</button> -->
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in $store.getters.getItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <p>
        <input v-model="newName" class="input" type="text" placeholder="name" />
      </p>
      <p>
        <input v-model="newAge" class="input" type="text" placeholder="age" />
      </p>
      <p class="control">
        <button @click="addItem"> add </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data() {
    return {
      newName: '',
      newAge: '',
      loading:false,
    }
  },

  computed: {
    ...mapGetters(['getUserUid', 'getUserName', 'getUserPhoto', 'getItems']),
  },

  created() {
    // 認証状態の取得をするaction
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setLoginUser(user); 
          console.log('login');
        }else{            
          this.deleteLoginUser();  
          console.log('logout');                          
        }
        // this.loading = false             
      })        
    console.log("fetchItems");

  //   this.$store.dispatch('fetchItems')
  },

  methods: {
    login() {
      console.log('login')
      // this.$store.dispatch('login')
    },
    addItem() {
      const name = this.newName
      const age = this.newAge

      this.$store.dispatch('addItem', { name, age })
      this.newName = ''
      this.newAge = ''
    },

    ...mapActions(['login', "setLoginUser", "logout",]),
  },
}
</script>

<style>
.main {
  margin: 20% auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.table {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3%;
}
</style>