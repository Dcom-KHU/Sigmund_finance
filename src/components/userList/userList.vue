<template>
    <div id="list_wrapper">
        <navigator/>
        <section id="table_section">
            <div id="table_wrapper">
                <div id="thead_wrapper">
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
                            </tr>
                        </thead>
                    </table>
                </div>
                <div id="tbody_wrapper">
                    <table>
                        <tbody>
                            <tr v-for="list in userlists" :key="list.id">
                                <td>{{list.sid}}</td>
                                <td>{{list.name}}</td>
                                <td>{{list.grade}}</td>
                                <td>{{list.status}}</td>
                                <td>{{list.position}}</td>
                                <td>{{list.phone}}</td>
                                <td>{{list.email}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"},
               {sid:2014104155, name:"채명준", grade:3, status:"재학", email:"cmj9597@naver.com", phone:"01091992137", position:"일반회원"}
           ]
       };
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
    padding: 10px;
    border: 1px solid rgba(0,0,0,.12);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.24), 0 1px 2px 0 rgba(0,0,0,.24);
    max-width: 80%;
}
table{
    table-layout: fixed;
}
tr{
    text-align: left;
}
thead th{
    width: 130px;
    padding-bottom: 10px; 
    border-bottom: 1px solid rgba(0,0,0,.12);
}
#tbody_wrapper{
    height:450px;
    overflow-x:auto;  
}
tbody td{
    width: 130px;
    padding: 8px 0px;
}
tbody tr:hover{
    background-color:aquamarine;
}

</style>
