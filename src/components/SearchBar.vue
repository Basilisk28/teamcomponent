<template>
    <div class="wrapper">
      <div class="search-input">
        <input type="text" placeholder="Search" class="search" autocomplete="off" spellcheck="false" v-model="user" @focus="modal=true">
        <div class="autocom-box" v-if="filteredusers && modal">
            <ul class="ul">
                <li class="suggestionbox" v-for="filtereduser in filteredusers" :key="filtereduser" @click="setuser(filtereduser)">{{ filtereduser }}</li>
            </ul>
        </div>
        <div class="icon" @click="modal=false"></div>
      </div>
      <div class="Seeall" v-if="!modal">
          <span class="SEE-ALL">SEE ALL</span>
      </div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            user: '',
            modal: false,
            users: ['Aiman', 'Divyanshu', 'Devanshu', 'Farmaan', 'Gaurav', 'Meraj', 'Somya',
             'Swati', 'Shriyam', 'Zubair'
            ],
            filteredusers: ['Aiman', 'Divyanshu', 'Devanshu'],
        }
    },

    methods: {
        filterusers() {
            this.filteredusers = this.users.filter(user =>{
                return user.toLowerCase().startsWith(this.user.toLowerCase())
            })
        },
        setuser(user){
            this.user=user;
            this.modal=false;
        }
    },
    watch: {
        user(){
            this.filterusers();
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
.wrapper{
  width: 350px;
  margin: auto;
  background: lightgray; 
  /* justify-content: center; */
  /* justify-items: center; */
  /* align-items: center; */

}
.wrapper .search-input{
  background: lightgray; 
  width: 350px;
  margin: auto;
  border-radius: 10px;
  position: relative;
  text-align: center;
  margin-top: 30px;
  box-shadow:auto rgba(0,0,0,0.12);
  /* cursor: pointer; */
  display: flex;
  flex-direction: column;

}
.search{ 
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Raleway;
    font-size: 1.313rem;
    /* margin-bottom: .715em; */
    -webkit-transition: border-color .15s ease;
    transition: border-color .15s ease;
    width: 100%;
    font-weight: 400;
    color: #333333;
    line-height: normal;
    height: 2.5rem;
    position: relative;
}

.search-input input{
    height: 43px;
    width: 350px;
    outline: rgb(0, 67, 94);
    border: none;
    border-radius: 60px;
    padding: 0px 0px 0px 50px;
    font-size: 18px;
    background: lightgray;
    color: rgb(1, 8, 8);
    -webkit-box-shadow: 0px 1px 5px rgb(132 122 133 / 10%);
    box-shadow: 0px 1px 5px rgb(132 122 133 / 10%);
    border: solid 2px #666;
}
.icon{
    position: absolute;
    width: 20px;
    height: 15px;
    background: lightgray;
    border-radius: 60px;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    -webkit-box-shadow: rgb(214, 236, 9);
    box-shadow: rgb(214, 236, 9);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    top: 15px;
    left: 17px;
    text-align: center;
    font-size: 20px;
    
}
.SEE-ALL:hover{
    color: black;
}
.icon::before{
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border: 3px solid rgb(156, 155, 155);
    border-radius: 50%;
    transform: translate(-3.5px, -3.5px) rotate(315deg);
}

.icon::after{
    content: '';
    position: absolute;
    width: 2px;
    height: 9px;
    background: rgb(156, 155, 155);
    transform: translate(6px, 6px) rotate(315deg);
}
.suggestionbox{
    list-style: none;
    padding: 2px;
    /* margin-top: 0px; */
    /* padding-left: 55px; */
    padding-bottom: 15px;
    width: 95%;
    height: 20px;
    font-family: Raleway;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: normal;
    position: auto;
    cursor: default;
    text-align: left;
    background: rgb(252, 253, 252);
    
}
.wrapper .search-input .autocom-box{
    max-height: 10rem;
    /* padding: .625rem 0; */
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    
    background-color: rgb(255, 255, 255);
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    z-index: 100;
}
.autocom-box::-webkit-scrollbar{
    display: none;

}
.wrapper .search-input .autocom-box .ul{
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;
}
.autocom-box li:hover{
    background: #ffdb10;
    align-items: left;
    justify-items: center;
    width: 95%;
    height: 20px;
    border: 0px solid rgb(179, 178, 178);
    margin-inline-end: 5px;
}
.wrapper .Seeall{
    background-color: lightgray;
    text-align: center;
    margin-top: 17.9px;
    padding-bottom: 20px;
}
.SEE-ALL {
  /* width: auto;
  height: 20px;
  position: absolute;
  top: 40px;
  left: 135px;
  margin: 23px 0px 0px;
  padding-top: 0px; */
  font-family: Raleway;
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: 0.43px;
  cursor: pointer;
  text-align: center;
  color: var(--dark-grey-blue);
}


</style>
