<template>
    <div >
    <stepper step="1" :value="item" min="1"
                            @wxcStepperValueCutNumber="cutNumber" @wxcStepperValueChanged="wxcButtonClicked" @wxcStepperValueAddNumber="addNumber"></stepper>    
    <wxc-button text="确定"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
    </div>
       
</template>
<script>

var navigator = weex.requireModule('bmNavigator')
import { WxcButton } from 'weex-ui'
import stepper from '../stepper.vue'
export default {
    components: {stepper,WxcButton},
    mounted() {
    },
    data() {
        return {
            item:{numbers:4}

        }
    },
    created () {
    },
    computed:{

    },
    methods: {
        addNumber(item){
            this.$notice.toast({
                message: item.numbers
            })
        },
        cutNumber(item){
            var that = this;
            this.$notice.toast({
                message: item.numbers
            })
        },
        wxcButtonClicked(item){
            var that = this;
            this.$notice.toast({
                message: item.numbers
            })
        }

    }
}
</script>