<template>
    <div id="list_wrapper">
        <navigator/>
        <section id="table_section">
            <div id="table_wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>학번</th>
                            <th>이름</th>
                            <th>학년</th>
                            <th>재학여부</th>
                            <th>직책</th>
                            <th>핸드폰</th>
                            <th>이메일</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in userlists" :key="list.sid" v-on:click="visibleTools($event, list.sid)" :ref="'tr'+list.sid">
                            <!-- <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.sid></td> -->
                            <td >{{list.sid}}</td>
                            
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.name v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.name}}</td>
                        
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.grade v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.grade}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.status v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.status}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.position v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else class="tier_td"><span class="tier">{{list.position}}</span></td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.phone v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.phone}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.email v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.email}}</td>

                            <td class="last_td" @click.stop="clickTools($event, list)">
                                <i class="fas fa-edit" v-bind:class="{'move_left' : toolState.state.modify, 'invisible' : toolState.state.delete || toolState.id === -1}" ></i>
                                <i class="fas fa-trash-alt" v-bind:class="{'invisible' : toolState.state.delete || toolState.state.modify || toolState.id === -1}"></i>
                                <i class="true-icon" v-bind:class="{'invisible' : !toolState.state.delete}"></i>
                                <i class="false-icon" v-bind:class="{'invisible' : !toolState.state.delete}"></i>
                           </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
import Vue from 'vue';
import navigator from "../commons/navigator";

export default {
    components:{
        navigator
    },
    data(){
        return{
            userlists:[
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104156, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104157, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104158, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104159, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104150, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104151, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104152, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104153, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
               {sid:2014104154, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"normal"},
            ],
            clickedElement: null,
            toolState:{
                id:-1,
                state:{
                    whole: false,
                    modify: false,
                    delete: false
                }
            },
            modifyForm:{
                name : "",
                grade: "",
                status: "",
                email: "",
                phone: "",
                position: ""
            }
       };
    },
    methods:{
        visibleTools(event, list_sid){
            if(list_sid === this.toolState.id)
                return;
                
            //이전 상태 삭제
            this.resetToolState();
            this.updateToolState("whole", list_sid);

            if(event.target.tagName === "Path")
                return;
            
            if(this.clickedElement)
                this.clickedElement.classList.remove('visible');
           
            this.clickedElement = event.target.parentElement.lastChild;
            this.clickedElement.classList.add('visible');
        },
        clickTools(event, list){
            let className = event.target.classList.value;
            console.log(className);
            
            //테이블 수정
            if(className.search("edit") !== -1 || event.key === "Enter"){
                //상태 갱신
                this.updateToolState("modify");

                //modify 상태 start
                if(this.getToolState('modify')){
                    for(status in this.modifyForm){
                        this.modifyForm[status] = list[status];
                    }
                }

                //modify 상태 end (폼 갱신 및 리셋)
                if(!this.getToolState('modify')){
                    for(status in this.modifyForm){
        
                        list[status] = this.modifyForm[status];
                    }
                    this.resetToolState();
                }
            }
            //테이블 삭제
            else if(className.search("trash") !== -1 || className.search("true") !== -1 || className.search("false") !== -1){
                //상태 갱신
                this.updateToolState("delete");

                //삭제 확인
                if(className.search("true") !== -1){
                    for(let index in this.userlists){
                        if(this.userlists[index].sid === list.sid){
                            let refIndex = `tr${list.sid}`;
                            let refEle = this.$refs[refIndex][0];
                            let refEleChild = refEle.children;
                            console.log(this.$refs[refIndex]);
                            console.log(refEle);
                   
                            for(let i = 0; i < refEleChild.length ; i++){
                                refEleChild[i].classList.add('delete');
                            }

                            setTimeout(() => {
                                Vue.delete(this.userlists, index);
                            }, 500);
                            
                            break;
                        } 
                    }
                }
                //삭제 취소
                else if(className.search("false") !== -1){
                    this.resetToolState();
                }

                var remove = () => {

                }
            } 
        },

        //state 관련 method
        printToolState(){
            console.log(this.toolState.id, this.toolState.state.whole, this.toolState.state.modify, this.toolState.state.delete );
        },
        updateToolState(value, ...args){
            this.toolState.state[value] = !this.toolState.state[value];
            
            if(args.length !== 0)  
                this.toolState.id = args[0];
            
            this.printToolState();
        },
        getToolState(value){
            return this.toolState.state[value];
        },
        resetToolState(){
            //modifyForm reset
            for(status in this.modifyForm){
                this.modifyForm[status] = "";
            }

            //상태 reset
            this.toolState.id = -1; 
               
            for(let index in this.toolState.state){
                this.toolState.state[index] = false;
            }

            this.printToolState();
        }
    }
}
</script>
<style scoped>
#table_section{
    display:flex;
    align-items: center;
    justify-content: center;
}
#table_wrapper{
    padding: 10px 5px;
    border: 1px solid rgba(0,0,0,.12);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.24), 0 1px 2px 0 rgba(0,0,0,.24);
    max-width: 80%;
    height:450px;
    overflow-x:auto;  
}
table{
    table-layout: fixed;
}
tr{
    text-align: center;
    user-select: none;
}

/* normal state */
thead th{
    width: 130px;
    padding-bottom: 10px; 
    border-bottom: 1px solid rgba(0,0,0,.12);
}
thead th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:last-child{
    width: 80px;
}
tbody td{
    width: 130px;
    height: 42px;
    padding: 8px 0px;
    transition: 0.35s;
}
tbody td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:last-child{
    width: 80px;
}

/* modify state */
tbody td > input{
   width: 130px; 
   height: 24px; 
   text-align:center;
}
tbody td:nth-child(2) > input, td:nth-child(3) > input, td:nth-child(4) > input, td:nth-child(5) > input{
    width: 80px;
}

.last_td{
    display: none;
}
.last_td > *{
    transition: 0.25s;
}
.last_td *:hover{
    color:#fc2a7b
}
.move_left{
    margin-left:6px;
}
.invisible{
    display: none;
}
.visible{
    display: inline-block;
}
tbody tr:hover td:not(:last-child){
    background-color:aquamarine;
}
.tier{
    background-color: rgba(255, 51, 0, 0.35);
    font-size: 11px;
    padding: 2.5px 5px;
    border-radius: 15px;
}
.true-icon::before{
    content: "\f00c";
    font-family: 'Font Awesome\ 5 Free';
    font-weight: 600;
    font-style: normal;
}   
.false-icon::before{
    content: "\f00d";
    font-family: 'Font Awesome\ 5 Free';
    font-weight: 600;
    font-style: normal;
}   
.delete{
    padding-top: 16px;
    padding-bottom: 0px;
    opacity: 0;
}

</style>
