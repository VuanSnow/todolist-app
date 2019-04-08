<template>
  <div class="text-xs-center">
    <v-card-title class="justify-center" primary-title>
      <v-icon color="#5E35B1" class="title-icon">fas fa-quote-right</v-icon>
      <h2>Inspirational Quote</h2>
    </v-card-title>
    <v-card-title class="justify-center" style="margin-bottom: -1em;" v-html="title"/>
    <v-card-text v-html="quote" style="margin-bottom: -20px;"/>
    <v-btn flat small color="primary" class="mb-2" :href="link" target="_blank">link to quote</v-btn>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      quote: '',
      link: ''
    }
  },
  beforeMount() {
    this.$axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        {
          headers: {
            'Access-Control-Allow-Headers': 'x-requested-with, x-requested-by'
          }
        }
      )
      .then(result => {
        const { title, content, link } = result.data[0]
        this.title = title
        this.quote = content
        this.link = link
      })
  }
}
</script>