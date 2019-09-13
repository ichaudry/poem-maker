<template>
  <div class="container ">
  <h2>POEM GENERATOR</h2>
  <p>Please input the following constraints in order to generate a peom.</p>
  
  
  <form class="form-inline container d-flex justify-content-center">
    <div class="row">
    <div class="form-group mr-2">
        <label class="sr-only" for="input">Noun</label>
         <input type="text" class="form-control" name="" placeholder="Noun" v-model="noun_1">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">Noun</label>
        <input type="text" class="form-control" name="" placeholder="Noun" v-model="noun_2">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">Noun</label>
        <input type="text" class="form-control" name="" placeholder="Noun" v-model="noun_3">
    </div>
    </div>

    <div class="row top-buffer">
   <div class="form-group mr-2">
        <label class="sr-only" for="input">adjective</label>
         <input type="text" class="form-control" name="" placeholder="Adjective" v-model="adjective_1">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">adjective</label>
        <input type="text" class="form-control" name="" placeholder="Adjective" v-model="adjective_2">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">adjective</label>
        <input type="text" class="form-control" name="" placeholder="Adjective" v-model="adjective_3">
    </div>
</div>


<div class="row top-buffer">
<div class="form-group mr-2">
        <label class="sr-only" for="input">adverb</label>
         <input type="text" class="form-control" name="" placeholder="Adverb" v-model="adverb_1">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">adverb</label>
        <input type="text" class="form-control" name="" placeholder="Adverb" v-model="adverb_2">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">adverb</label>
        <input type="text" class="form-control" name="" placeholder="Adverb" v-model="adverb_3">
    </div>
</div>

<div class="row top-buffer">
<div class="form-group mr-2">
        <label class="sr-only" for="input">preposition</label>
         <input type="text" class="form-control" name="" placeholder="Preposition" v-model="preposition_1">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">preposition</label>
        <input type="text" class="form-control" name="" placeholder="Preposition" v-model="preposition_2">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">preposition</label>
        <input type="text" class="form-control" name="" placeholder="Preposition" v-model="preposition_3">
    </div>
  </div>

<div class="row top-buffer">
<div class="form-group mr-2">
        <label class="sr-only" for="input">verb</label>
         <input type="text" class="form-control" name="" placeholder="Verb" v-model="verb_1">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">verb</label>
        <input type="text" class="form-control" name="" placeholder="Verb" v-model="verb_2">  
    </div>
    <div class="form-group mr-2">
        <label class="sr-only" for="input">verb</label>
        <input type="text" class="form-control" name="" placeholder="Verb" v-model="verb_3">
    </div>
    </div>

</form>
<div class="row top-buffer d-flex justify-content-center">
          <button class="app_post_btn" @click="addPost">Add</button>
    </div>
</div>
</template>

<script>
import PostsService from '@/services/PostsService'

function createTimeStamp () {
  var newDate = new Date()
  var month = newDate.getMonth()
  var date = newDate.getDate()
  var year = newDate.getFullYear()
  var hours = newDate.getHours()
  var amOrPm = 'am'
  if (hours > 12) {
    hours = hours - 12
    amOrPm = 'pm'
  }
  var minutes = newDate.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  var calDate = month + '-' + date + '-' + year
  var time = hours + ':' + minutes + ' ' + amOrPm

  return calDate + '  ' + time
}

export default {
  name: 'addpost',
  data () {
    return {
      noun_1: '',
      noun_2: '',
      noun_3: '',
      adjective_1: '',
      adjective_2: '',
      adjective_3: '',
      adverb_1: '',
      adverb_2: '',
      adverb_3: '',
      preposition_1: '',
      preposition_2: '',
      preposition_3: '',
      verb_1: '',
      verb_2: '',
      verb_3: '',
      // poem: '',
      timeStamp: ''
    }
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        noun_1: this.noun_1,
        noun_2: this.noun_2,
        noun_3: this.noun_3,
        adjective_1: this.adjective_1,
        adjective_2: this.adjective_2,
        adjective_3: this.adjective_3,
        adverb_1: this.adverb_1,
        adverb_2: this.adverb_2,
        adverb_3: this.adverb_3,
        preposition_1: this.preposition_1,
        preposition_2: this.preposition_2,
        preposition_3: this.preposition_3,
        verb_1: this.verb_1,
        verb_2: this.verb_2,
        verb_3: this.verb_3,
        // poem: '',
        timeStamp: createTimeStamp()
      })
      this.$swal(
        'Great!',
        `Your post has been added!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  }
}

</script>

<style type="text/css">
input[type="text"]::placeholder {  
 text-align: center; 
 }
  .top-buffer { margin-top:20px; }
</style>
