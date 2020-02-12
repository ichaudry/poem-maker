<template>
  <div class="home">
    <v-container> 
       <v-card
    class="mx-auto"
    max-width="500"
  >

  <v-card-title class="headline mb-1 justify-center">Please Input</v-card-title>
      <v-form class="px-3" ref="form">
        <v-row>
          <v-col>
          <v-text-field label="Noun" :rules="inputRules" v-model="noun_1" ></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Noun" :rules="inputRules" v-model="noun_2"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Noun" :rules="inputRules" v-model="noun_3"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          <v-text-field label="Adjective" :rules="inputRules" v-model="adjective_1"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Adjective" :rules="inputRules" v-model="adjective_2"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Adjective"  :rules="inputRules"  v-model="adjective_3"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
          <v-text-field label="Adverb" :rules="inputRules"  v-model="adverb_1"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Adverb" :rules="inputRules" v-model="adverb_2"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Adverb" :rules="inputRules"  v-model="adverb_3"></v-text-field>
          </v-col>
        </v-row>
          <v-row>
          <v-col>
          <v-text-field label="Preposition" :rules="inputRules" v-model="preposition_1"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Preposition" :rules="inputRules" v-model="preposition_2"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Preposition" :rules="inputRules" v-model="preposition_3"></v-text-field>
          </v-col>
        </v-row>
         <v-row>
          <v-col>
          <v-text-field label="Verb"  :rules="inputRules" v-model="verb_1"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Verb" :rules="inputRules" v-model="verb_2"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field label="Verb" :rules="inputRules"  v-model="verb_3"></v-text-field>
          </v-col>
        </v-row>
        </v-form>

        <v-card-actions class="justify-center">
      <v-btn type='submit' @click="addPost" class="primary">Submit</v-btn>
    </v-card-actions>
       </v-card>
    </v-container>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'addpost',
  data () {
    
    return {
      //Input validation 
      inputRules: [
        v => !!v >0 || 'Input Required',
        v => /^[A-Za-z]+$/.test(v) || 'English Alphabets only!'
      ],
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
      timeStamp: '',
    }
  },

  //Calls the addPost method to send inputted data to the server 
  methods: {
    async addPost () {
      if(this.$refs.form.validate()){
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
        timeStamp: PostsService.createTimeStamp()
      }),
      this.$router.push('Posts')
}
  }
}
}
</script>
