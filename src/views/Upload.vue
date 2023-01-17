
<template>
  <div>
    <NavBar />

    <form action="" v-on:submit.prevent="uploadPost()" class="flex flex-col mt-14" >
 

      <div class="self-center mb-6">
        <label for="title">Title</label>
        <input type="text" v-model="title" placeholder="Entrez le titre" name="title" />
      </div>


      <textarea class="textarea textarea-info md:w-1/3 h-36 self-center mb-6" placeholder="Texte"  v-model="body" required></textarea>
      

      <div class=" img-input  self-center flex justify-between mb-6">
      <label for="image">Entrez une image d'illustration:</label>
      <input type="file" name="image" ref="image" class="self-center " />
      </div>
      <button type="submit" class="w-96 btn glass bg-black hover:border-black self-center">Submit</button>
    </form>

    <h1 v-if="sent">Your Post as been sent!!</h1>

  </div>
</template>



<style>


@media screen and (max-width: 1000px) {
  .textarea {
    width: 100%;
  }

  .image-input {
    width: 90%;
  }


}
</style>


<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';

export default {

  data() {
    return {
      title: "",
      body: "",
      user_id: 11,
      sent: false
    }
  },


  methods: {
    async uploadPost() {
      let formData = new FormData();
      formData.append('image', this.$refs.image.files[0]);
      formData.append('title', this.title);
      formData.append('body', this.body);
      formData.append('user_id', this.user_id);
      try {
        let response = await axios.post('http://localhost:8000/api/v1/article', formData);
        this.sent = true
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      this.uploadPost();
    },
    
    test() {
      console.log(this.body)
    },
  },
  components: {
    NavBar
  }
}
</script>
