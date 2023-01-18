<template>
    <div class="bg-white p-6 rounded-lg border-2 shadow-lg shadow-blue-500/50 my-8">
      <div class="flex">
        <img class="w-12 h-12 rounded-full mr-4" src="https://via.placeholder.com/150"  />
        <div class="text-sm">
          <p class="text-gray-900 leading-none">{{ comment.name }}</p>
          <p class="text-gray-600">{{ comment.created_at }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-gray-700">{{ comment.body }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      comment: {
        type: Object,
        required: true,
      },
    },
  };
  </script>