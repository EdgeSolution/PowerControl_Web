<template>
<div class="text-center page_footer">
    <span class="m-r-10">
        © {{releaseDate}} Powered by {{power}} 
    </span>|
    <a href="https://github.com/EdgeSolution/PowerControl_Web.git" class="m-r-10 m-l-5" target="_blank">Web source code address</a>|
    <a href="https://github.com/EdgeSolution/PowerControl_App.git" class="m-r-10 m-l-5" target="_blank">Apk source code address</a>
    <!-- <p>
        Mail: jianfeng.dai@advantech.com.cn , jin.xin@advantech.com.cn
    </p> -->
</div>
    
</template>

<style lang='scss' scoped>
    @import "../../assets/css/colors";
    .page_footer{
        background-color: $nav-bg-color;
        color: $white-color;
        font-size: 13px;
        padding: 5px;
        z-index: 2001;
        position: relative;

        a{
            color: #fff;
            text-decoration:  underline;

        }

        a:hover{
            color: #aaa;
        }
        
    }
   
</style>

<script>
    import {releaseDate, power} from "../../assets/js/constant"
    export default{
        data(){
            return {
                releaseDate,
                power
            }
        }
    }
</script>
