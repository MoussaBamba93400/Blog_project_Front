<script>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

export default {

  data() {
    return {

      articles:[]
    }
    
  },
  methods: {

    toArticle(id) {
      this.$router.push({path: `/article/${id}`})
    }
  },

  components: {
    NavBar,
    Footer
  },
  mounted () {

   let token = localStorage.getItem('token');
 console.log(token)
    axios
      .get('http://localhost:8000/api/v1/articles')
      .then(response => {this.articles = response.data.articles
        console.log(this.articles[0].image_path)
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

  <div v-if="articles" class="mt-8 flex justify-around flex-wrap">

 
    <div v-for="(article, index) in articles" :key="index" @click="toArticle(article.id)" class="bg-white shadow-md border border-gray-200 rounded-lg w-96 h-96 mb-5 hover:scale-105 ease-out duration-300">
        <a href="#">
            <img class="w-96 h-56 rounded-t-lg" :src='article.image_path' alt="">
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="text-center text-gray-900 font-bold text-2xl tracking-tight mb-2">{{article.title}}</h5>
            </a>
            <p class="font-normal text-gray-700 mb-3 truncate">{{ article.body }}</p>
            
        </div>
    </div>
   
   
  </div>

  <Footer />
</div>
</template>


