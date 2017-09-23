<template>
  <b-container style="width: 50vw;" class="mt-2">
    <b-card border-variant=""
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row>
        <b-col sm="3"><label for="input-valid">نام کاربری:</label></b-col>
        <b-col sm="9">
          <b-form-input id="input-valid" v-model="username" :state="usernameEnter" type="text" placeholder="0017943310"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="3"><label>رمز عبور:</label></b-col>
        <b-col sm="9"><b-form-input type="password"></b-form-input></b-col>
      </b-row>

      <b-row>
        <b-col sm="3"><label>پایه‌ی تحصیلی:</label></b-col>
        <b-col>
          <b-form-select v-model="selected" :options="options" class="mb-3" required>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-for="(pr, index) in projects">
        <b-col sm="3">
          اولویت {{index+1}}
        </b-col>
        <b-col>
          <b-form-select v-model="selectedProject" :options="projects" class="mb-3" required>
          </b-form-select>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data: function () {
    return {
      username: '',
      selected: 7,
      options: [
        {value: 7, text: 'پایه‌ی هفتم'},
        {value: 8, text: 'پایه‌ی هشتم'},
        {value: 9, text: 'پایه‌ی نهم'}
      ],
      projects: [
        {value: null, text: 'انتخاب کنید!'},
        {value: 'test1', text: 'مسئله‌ی ۱'},
        {value: 'test2', text: 'مسئله‌ی ۲'},
        {value: 'test3', text: 'مسئله‌ی ۳'},
        {value: 'test4', text: 'مسئله‌ی ۴'},
        {value: 'test5', text: 'مسئله‌ی ۵'},
        {value: 'test6', text: 'مسئله‌ی ۶'},
        {value: 'test7', text: 'مسئله‌ی ۷'}
      ],
      selectedProject: null
    }
  },
  computed: {
    usernameEnter: function () {
      return (this.username.length === 10 && /^\d+$/.test(this.username))
    }
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
