<template>
  
  
  
  <div class="bg-no-repeat bg-cover bg-center relative" style="background-image: url(https://c0.wallpaperflare.com/preview/639/306/330/aerial-background-blog-cafe.jpg);"><div class="absolute  opacity-75 inset-0 z-0"></div>
  <NavBar /> 
  <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
      

      <div class="flex justify-center self-center  z-10">


        <form @submit.prevent="submitForm" class="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div class="mb-4">
              <h3 class="font-semibold text-2xl text-gray-800">{{login ? "Login": "Sign In" }}</h3>
              <p class="text-gray-500">Please sign in to your account.</p>
            </div>


            
            
            <div class="space-y-5">


              <div class="space-y-2"  v-if="!login">
               <label class="text-sm font-medium text-gray-700 tracking-wide">Name</label>
              <input v-model="formData.name" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="text" placeholder="Enter your name">
              </div>


              <div class="space-y-2">
               <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
              <input v-model="formData.email" class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="email" placeholder="mail@gmail.com">
              </div>


              <div class="space-y-2">
              <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Password
              </label>
              <input v-model="formData.password" class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" placeholder="Enter your password">
            </div>
  
            <div>
              <button type="submit" class="w-full flex justify-center bg-blue-400  hover:bg-purple-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
              </button>
            </div>

            <p @click="login = !login" class="flex justify-center cursor-pointer ">{{login? "Don't have an account" : "Already got a account" }}</p>

          </div>
        </form>


      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'



export default {
  data() {
    return {
      formData: {
        email: '',
        password: '',
        name: ''
      },
      login: false,
    }
  },
  methods: {
    async submitForm() {
      if(this.login) {
      try {
        await axios.post('http://localhost:8000/api/v1/user/auth/login', {email: this.formData.email, password:this.formData.password}).then(function (response) {
    console.log(response);

    if(response.status == 200) {
      localStorage.setItem('token', response.data.authorisation.token)
      localStorage.setItem("id", response.data.user.id)
      window.location.href = '/home'


    }


  })
  .catch(function (error) {
    console.log(error);
    alert('An error occurred while logging in.')
  })
       
      } catch (error) {
        console.error(error)
        alert('An error occurred while submitting the form.')
      }
    } else {
      try {
        await axios.post('http://localhost:8000/api/v1/user/register', this.formData).then(function (response) {
    console.log(response);

    if(response.status == 201) {
      window.location.href = '/home'
    }


  })
  .catch(function (error) {
    console.log(error);
    alert('An error occurred while logging in.')
  })
       
      } catch (error) {
        console.error(error)
        alert('An error occurred while submitting the form.')
      }
    }
  }
},

components: {
    NavBar,
  
}
}
</script>