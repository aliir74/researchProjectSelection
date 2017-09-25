<template>
  <b-container style="width: 50vw;" class="my-4">
    <b-card border-variant="success"
            header="ورود"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row>
        <b-col sm="3"><label for="input-valid">نام کاربری:</label></b-col>
        <b-col sm="9">
          <b-form-input id="input-valid" v-model="username" type="text" placeholder="0017943310"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="3"><label for="input2-valid">رمز عبور:</label></b-col>
        <b-col sm="9">
          <b-form-input id="input2-valid" v-model="password" type="password" placeholder=""></b-form-input>
        </b-col>
      </b-row>

      <b-row class="mx-auto">
        <b-btn id="sendBtn" :variant="'outline-success'" class="mx-3" @click="login">
          ورود
        </b-btn>
        <b-btn  :variant="'outline-danger'" class="mx-3" @click="checkLogin">
          چک
        </b-btn>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
  import 'whatwg-fetch'
  export default {
    data: function () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        console.log(this.$axios.defaults)
        var data1 = this.username
        var data2 = this.password
        this.$store.dispatch('login', {username: data1, password: data2})
        /*
        this.$axios.post('http://localhost:8000/api/login', {
          username: this.username,
          password: this.password
        })
        */
      },
      checkLogin: async function () {
        let fields = { username: this.username, password: this.password }
        let { token } = (await this.$axios({
          method: 'POST',
          url: 'http://localhost:8000/login',
          data: fields
        })).data
        console.log(token)
        // var data = {username: this.username, password: this.password}
        /*
        var user = await (this.$axios.post('http://localhost:8000/login', data, {
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })).data
        console.log(user.user)
        */
        /*
        fetch('http://localhost:8000/login', {
          // Send the client cookies to the server
          credentials: 'same-origin',
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
          .then((res) => {
            console.log('res: ' + res.text())
            if (res.status === 401) {
              throw new Error('Bad credentials')
            } else {
              return res.text().then(function (text) {
                return text ? JSON.parse(text) : {}
              })
            }
          })
          .then((authUser) => {
            console.log('authUser: ' + authUser)
          })
          */
      }
    }
}
</script>

<style>

  button {
    cursor: pointer !important;
  }

</style>
