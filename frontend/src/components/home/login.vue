<template>
    <div id="modal-mask" v-bind:class="{'end-modal' : isLoginValid}">
        <div id="modal-wrapper">
            <div class="modal-container">
                <div id="content-wrapper">
                    <div class="slot-text" slot="body">
                        <div class="input-wrapper" v-bind:class="{'input-error' : (!isLoginValid&&firstSumbit)}">
                            <input type="text" placeholder="USERNAME" v-model="typedInfo.name">
                        </div>
                    </div>
                    <div class="slot-text" slot="body">
                        <div class="input-wrapper" v-bind:class="{'input-error' : (!isLoginValid&&firstSumbit)}">
                            <input type="text" placeholder="PASSWORD" v-model="typedInfo.password" v-on:keyup.enter="submit">
                        </div>
                    </div>
                    <div class="slot-submit" slot="body">
                        <div class="submit" v-on:click="submit"><span>Login</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//Vue
import eventBus from '../event/eventBus'

//3rd Party

//User
import { _setSession, _getSession, _get } from '../commons/function'

export default {
    data(){
        return{
            userInfo:{
                name:"admin",
                password:"admin"
            },
            typedInfo:{
                name: "",
                password: "",
            },
            firstSumbit: false,
            isLoginValid: false,
        }
    },
    methods:{
        submit(){
            //로그인 검증
            if(this.userInfo.name === this.typedInfo.name){
                if(this.userInfo.password === this.typedInfo.password){
                    this.isLoginValid = true;

                    _get(`users`)
                    .then((result)=>{
                        _setSession('session', result.data.user_list[0]._id);
                        eventBus.$emit("login", this.isLoginValid);
                    })
                    .catch((error)=>{console.log(error)})
                }
            }
            //로그인 실패 시
            if(this.isLoginValid === false){
                
            }
            this.firstSumbit = true;
        }
    }
}
</script>
<style scoped>
#modal-mask{
    z-index: 9998;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: -webkit-fill-available;
    height: 100vh;
    transition: 0.3s;
}
.end-modal{
    opacity: 0;
}
#modal-wrapper{
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.modal-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-right: 100px;
    width: 584px;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(173, 75, 75, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#content-wrapper{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.input-wrapper{
    padding: 15px 15px 5px 15px;
    border-bottom: 1.5px solid #d7d7d7;
    transition: 0.3s;
}
.input-error{
    border-bottom: 1.5px solid #e94343;
}
.slot-text{
    margin-bottom: 24px;
}
.slot-text input{
    font-size: 24px;
    border: none;
    width: 100%;
    height: 45px;
}
.slot-text input:focus{
    outline: none;
}
.slot-submit{
    margin-top: 50px;
}
.submit{
    width: 60%;
    height: 50px;
    background-color:rgb(197, 16, 107);
    color: #FFFFFF;
    font-size: 24px;
    margin: 0 auto;
    box-shadow: 0 4px 8px 0 rgba(173, 75, 75, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.submit:hover{
    cursor: Pointer;
}
.submit > span{
    line-height: 50px;
    transition: 0.5s;
}
.submit > span:after{
    content: "\00AB";
    position: absolute;
    margin-left: 10px;
    transition: 0.5s;
    opacity: 0;
}
.submit:hover > span{
    padding-right: 25px;
}
.submit:hover > span:after{
    opacity: 1;
    margin-left: 5px;
}

</style>
