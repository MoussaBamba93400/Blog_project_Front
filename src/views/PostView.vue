<script>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

export default {

  data() {
    return {
      id: "",
      articles:[]
    }
    
  },
  methods: {

    Delete(index) {
       const id = this.articles[index].id;

       delete this.articles[index]

       axios.delete(`http://localhost:8000/api/v1/article/${id}`)
       .then(response => {
        window.location.reload()
    })
       .catch(error => console.log(error))
    }
  },

  components: {
    NavBar,
    Footer
  },
  mounted () {

   const token = localStorage.getItem('token');
   const id = localStorage.getItem('id');
    this.id = id;
   if(token === null) {
    alert('You got to be logged to access your posts')
   }

    axios
      .get('http://localhost:8000/api/v1/article',{
        headers: {
            Authorization : `Bearer ${token}`
    },
    params: {
        user_id: this.id
    }
      })
      .then(response => {this.articles = response.data.article
        console.log(this.articles)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}




</script>
<template>
  <div>
  <NavBar />

  <div v-if="articles.length > 0" class="mt-8 flex justify-around flex-wrap mb-72">

 
    <div v-for="(article, index) in articles" :key="index"  class="bg-white shadow-md border border-gray-200 rounded-lg w-96  h-96 mb-5 hover:scale-105 ease-out duration-300">
        <a href="#">
            <img class="w-96 h-56 rounded-t-lg" :src='article.image_path' alt="">
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="text-center text-gray-900 font-bold text-2xl tracking-tight mb-2">{{article.title}}</h5>
            </a>
            <p class="font-normal text-gray-700 mb-3 truncate">{{ article.body }}</p>
            
            <button class="btn btn-outline btn-error" @click="Delete(index)">Delete</button>
        </div>
    </div>
   
   
  </div>
  <div v-else >
    You have no post
  </div>

  <Footer />
</div>
</template>

