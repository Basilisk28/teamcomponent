<template>
	<div>
		<PageData/>
		<NoSsr>
			<Omniture :notPageview="true"/>
		</NoSsr>
		<WebmdButton type="primary">WEBMD BUTTON</WebmdButton>
		<!--<ExampleSubComponent :rss="RssData"></ExampleSubComponent>-->
		<NoSsr>
			<p>This line does NOT render server side because its wrapped between &lt;NoSsr&gt; tags.</p>
		</NoSsr>
	</div>
</template>

<script>
import NoSsr from 'vue-no-ssr';
import PageData from 'webmd-page-common/src/Component.vue';
import { Button } from 'webmd-elements';

// import ExampleSubComponent from './components/ExampleSubComponent.vue';

export default {
	data() {
		return {
			// msg: 'This is a vue Page',
		};
	},

	components: {
		// ExampleSubComponent,
		PageData,
		NoSsr,
		WebmdButton: Button
	},

	props: {
		pageData: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	computed: {
		/*
		 * RssData() {
		 *   return this.pageData
		 * },
		 */
	},
};
</script>

<style lang="scss" scoped>
</style>
