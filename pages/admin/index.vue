<template>
  <b-container style="width: 50vw;" class="my-4">
    <b-card border-variant="success"
            header="پنل ادمین"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row class="mx-auto">
        <b-btn id="sendBtn" :variant="'outline-success'" class="mx-3" @click="">
          ورود
        </b-btn>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
  import 'whatwg-fetch'
  export default {
    fetch ({ store, redirect }) {
      console.log(store.state.username)
      if ((!store.state.username) || (store.state.username !== 'admin')) {
        console.log((!store.state.username) || (store.state.username === 'admin‌'))
        // return redirect('/login')
      }
    },
    data: function () {
      return {
      }
    },
    methods: {
      uploadUsers: async function () {
      }
    }
  }
</script>

<style>

  button {
    cursor: pointer !important;
  }

</style>
