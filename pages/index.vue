<template>
  <b-container style="width: 50vw;" class="mt-4">
    <b-card border-variant="success"
            header="فرم ثبت نام پژوهشی"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row>
        <b-col sm="3"><label for="input-valid">نام کاربری:</label></b-col>
        <b-col sm="9">
          <b-form-input id="input-valid" v-model="username" :state="usernameEnter" type="text" placeholder="0017943310"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="3"><label for="input2-valid">نام کاربری:</label></b-col>
        <b-col sm="9">
          <b-form-input id="input2-valid" v-model="password" :state="passwordEnter" type="password" placeholder=""></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="3"><label>پایه‌ی تحصیلی:</label></b-col>
        <b-col>
          <b-form-select v-model="selected" :options="options" class="mb-3" required>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row v-for="(pr, index) in projects" v-if="index !== projects.length-1">
        <b-col sm="3">
          اولویت {{index+1}}
        </b-col>
        <b-col>
          <b-form-select v-model="selectedProject[index]" :options="projectOptions" class="mb-3" required>
          </b-form-select>
        </b-col>
      </b-row>

      <b-row class="mx-auto">
        <b-btn id="sendBtn" :variant="'outline-success'" class="mx-3" :disabled="checkSend">
          ارسال
        </b-btn>
        <b-popover class="t" target="sendBtn"
                   triggers="hover focus"
                   content="فقط یک بار مجاز به ثبت نام هستید">
        </b-popover>

        <b-btn id="test" :variant="'outline-danger'" @click="resetPriorities">
          پاک کردن اولویت‌ها
        </b-btn>

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
      password: '',
      selected: 7,
      options: [
        {value: 7, text: 'پایه‌ی هفتم'},
        {value: 8, text: 'پایه‌ی هشتم'},
        {value: 9, text: 'پایه‌ی نهم'}
      ],
      projects: [
        {value: null, text: 'انتخاب کنید!'},
        {value: 1, text: 'مسئله‌ی ۱'},
        {value: 2, text: 'مسئله‌ی ۲'},
        {value: 3, text: 'مسئله‌ی ۳'},
        {value: 4, text: 'مسئله‌ی ۴'},
        {value: 5, text: 'مسئله‌ی ۵'},
        {value: 6, text: 'مسئله‌ی ۶'},
        {value: 7, text: 'مسئله‌ی ۷'}
      ],
      selectedProject: [null, null, null, null, null, null, null, null]
    }
  },
  computed: {
    usernameEnter: function () {
      return (this.username.length === 10 && /^\d+$/.test(this.username))
    },
    passwordEnter: function () {
      return (this.password.length === 10 && /^\d+$/.test(this.password))
    },
    projectOptions: function () {
      var ans = this.projects.slice()
      for (var i = 0; i < ans.length; i++) {
        ans[i].disabled = false
      }
      for (i = 0; i < this.selectedProject.length; i++) {
        if (this.selectedProject[i] !== null) {
          for (var j = 0; j < ans.length; j++) {
            if (this.selectedProject[i] === ans[j].value) {
              ans[j].disabled = true
              break
            }
          }
        }
      }
      return ans
    },
    checkSend: function () {
      return false
      /*
      var nullCnt = 0
      this.selectedProject.forEach(function (i) {
        if (i === null) {
          nullCnt += 1
        }
      })
      if (nullCnt === 1 && this.usernameEnter && this.passwordEnter) {
        return false
      } else {
        return true
      }
      */
    }
  },
  methods: {
    resetPriorities: function () {
      var tmp = []
      for (var i = 0; i < this.selectedProject.length; i++) {
        tmp.push(null)
      }
      this.selectedProject = tmp.concat()
      console.log(this.selectedProject)
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

  .t {
    text-align: right;
    direction: rtl !important;
  }

  button {
    cursor: pointer !important;
  }

</style>
