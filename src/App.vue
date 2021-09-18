<template>
	<div id="app">
		<!-- <h1>Edit this App.vue file</h1> -->
		<HeliosTeam />
	</div>
</template>

<script>

// import MyComponent from './Component.vue';
import HeliosTeam from './components/helios-teammodule.vue';

export default {
	components: {
		// MyComponent
		HeliosTeam
	},

	/*
	 * asyncData({ store }) {
	 * return store.dispatch('getPosts');
	 * },
	 */

	computed: {
		/*
		 * RssData() {
		 *     return this.$store.state.posts;
		 * },
		 */
	},
};
</script>
