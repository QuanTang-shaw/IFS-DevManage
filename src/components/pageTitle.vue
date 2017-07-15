<template>
	<div class="pageTitle">
		<h2>{{message}}</h2>
	</div>
</template>
<script>
	export default{
		props:['message']
	}
</script>

<style>
	.pageTitle{
		background-color: #b7bdf7;
	    padding: 3px 15px;
	    letter-spacing: 25px;
	    border-radius: 5px;
	}
	.pageTitle h2{
		font-size:30px;
		color: #8c7f7f;
	}
</style>