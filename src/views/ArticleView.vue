<template>
    <div>
    <NavBar />

    <div class="mt-20 flex justify-center ">
        <div class="w-fit ">
        <img :src="article.image_path" class="h-5/5 rounded shadow-lg shadow-blue-500/50">
        <div class=" w-3/3 p-7">
        <p>{{ article.body }}</p>
        </div>
        </div>
    </div>

    


    <div class="mx-60">
        <h1 class="">Comment</h1>

        <div v-for="(comment, index) in comments" :key="index">
         <Comment :comment="comment" />
        </div>
    </div>


    <div class="flex flex-col mx-60">
    <div class="relative rounded-md shadow-sm ">
      <textarea
        v-model="comment"
        :class="{ 'bg-red-50': errors.comment }"
        class="form-input py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        :placeholder="'Leave a comment...'"
      ></textarea>
      <div v-if="errors.comment" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
    <div class="mt-6">
      <button
        class="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        @click="submitComment"
      >
        Submit Comment
      </button>
    </div>
  </div>
    
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Comment from '../components/Comment.vue';
import axios from 'axios'


export default {
    methods: {
      
        getArticle() {
            const id = this.$route.params.id;
             axios.get(`http://localhost:8000/api/v1/article/${id}`)
             .then(response => this.article = response.data.article
            )
             .catch(error => console.log(error));
        },

        async getComments() {
            const id  = this.$route.params.id;
            axios.get(`http://localhost:8000/api/v1/article/${id}/comments`)
            .then(response => this.comments = response.data.comments)
            .catch(error => console.log(error));
        },

        submitComment() {
          const ArticleId  = this.$route.params.id;
          const userId = localStorage.getItem('id');
          const token = localStorage.getItem('token');

          axios.post(`http://localhost:8000/api/v1/article/${ArticleId}/comment`, {
            body: this.comment,
            user_id: userId,
            article_id: ArticleId
          }, {
            headers: {
            Authorization : `Bearer ${token}`
    }
          })
          .then(response =>  window.location.reload())
          .catch(error => console.log(error))

        }
        
    },
    data() {
      return {
        article: "",
        comments: [],
        comment: '',
        errors: {
           comment: false
      }
      }
    },

    components: {
        NavBar,
        Comment
    },
    mounted() {
        this.getArticle()
        this.getComments()

        console.log(this.comments)
    }
}

</script>
