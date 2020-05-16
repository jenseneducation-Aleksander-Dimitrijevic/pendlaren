<template>
  <div class="home">
    <form @submit.prevent="searchTravel" :spellcheck="false">
      <div class="form-control">
        <label for="arrival">Res till</label>
        <input
          type="text"
          id="arrival"
          v-model="input.to"
          placeholder="Sök station"
          @click="input.to = ''"
        />
      </div>
      <button>Sök</button>
    </form>

    <form
      id="list-stations"
      v-if="result"
      @submit.prevent="getTimeTable"
      :class="{ 'animate__animated animate__fadeIn': result }"
    >
      <p>Välj station:</p>
      <select v-model="selectedStation">
        <option disabled :selected="false" :style="{ background: '#eee' }"
          >Välj station</option
        >
        <option
          :value="station"
          v-for="(station, index) in result.StopLocation"
          :key="index"
          >{{ station.name }}</option
        >
      </select>
      <button :disabled="isLoading">
        {{ isLoading ? "laddar..." : "Visa avgångar" }}
      </button>
    </form>

    <article
      id="timeTable"
      v-if="timeTable"
      :class="{ 'animate__animated animate__fadeIn': timeTable }"
    >
      <p id="heading">Från {{ timeTable.Departure[0].stop }}</p>
      <ul>
        <li v-for="(timeTable, index) in timeTable.Departure" :key="index">
          <p>{{ timeTable.date }}</p>
          <div>
            <p>{{ timeTable.name }}</p>
            <p>{{ timeTable.time }}</p>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      input: {
        to: "",
      },
      selectedStation: "Välj station",
    };
  },
  props: ["geoLocation"],
  methods: {
    searchTravel() {
      if (this.input.to == "") return;
      this.$store.dispatch("searchTravel", this.input.to);
    },

    getTimeTable() {
      if (this.selectedStation == "Välj station") return;
      this.$store.dispatch("getTimeTable", this.selectedStation);
    },
  },
  computed: { ...mapState(["result", "timeTable", "isLoading"]) },
};
</script>
<style lang="scss" scoped>
.home {
  width: 90%;
  margin: auto;
  max-width: 560px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    .form-control {
      display: flex;
      margin: 1rem 0;
      flex-direction: column;

      label {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      input {
        outline: none;
        font-size: 15px;
        padding: 13px 10px;
        border: 1px solid #ddd;
      }
    }

    button {
      border: none;
      width: 200px;
      outline: none;
      color: #fff;
      cursor: pointer;
      font-size: 15px;
      transition: 0.3s;
      padding: 13px 10px;
      background: rgb(2, 55, 71);
      &:hover {
        background: darken(rgb(2, 55, 71), 5%);
      }
    }
  }

  #list-stations {
    margin-top: 2rem;
    p {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    select {
      width: 100%;
      outline: none;
      font-size: 15px;
      padding: 13px 10px;
      border: 1px solid #ddd;
    }
    button {
      margin-top: 1rem;
    }
  }

  #timeTable {
    margin-top: 2rem;

    p#heading {
      font-size: 1.5rem;
    }

    ul {
      margin-top: 1rem;
      list-style: none;

      li {
        display: flex;
        padding: 15px 5px;
        justify-content: space-between;
        &:nth-child(odd) {
          background: #eee;
        }

        div {
          display: flex;
          p {
            margin: 0 1rem;
          }
        }
      }
    }
  }
}
</style>
