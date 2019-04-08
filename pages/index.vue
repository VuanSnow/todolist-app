<template>
  <div>
    <v-layout>
      <v-flex xs4 sm4 ma-2 row>
        <v-card>
          <v-card-title class="justify-center" primary-title>
            <v-icon color="#5E35B1" class="title-icon">fas fa-tasks</v-icon>
            <h2>Progress</h2>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center">
              <span class="grey--text">{{ toDoDonePercentage }} done! {{ undone }} more task to go!</span>
              <v-progress-linear height="20" v-model="toDoDonePercentage" :color="progressBarColor">
                <div class="d-flex justify-space-between white--text px-2">
                  <span>{{ toDoDonePercentage }}</span>
                </div>
              </v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 sm4 ma-2>
        <v-card>
          <v-card-title class="justify-center" primary-title>
            <v-icon color="#5E35B1" class="title-icon">far fa-clock</v-icon>
            <h2>Today</h2>
          </v-card-title>
          <div class="text-xs-center">
            <v-card-text>
              {{ time }}
              <v-spacer></v-spacer>
              {{$moment().format('LL')}}
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs4 sm4 ma-2>
        <v-card>
          <quote-app/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm12 ma-2 mt-3>
        <v-card class="mt-3 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto pt-2 pb-2"
            color="teal accent-2"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <LineChart :data="chartData" :options="options" style="height: 200px;"/>
          </v-sheet>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2 text-xs-center">
              <h3>Tasks done (last 7 days)</h3>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Quote from '@/components/Quote'
import LineChart from '@/components/line-chart'

export default {
  data: function() {
    return {
      value: [0, 0, 0, 0, 0, 0, 0, 0],
      dates: [],
      dataLoaded: false,
      time: '',
      chartData: {
        labels: [],
        fill: false,
        datasets: [
          {
            label: 'Tasks Done',
            backgroundColor: '',
            data: [],
            borderWidth: 1,
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            borderColor: '#4527A0'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  if (value % 1 === 0) {
                    return value
                  }
                }
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    quoteApp: Quote,
    LineChart
  },
  methods: {
    getToDoDoneInOneWeek: function() {
      this.todos.map(v => {
        this.dates.forEach((p, i) => {
          if (p === v.dateDone) {
            this.value[i] += 1
          }
        })
      })
      this.chartData.datasets[0].data = this.value
    },
    getOneWeekFromToday: function() {
      for (let i = 7; i >= 0; i--) {
        const date = this.$moment()
          .subtract(i, 'days')
          .format('DD/MM')
        this.dates.push(date)
        this.chartData.labels.push(date)
      }
    }
  },
  computed: {
    ...mapGetters(['todos']),
    toDoDone: function() {
      return this.todos.filter(i => i.done).length
    },
    undone: function() {
      return this.todos.filter(todo => !todo.done).length
    },
    toDoTotal: function() {
      return this.todos.length
    },
    toDoDonePercentage: function() {
      return ((this.toDoDone / this.toDoTotal) * 100).toFixed() + '%'
    },
    progressBarColor: function() {
      const percentage = parseInt(this.toDoDonePercentage)

      if (percentage <= 25) {
        return 'red'
      } else if (percentage <= 50) {
        return 'orange'
      } else if (percentage <= 75) {
        return 'blue'
      } else if (percentage <= 99) {
        return 'green'
      } else if (percentage === 100) {
        return '#24FE8A'
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('getTodos')
  },
  beforeMount: function() {
    this.getOneWeekFromToday()
    this.getToDoDoneInOneWeek()
    this.dataLoaded = true

    setInterval(() => {
      this.time = this.$moment().format('LTS')
    }, 1000)
  }
}
</script>
<style>
.v-progress-linear,
.v-sheet {
  border-radius: 4px;
}
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.title-icon {
  margin-right: 5px;
}
</style>