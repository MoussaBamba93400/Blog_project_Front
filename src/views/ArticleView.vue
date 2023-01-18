<template>
    <div>
    <NavBar />
    
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'


export default {

    components: {
        NavBar
    },
    mounted() {
    
        axios.get('')

    }
}

</script>
