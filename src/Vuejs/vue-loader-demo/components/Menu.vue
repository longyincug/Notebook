<template>
    <div>
    <hr /><br />
    <strong>这里是App组件中的Menu组件</strong>
    <ul>
        <li v-for="val in list">{{val}}</li>
    </ul>
    </div>
</template>
<script>
	export default{
	    data(){
	        return {
	            list:['apple','banana','orange']
	        }
	    }
	}
</script>