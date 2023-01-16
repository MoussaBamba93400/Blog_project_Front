
<template>
  <div>
    <NavBar />
    <input type="file" ref="image" @change="uploadImage" />
    <button @click="submit">Submit</button>

    <!-- component -->

  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar.vue';

export default {
  methods: {
    async uploadImage() {
      let formData = new FormData();
      formData.append('image', this.$refs.image.files[0]);
      formData.append('title', "image title");
      formData.append('body', "image body");
      formData.append('user_id', 11);
      try {
        let response = await axios.post('http://localhost:8000/api/v1/article', formData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      this.uploadImage();
    }
  },
  components: {
    NavBar
  }
}
</script>
