<template>
  <div class="home" style="text-align: center;">
      <h3>Home Page</h3>

      <div v-if="error">
      Could not fetch the data
      </div>
      <div v-if="documents">
         <ListView :playlists="documents" />
      </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'
export default {
  name: 'HomeView',
  setup()
  {
    const {error, documents}=getCollection('playlists')

    return {
      error,
      documents
    }

  },
  components: {
    ListView
  }
}
</script>
