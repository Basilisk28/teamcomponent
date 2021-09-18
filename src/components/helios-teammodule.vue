<template>
    <div class="container">
            <div class="row">
                <div class="title">
                    <h1>the <strong>team</strong></h1>
                    <hr width="196px;" color="#fdee00" size="13">
                </div>
            </div>
            <Teamsection />
            <Searchbar />
        </div>
</template>

<script>

import Teamsection from './Teamsection.vue'
import Searchbar from './SearchBar.vue';
export default {
    components:{
        Teamsection,
        Searchbar
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');

.container{
    width: 100%;
    height: 510px;
    background-color: lightgrey;
}
.container .row{
    width: 80%;
    margin: auto;
}
.container .row .title{
    text-align: center;
}
.container .row .title h1{
    font-family: 'Raleway', sans-serif;
    font-size: 43px;
    font-style: normal;
    font-weight: 200;
    letter-spacing: 1.08px;
    font-stretch: normal;
    line-height: 0.93;
    color: #314566;
    margin-block: auto;
    padding-top: 24.1px;
}
.container .row .title hr{
    margin-top: -11px;
}
@media screen and (max-width: 257px){
    hr{
        width: 120px;
    }
}
</style>
