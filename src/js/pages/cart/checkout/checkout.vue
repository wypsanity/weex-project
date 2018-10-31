<template>
    <div >
    <stepper step="1" :default-value="numbers" min="1" :read-only="true"
                            @wxcStepperValueCutNumber="cutNumber()" @wxcStepperValueAddNumber="addNumber()"></stepper>    
                            
    </div>
       
</template>
<script>

var navigator = weex.requireModule('bmNavigator')
import stepper from '../stepper.vue'
export default {
    components: {stepper},
    mounted() {
    },
    data() {
        return {
            numbers:10

        }
    },
    created () {
    },
    computed:{

    },
    methods: {
        addNumber(){},
        cutNumber(){}

    }
}
</script>