<template>
    <div>
    <h1>Welcome to Vue ^_^</h1>
    <strong @click="change">{{msg}}</strong>
    <my-menu></my-menu>
    </div>
</template>


<script>
    import Menu from './components/Menu.vue'
    export default{
        data(){
            return {
                msg:'hello world~'
            }
        },
        methods:{
            change(){
                alert('你好呀~');
                this.msg = 'How are you?';
            }
        },
        //注册子组件
        components:{
            'my-menu':Menu
        }
    }
</script>

<style>
	body{
	    background-color: #CCCCCC;
	}
</style>


