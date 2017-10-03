<template>
  <b-container style="width: 60vw;" class="my-4">
    <b-card border-variant="success"
            header="پنل ادمین"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row class="mb-2">
        <b-col sm="12">
          <b-alert dismissible variant="danger p-2 my-1 mx-auto" show>فایل کاربران باید با فرمت xlsx باشد. همچنین هر پایه‌ در یک شیت جدا که نام شیت برابر با نام پایه باشد ( ۷ و ... ). به علاوه ردیف اول تمام شیت ها باید حاوی عنوان اطلاعات هر ستون بوده که حتما شامل username، name، password باشد.</b-alert>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col sm="9">
          <b-form-file id="file_input" v-model="usersFile" choose-label="کاربران"></b-form-file>
        </b-col>
        <b-col sm="3">
          <b-btn variant="outline-success" @click="postUsers">
            ثبت کاربران
          </b-btn>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col sm="12">
          <b-alert dismissible variant="danger p-2 my-1 mx-auto" show>فایل آپلودی برای پروژه‌های هر پایه باید یک فایل text باشد که در هر خط آن نام یک پروژه نوشته شده است.</b-alert>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col sm="5">
          <b-form-file id="file_input" v-model="projectsFile" choose-label="پروژه‌ها"></b-form-file>
        </b-col>
        <b-col sm="4">
          <b-form-select v-model="selected" :options="options" class="mb-3">
          </b-form-select>
        </b-col>
        <b-col sm="3">
          <b-btn variant="outline-success" @click="postProjects">
            ثبت پروژه‌ها
          </b-btn>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
  import 'whatwg-fetch'
  export default {
    fetch ({ store, redirect }) {
      // console.log(store.state.username)
      if ((!store.state.username) || (store.state.username !== 'admin')) {
        // console.log((!store.state.username) || (store.state.username === 'admin‌'))
        return redirect('/login')
      }
    },
    data: function () {
      return {
        selected: null,
        usersFile: null,
        projectsFile: null,
        options: [
          {value: null, text: 'پایه‌ی مربوط به پروژه‌ها'},
          {value: 7, text: 'پایه‌ی هفتم'},
          {value: 8, text: 'پایه‌ی هشتم'},
          {value: 9, text: 'پایه‌ی نهم'}
        ]
      }
    },
    methods: {
      postUsers: async function () {
        var data = new FormData()
        data.append('file', this.usersFile)
        var x = await this.$axios({
          method: 'POST',
          url: 'http://localhost:8000/addusers',
          data: data
        })
        console.log(x.data)
      },
      postProjects: async function () {
        var data = new FormData()
        data.append('file', this.projectsFile)
        var x = await this.$axios({
          method: 'POST',
          url: ('http://localhost:8000/addprojects/' + this.selected),
          data: data
        })
        console.log(x.data)
      }
    }
  }
</script>

<style>

  button {
    cursor: pointer !important;
  }

</style>
