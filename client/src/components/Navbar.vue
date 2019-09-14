<template>
    <nav>
    <v-toolbar flat app dark>
      <v-toolbar-title class="headline text-uppercase grey--text mr-6">
        <span class="font-weight-light">poem</span>
        <span >maker</span>
      </v-toolbar-title>
   
    <v-btn  :to="{name: 'Home'}" class="mr-4">
        <span>Create Poem</span>
      </v-btn>

      <v-btn  :to="{name: 'Posts'}" class="mr-4">
        <span>Poems</span>
      </v-btn>

      <v-btn  :to="{name: 'About'}" >
        <span>About</span>
      </v-btn>
    </v-toolbar>
    </nav>
</template>

<script>
export default {
    
}
</script>