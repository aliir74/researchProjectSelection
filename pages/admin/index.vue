<template>
  <b-container style="width: 60vw;" class="my-4">
    <b-card border-variant="success"
            header="پنل ادمین"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="w-100">
      <b-row class="mb-2" dir="ltr">
        <b-col class="my-1" sm="12" v-for="(item, index) in enrolled" :key="index">
           درصد ثبت نامی پایه {{index+7}} ام
          <b-progress :value="item" :max="max[index]" show-progress animated></b-progress>
        </b-col>
      </b-row>
      <b-btn class="mb-2" variant="outline-info" @click="reloadEnrolled">
        بروزرسانی
      </b-btn>
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
    async asyncData ({ app }) {
      var data = (await app.$axios({
        method: 'GET',
        url: 'http://208.68.36.50:8001/enrolled'
        // url: 'http://localhost:8001/enrolled'
      })).data
      return {
        enrolled: data.enrolled,
        max: data.all
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
        try {
          var x = await this.$axios({
            method: 'POST',
            url: 'http://208.68.36.50:8001/addusers',
            // url: 'http://localhost:8001/addusers',
            data: data
          })
          this.$toast.success(x.data.filename + ` uploaded!`)
        } catch (err) {
          this.$toast.error(err)
        }
      },
      postProjects: async function () {
        var data = new FormData()
        data.append('file', this.projectsFile)
        try {
          var x = await this.$axios({
            method: 'POST',
            url: ('http://208.68.36.50:8001/addprojects/' + this.selected),
            // url: ('http://localhost:8001/addprojects/' + this.selected),
            data: data
          })
          this.$toast.success(x.data.filename + ` uploaded!`)
        } catch (err) {
          this.$toast.error(err)
        }
      },
      reloadEnrolled: async function () {
        var data = (await this.$axios({
          method: 'GET',
          url: 'http://208.68.36.50:8001/enrolled'
          // url: 'http://localhost:8001/enrolled'
        })).data
        this.enrolled = data.enrolled
        this.max = data.all
      }
    }
  }
</script>

<style>

  button {
    cursor: pointer !important;
  }

</style>
