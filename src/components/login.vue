<template>
    <div id="modal-mask">
        <div id="modal-wrapper">
            <div class="modal-container">
                <div id="content-wrapper">
                    <div class="slot-text" slot="body">
                        <div class="input-wrapper">
                            <input type="text" placeholder="USERNAME">
                        </div>
                    </div>
                    <div class="slot-text" slot="body">
                        <div class="input-wrapper">
                            <input type="text" placeholder="PASSWORD">
                        </div>
                    </div>
                    <div class="slot-submit" slot="body">
                        <div class="submit">Login</div>
                    </div>
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
#modal-mask{
    z-index: 9998;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: -webkit-fill-available;
    height: 100vh;
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
    line-height: 50px;
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

</style>
