module.exports = {
	presets: [
		[
			'@vue/cli-plugin-babel/preset',
			{
				useBuiltIns: 'entry',
			},
		],
	],
	plugins: [
		[
			'component',
			{
				libraryName: 'webmd-elements',
				styleLibraryName: 'theme-chalk',
			},
		],
		[
			'@babel/plugin-transform-runtime',
			{
				regenerator: true,
			},
		],
	],
};
