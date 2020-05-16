<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
body,
::placeholder,
select,
input {
  font-family: "Open Sans", sans-serif;
}
</style>
