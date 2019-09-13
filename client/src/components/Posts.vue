<template>
  <div class="posts">
    <router-link v-bind:to="{ name: 'addpost' }" class="add_post_link">Create a poem</router-link>
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <table>
        <tr>
          <td>Date</td>
          <td width="550">Poems</td>
        </tr>
        <tr v-for="post in posts">
          <td align="center">{{ post.timeStamp }}</td>
          <td align="center"><p>{{ post.poem.line1}} <br> {{post.poem.line2 }} <br> {{post.poem.line3 }} <br> {{post.poem.line4 }}<br> {{post.poem.line5 }}</p></td>
        </tr>
      </table>
    </div>
    <div v-else>
      No Posts Yet. Make a new Submission? <br /><br />
      <router-link v-bind:to="{ name: 'addpost' }" class="add_post_link">Create a poem</router-link>
    </div>
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
    },
    async deletePost (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        PostsService.deletePost(id)
        $this.$router.go({
          path: '/'
        })
      })
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
