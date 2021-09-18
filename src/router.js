// router.js
import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

export default function () {
	return new Router({
		mode: 'history',
		routes: [{
			/*
			 * This (path: '/assetid-:articleid') will be the vue-route used by runtime.
			 * Asset friendly URL will map to this vue route.
			 * path: '/assetid-:articleid',
			 * For local development, use the vue-route as defined below (path: '/'):
			 */
			path: '/',
			component: App,
		}],
	});
}
