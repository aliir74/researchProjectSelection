<template>
  <b-container style="width: 50vw;" class="my-4">
    <b-card border-variant="success"
            header="فرم ثبت نام پژوهشی"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row class="mb-2">
        <b-col sm="3">نام:</b-col>
        <b-col>{{$store.state.name}}</b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col sm="3"></b-col>
        <b-col>
          <b-form-checkbox id="checkbox1"
                           v-model="$store.state.enrolled"
                           value="true"
                           unchecked-value="false" disabled>
            شما قبلا ثبت نام کرده‌اید!
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3"><label>پایه‌ی تحصیلی:</label></b-col>
        <b-col>
          <b-form-select v-model="$store.state.grade" :options="options" class="mb-3" required disabled>
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
        <b-btn id="sendBtn" :variant="'outline-success'" class="mx-3" :disabled="checkSend" @click="sendPriorities">
          ارسال
        </b-btn>
        <b-popover class="t" target="sendBtn"
                   triggers="hover focus"
                   content="از انتخاب خود مطمئن شوید :)">
        </b-popover>

        <b-btn id="test" :variant="'outline-danger'" @click="resetPriorities">
          پاک کردن اولویت‌ها
        </b-btn>
        <b-popover class="t" target="test"
                   triggers="hover focus"
                   placement="left"
                   content="این دکمه فقط منو‌های بالا را ریست می‌کند">
        </b-popover>

      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  fetch ({ store, redirect }) {
    if (!store.state.name) {
      return redirect('/login')
    } else if (store.state.username === 'admin') {
      return redirect('/admin')
    }
  },
  async asyncData ({ store, app }) {
    var data = (await app.$axios({
      method: 'GET',
      url: 'http://208.68.36.50:8001/projects/' + store.state.grade.toString()
      // url: 'http://localhost:8001/projects/' + store.state.grade.toString()
    })).data
    var selectedProject = []
    var projects = [{value: null, text: 'انتخاب کنید!'}]
    for (var i = 0; i < data.length; i++) {
      projects.push({value: i + 1, text: data[i]})
      selectedProject.push(null)
    }
    // console.log(projects)
    return {
      selectedProject: selectedProject,
      projects: projects
    }
  },
  data: function () {
    return {
      username: '',
      password: '',
      selected: 7,
      options: [
        {value: 7, text: 'پایه‌ی هفتم'},
        {value: 8, text: 'پایه‌ی هشتم'},
        {value: 9, text: 'پایه‌ی نهم'}
      ]
      /*
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
      */
      // selectedProject: [null, null, null, null, null, null, null, null]
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
      var nullCnt = 0
      this.selectedProject.forEach(function (i) {
        if (i === null) {
          nullCnt += 1
        }
      })
      if (nullCnt === 0) {
        return false
      } else {
        return true
      }
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
    },
    sendPriorities: async function () {
      var sendProjects = []
      for (var i = 0; i < this.selectedProject.length; i++) {
        sendProjects.push({priority: i + 1, name: this.projects[i + 1].text})
      }
      try {
        var x = (await this.$axios({
          method: 'POST',
          url: 'http://208.68.36.50:8001/adduserprojects/' + this.$store.state.username.toString(),
          // url: 'http://localhost:8001/adduserprojects/' + this.$store.state.username.toString(),
          data: {
            projects: sendProjects
          }
        })).data
        if (x === 'ok') {
          this.$toast.success('اولویت ها با موفقیت ذخیره شدند')
          this.$store.commit('SET_ENROLLED', {enrolled: true})
        } else {
          this.$toast.error('مشکلی در ذخیره اولویت‌ها پیش آمد')
        }
      } catch (err) {
        this.$toast.error(err)
      }
    }
  },
  mounted: function () {
    console.log(this.$store.state.username)
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
