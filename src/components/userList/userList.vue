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
                        <tr v-for="list in userlists" :key="list.id" v-on:click="visibleTools($event, list.sid)">
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.sid></td>
                            <td v-else>{{list.sid}}</td>
                            
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.name></td>
                            <td v-else>{{list.name}}</td>
                        
                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.grade></td>
                            <td v-else>{{list.grade}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.status></td>
                            <td v-else>{{list.status}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.position></td>
                            <td v-else class="tier_td"><span class="tier">{{list.position}}</span></td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.phone></td>
                            <td v-else>{{list.phone}}</td>

                            <td v-if="toolState.state.modify && list.sid === toolState.id"><input v-bind:value=list.email></td>
                            <td v-else>{{list.email}}</td>

                            <td class="last_td" @click.stop="clickTools($event, list)">
                                <font-awesome-icon icon="edit" v-bind:class="{'move_left' : toolState.state.modify, 'invisible' : toolState.state.delete || toolState.id === -1}" />
                                <font-awesome-icon icon="trash-alt" v-bind:class="{'invisible' : toolState.state.modify || toolState.id === -1}"/>
                           </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
import navigator from "../commons/navigator"

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
            let ele = event.target;
            let icon = null;
            if(!ele.getAttribute('data-icon')){
                ele = ele.parentElement;
            }

            icon = ele.getAttribute('data-icon');
            
            if(icon === "edit"){
                //상태 갱신
                this.updateToolState("modify");

                //modify state가 false일 때 실행하는 함수
                let modify = (ele, list) => {
                 
                }

                if(!this.getToolState('modify'))
                    this.resetToolState();
            }else if(icon === "trash-alt"){
                //상태 갱신
                this.updateToolState("delete");

                var remove = () => {

                }
            } 
        },
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
#table_state{
    width: 100px;
}


</style>
