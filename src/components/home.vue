<template>
    <div id="home_wrapper">
        <div>
            <p id="main_text">D.com Finance</p>
        </div>
        <div id="navigator">
            <div>
                <div id="mark"></div>
                <div id="link">
                    <router-link :to="{ name:'usersList'}">UserList</router-link>
                    <router-link :to="{ name:''}">Finance</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
#home_wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100vh;
    background-image: url("../assets/home-background.png");
}
#home_wrapper > div:nth-child(1){
    display: flex;
    align-items: center;
}
#main_text{
    margin: 0px 0px 100px 100px;
    font-size: 80px;
    font-weight: 500;
    color:#FFFFFF;
}
#navigator{
    display: flex;
    align-items: center;
    width:25%;
    background-color:#5d5d5d;
    opacity: 0.95;
}
#navigator > div{
    margin-left: 60px;
    width: 40%;
}
#navigator > div > p{
    color:#FFFFFF;
}
#mark{
    width: 0px;
    height: 0px;
    border: 15px solid #ffffff;
    
    border-right-color:RGB(0,0,0,0);
    border-bottom-color:RGB(0,0,0,0);
    opacity: 0.95;
}
#link{
    display: flex;
    flex-direction: column;
}
#link > *{
    margin-left:35px;
    text-decoration: none;
    color:#ffffff;
    font-size: 25px;
    opacity: 0.95;
}
</style>
