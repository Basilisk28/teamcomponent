import Vue from 'vue';
import Vuex from 'vuex';

// import axios from 'axios';

Vue.use(Vuex);

export default function () {
	return new Vuex.Store({
		state: {
			// posts: {},
		},
		mutations: {
			/*
			 * POSTS: (state, posts) => {
			 *   state.posts = posts;
			 * }
			 */
		},
		actions: {
			/**
			 * TODO: remove the below code and replace it according to your use case
			 * @param commit
			 * @returns {Promise<T | never>}
			 */
			/*
			 * getPosts: ({ commit }) => axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
			 *   if (response.statusText === 'OK') {
			 *     commit('POSTS', response.data);
			 *   }
			 * }).catch((error) => {
			 *   console.log(error);
			 * })
			 */
		},
	});
}
