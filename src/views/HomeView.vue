<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {

  data() {
    return {

      articles:[]
    }
    
  },

  components: {
    NavBar
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/v1/articles')
      .then(response => {this.articles = response.data.articles
        console.log(this.articles[0].image_path)
      })
  }
}




</script>
<template>
  <div>
  <NavBar />

  <div v-if="articles" class="border-2 border-black mt-8 flex justify-around flex-wrap">

 
    <div v-for="(article, index) in articles" :key="index" class="bg-white shadow-md border border-gray-200 rounded-lg w-96 h-96 mb-5">
        <a href="#">
            <img class="w-96 h-56 rounded-t-lg" :src='article.image_path' alt="">
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="border-2 border-black text-center text-gray-900 font-bold text-2xl tracking-tight mb-2">{{article.title}}</h5>
            </a>
            <p class="font-normal border-2 border-black text-gray-700 mb-3">{{ article.body }}</p>
            
        </div>
    </div>
   
   
  </div>

</div>
</template>


