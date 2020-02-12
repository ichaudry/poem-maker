<template>

  <div class="posts">
    <br>
    <v-container class="table-wrap">
    <h1 class="display-2">Posts</h1>
    <v-divider></v-divider>
    <br>
    
    <div v-if="posts.length > 0" >
        <div v-for="post in posts">
          <p>{{ post.poem.line1}} <br> {{post.poem.line2 }} <br> {{post.poem.line3 }} <br> {{post.poem.line4 }}<br> {{post.poem.line5 }} </p>
          <p class="overline"> {{ post.timeStamp }} </p>
          <br>
          <hr >
         </div>
         </div>
    <div v-else>
      No Posts Yet. Make a new Submission? <br /><br />
      <v-btn :to="{name: 'Home'}"  class="">Create a poem</v-btn>
    </div>
    </v-container>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.getPosts()
      this.posts = response.data.posts
    }
  }
}
</script>


<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
