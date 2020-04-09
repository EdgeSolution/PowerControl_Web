<template>
    <div class="cf">
        <el-col :span="4" :offset="2">
            <mode-switch @mode-status="changeMode" class="modeSwitch"></mode-switch>
            <select-group 
            @select-getDeviceOptions="getGroupOption" 
            @select-getGroupName="getGroupName" 
            :isSingleMode="isSingleMode">
            </select-group>
            <select-device 
            @select-device="getDeviceOption"
            @isOfflineDev="isOfflineDev" 
            :isSingleMode="isSingleMode"
            :isDisabledOffDev="isDisabledOffDev">
            </select-device>
            <div class="info" v-show="!isInstalled&& defIsShow">
                Power control app is not installed.</br>
                It can be installed through App Manager on AndroidDM
            </div>

            <div class="switchApp" v-show="isSingleMode&& isInstalled&& defIsShow">
                <span>
                    Power Control App({{versionName}}):
                </span>
                
                <el-switch
                v-model="isRunning"
                :disabled="isRunning"
                @change="switchSolutionApp()">
                </el-switch>
            </div>
        </el-col>
        <el-col :span="16" class="m-t-20" >
            <single-control 
            :selectedAgentId="selectedAgentId" 
            :isSingleMode="isSingleMode"
            @isDisabled="isDisabled"
            @isRunSuccess="isRunSuccess"
            :isOffline="isOffline"
            :isRunning="isRunning"
            ref="powerControl"
            >
            </single-control>
            <batch-control 
            :selectedAgentsData="selectedAgentsData" 
            :isSingleMode="isSingleMode"
            :groupname="groupname"
            :isRunning="isRunning"
            ></batch-control>
        </el-col>
    </div>
</template>
<style lang="scss" scoped>
   
    // .modeSwitch{
    //     position: absolute;
    //     top: 20px;
    //     right: 3px;
    // }

    .switchApp{
        margin-top: 20px;
        text-align: center;
        span{
            display: inline-block;
            margin-right: 10px;
            font-weight: 500;
            color: #303133;
        }
    }

    .appVersion{
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        color: #aaa;
    }

    .info{
        margin-top: 20px;
        text-align: center;
        font-size: 13px;
        color: #d9534f;
    }
    
</style>


<script>
    import selectDevice from '../../common/select-device'
    import modeSwitch from "../../common/mode-switch"
    import selectGroup from "../../common/select-group"
    import singleControl from "./powerControlDetails/single"
    import batchControl from "./powerControlDetails/batch"

    import {
        getSolutionAppValueApi,
        setSolutionAppValueApi,
        reSetSolutionAppValue,
        batchSetSolutionAppValue
    } from "../restfulapi/solutionAppApi"
    import handleResponse from '@/components/restfulapi/handleResponse'
    import { appControl } from '../../assets/js/lwm2mMap'

    export default{
        name: "timerSwitch",
        data(){
            return {
                selectedAgentId: '',
                selectedAgentsData: [],
                isSingleMode: true,
                groupname: '',
                //offline device is disabled
                isDisabledOffDev: true,
                //selectedAgent is offline
                isOffline: false,
                appSecurityIconColor: "#303133",
                pkgname: "com.adv.poweronoff",
                isRunning: false,
                versionName: "",
                isInstalled: false,
                defIsShow: false
            }
        },
        components:{
            selectDevice,
            selectGroup,
            modeSwitch,
            singleControl,
            batchControl
        },
        methods:{

            getDeviceOption(selectedAgentId){ 
                this.selectedAgentId = selectedAgentId;
            },

            getGroupOption(selectedAgentsData){
                this.selectedAgentsData = selectedAgentsData;
            },

            initData(){
                this.selectedAgentId = "";
                this.groupname = "";
                this.selectedAgentsData = [];
            },

            changeMode(val){
                this.initData();
                this.isSingleMode = val
            },

            getGroupName(groupname){
                this.groupname = groupname;
            },

            isDisabled(value){
                this.isDisabledOffDev = value;
            },
            isOfflineDev(value){
                this.isOffline = value
            },

            getSolutionAppIsRunning(){
                if(this.isSingleMode){
                    if(this.selectedAgentId == ""){
                        console.error("selectAgentId is empty");
                        return;
                    }
                }else{
                    if(this.selectedAgentsData.length == 0){
                        console.error("all device is offline");
                        return;
                    }
                }
                
                let data= {
                    appname: this.pkgname,
                    funcid: "",
                    param: "" 
                }
                let selectedAgentId = "";
                if(this.isSingleMode){
                    selectedAgentId = this.selectedAgentId;
                }else{
                    selectedAgentId = this.selectedAgentsData[0].value;
                }
                getSolutionAppValueApi(selectedAgentId, appControl.isRunning, data).then((obj) => {
                    handleResponse(obj, (res) => {
                        if(res.status === "CONTENT"){
                            let solutionAppInfo = JSON.parse(res.content.value);
                            let isInstalled = solutionAppInfo.isInstalled;
                            let isRunning = solutionAppInfo.isRunning;
                            let versionName = solutionAppInfo.versionName;
                            this.isInstalled = isInstalled == "true"? true: false;
                            if(this.isInstalled){
                                this.versionName = versionName;
                                this.isRunning = isRunning == "true"? true: false;
                            }
                            
                        }
                    })
                })
            },

            isRunSuccess(val){
                this.isRunning = val
            },

            switchSolutionApp(){
                if(this.isRunning){
                    this.$refs.powerControl.startSolutionApp();
                }else{
                    this.$refs.powerControl.stopSolutionApp();
                }
            }
            
        },
        watch: {
            selectedAgentId(val){
                if(val){
                    this.defIsShow = true;
                    this.getSolutionAppIsRunning();
                }
            },

            selectedAgentsData(val){
                if(val.length>0){
                    this.defIsShow = true;
                    this.getSolutionAppIsRunning();
                }
            }
        },

    }
</script>


