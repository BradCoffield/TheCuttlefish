<template>
    <div>hi, i'm EditDatabasesContetTypes.vue {{name}}::prop1={{prop_1}}::prop2={{prop_2}}</div>
</template>

<script>
export default {
    data(){
        return{
            name: "Brad"
        }
    },
    props: ['prop_1', 'prop_2']
}
</script>
