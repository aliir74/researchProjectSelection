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
      login: async function () {
        try {
          let response = (await this.$axios({
            method: 'GET',
            url: 'http://localhost:8000/',
            auth: {
              username: this.username,
              password: this.password
            }
          }))
          var data = response.data
          if (data === 'hello') {
            this.$store.commit('SET_INFO', {name: 'ali', grade: 7})
            console.log(this.$store.state.name)
            window.location.replace('/')
          }
        } catch (err) {
          this.$toast.error('خطا در ورود')
        }
      }
    }
}
</script>

<style>

  button {
    cursor: pointer !important;
  }

</style>
