<template>
    <div id="list_wrapper">
        <navigator/>
        <section id="control_section">
            <i id="add_user" class="far fa-plus-square" v-on:click="clickAddUser($event)"></i>
            <div id="search_user">
                <select v-model="selectValues[0].form">
                     <option v-for="option in searchOptions[0].options" :key="option.id">{{option}}</option>
                </select>
                <select v-model="selectValues[1].form">
                    <option v-for="option in searchOptions[1].options" :key="option.id">{{option}}</option>
                </select>
                <select v-model="selectValues[2].form">
                     <option v-for="option in searchOptions[2].options" :key="option.id">{{option}}</option>
                </select>
                <i class="fas fa-search" v-on:click="clickSearchUser($event)"></i>
            </div>
        </section>
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
                        <tr v-for="list in userlists" :key="list.sid" v-on:click="visibleTools(list.sid)" :ref="'tr'+list.sid">
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-model=modifyForm.sid v-on:keyup.enter="clickTools($event, list)"></td>
                            <td v-else>{{list.sid}}</td>
                            
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
                    delete: false,
                    add: false,
                }
            },
            modifyForm:{
                sid : "",
                name : "",
                grade: "",
                status: "",
                email: "",
                phone: "",
                position: ""
            },
            selectValues:[
                {form: '학년'},
                {form: '재학여부'},
                {form: '직책'},
            ],
            searchOptions:[
                {options:['학년','1','2','3','4']},
                {options:['재학여부','재학','휴학','군휴학','졸업','휴면',]},
                {options:['직책','일반회원', '회장', '부회장', '총무', '교육부장', '청소부장']},
            ],
            test: 'test'
        };
    },
    methods:{
        clickAddUser(event){
            let tempId = 0;
            let refIndex = `tr${tempId}`;

            if(this.resetToolState() === -1){return;}

            this.$set(this.userlists, this.userlists.length, 
            {
                sid:tempId,
                name:"", 
                grade:"", 
                status:"", 
                email:"", 
                phone:"", 
                position:""
            });

            this.visibleTools(tempId);
            this.updateToolState("whole",tempId);
            this.updateToolState("modify");
            this.updateToolState("add");

            //추가된 list를 찾아서 버튼 활성화
            this.$nextTick(()=>{
                this.$refs[refIndex][0].lastChild.classList.add('visible');

                //포커싱
            })
        },
        clickSearchUser(event){
            if(this.resetToolState() === -1){return;}

            for(let value of this.selectValues){
                console.log(value.form);
            }
                
            //To-do 서버 연동
            /*let baseURI = ;
            
            axios.get(baseURI, {
                params:{
                    keyword: data
                },  
                headers:{
                    'Content-Type': 'application/json',
                    'x-api-key': confidential.aws_apikey
                }
            })
            .then((result) => {
                console.log(result);
                eventBus.$emit('getWord', result.data);
            })
            .catch((error) => {
                console.log("fail")
                console.log(error)
            })*/
        },
        visibleTools(list_sid){
            if(list_sid === this.toolState.id)
                return;
                
            //이전 상태 삭제
            if(this.resetToolState() === -1){return;}
            this.updateToolState("whole", list_sid);
            
            if(this.clickedElement)
                this.clickedElement.classList.remove('visible');
           
            this.clickedElement = event.target.parentElement.lastChild;
            this.clickedElement.classList.add('visible');
        },
        clickTools(event, list){
            let className = event.target.classList.value;
            
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
                else if(!this.getToolState('modify')){
                    //폼 체킹
                    if(this.checkIsFullForm() === -1){
                        this.updateToolState("modify");
                        return;
                    }
                    for(status in this.modifyForm){
                        list[status] = this.modifyForm[status];
                    }
                    if(this.resetToolState("f") === -1){return;}
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
                   
                            for(let i = 0; i < refEleChild.length ; i++){
                                refEleChild[i].classList.add('delete');
                            }

                            setTimeout(() => {
                                this.$delete(this.userlists, index);
                            }, 500);
                            
                            break;
                        } 
                    }
                }
                //삭제 취소
                else if(className.search("false") !== -1){
                    if(this.resetToolState() === -1){return;}
                }
            } 
        },
        checkIsFullForm(){
            for(let index in this.modifyForm){
                if(this.modifyForm[index] === ""){
                    alert("모든 폼을 채워주세요.")
                    return -1;
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
        resetToolState(...option){
            if(option.length !==0){
                //f
            }else{
                if(this.getToolState('add')){
                    alert("현재 추가 중인 폼이 있습니다.")
                    return -1;
                }
            }

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
#list_wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#list_wrapper > *{
    width:850px;
}
/* about control */
#control_section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
}
#add_user{
    font-size: 25px;
    transition: 0.2s;
    color: #999;
}
#add_user:hover{
    color:#fc2a7b;
}
#search_user > select{
    width: 100px;
    height: 25px;
    font-size: 12px;
    color: #999;
    border: 1.5px solid #ddd;
}
#search_user > i{
    margin-left: 15px;
    color: #999;
}
#search_user > i:hover{
    color: #fc2a7b;
}


/* about table */
#table_wrapper{
    padding: 10px 5px;
    border: 1px solid rgba(0,0,0,.12);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.24), 0 1px 2px 0 rgba(0,0,0,.24);
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
