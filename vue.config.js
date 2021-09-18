/* eslint-disable no-console,no-param-reassign */
const path = require('path');

// to import only during build
const PurgecssPlugin = process.env.ENV ? '' : require('purgecss-webpack-plugin');
const glob = process.env.ENV ? '' : require('glob-all');
const { appid } = require('./kubeconfig.json');
const { name } = require('./package.json');
// eslint-disable-next-line
const metric = name === 'webmd-vuejs-metrics' ? require('./src/js/directives/ssr-directive.es6') : require('webmd-vuejs-metrics/src/js/directives/ssr-directive.es6');
const versions = require('./versions.json');

const isProd = process.env.NODE_ENV === 'production';
const errorUrl = 'https://www.webmd.com/500';
const publicPath = isProd ? `/static_vue/${appid}/` : '/';
const outputDir = `dist/${appid}/`;

const CMSpurgeCSSEnabledApps = [/091e9c5e81654093/, /091e9c5e81655838/, /091e9c5e813efa75/, /091e9c5e813f0e53/, /091e9c5e813ef48f/, /091e9c5e8140502f/, /091e9c5e813f2bfb/, /091e9c5e813f2bf9/, /091e9c5e81e4870f/, /091e9c5e81e4bc92/, /091e9c5e81e52376/, /091e9c5e81e52a7c/, /091e9c5e81f06bf7/];
const CAREpurgeCSSEnabledApps = [/091e9c5e81bf2122/, /091e9c5e81bf211c/, /091e9c5e81bf211d/, /091e9c5e81fd5f35/, /091e9c5e81fc34c5/];

const CAREApps = [/091e9c5e81bf2122/, /091e9c5e81bf211c/, /091e9c5e81bf211d/, /091e9c5e81fc34c5/, /091e9c5e81fd5f35/, /091e9c5e8211841a/];

const runInNewContextDisabledApps = [/091e9c5e81fd5f35/, /091e9c5e81fc34c5/, /091e9c5e81bf2122/, /091e9c5e81bf211c/, /091e9c5e81bf211d/];

const runInNewContext = !runInNewContextDisabledApps.some(rx => rx.test(appid));

let purgeCSSConfig = [];
if (isProd && !process.env.ENV) {
	if (CMSpurgeCSSEnabledApps.some(rx => rx.test(appid))) {
		purgeCSSConfig = [
			new PurgecssPlugin({
				paths: glob.sync(['**/*.vue', '**/*.html', '**/*.es6.js']),
				defaultExtractor(content) {
					const contentWithoutStyleBlocks = content.replace(
						/<style[^]+?<\/style>/gi,
						'',
					);
					return (
						contentWithoutStyleBlocks.match(
							/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g,
						) || []
					);
				},
				safelist: {
					standard: [
						/-(leave|enter|appear)(|-(to|from|active))$/,
						/^(?!(|.*?:)cursor-move).+-move$/,
						/^router-link(|-exact)-active$/,
						/data-v-.*/,
						/data-mode*/,
						/btn-.*/,
						/webmd-pagination-*/,
						/webmd-button-*/,
						/webmd-icon-*/,
						/vue-video-container/,
						/ia-art/,
					],
					deep: [/global-nav/, /ad$/, /ad-.*/, /webmd-checkbox/, /amp-.*/, /article/],
					greedy: [],
					keyframes: [],
					variables: [],
				},

				/*
				 * removes vitals css since everything is wrapped in material class.
				 * "material" is a blacklisted word. Do NOT use it in your CSS.
				 */
				blocklist: [/material/],
			})];
	} else if (CAREpurgeCSSEnabledApps.some(rx => rx.test(appid))) {
		purgeCSSConfig = [
			new PurgecssPlugin({
				paths: glob.sync(['**/*.vue', '**/*.html', '**/*.es6.js']),
				defaultExtractor(content) {
					const contentWithoutStyleBlocks = content.replace(
						/<style[^]+?<\/style>/gi,
						'',
					);
					return (
						contentWithoutStyleBlocks.match(
							/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g,
						) || []
					);
				},
				safelist: {
					standard: [
						/-(leave|enter|appear|transition)(|-(to|from|active))$/,
						/^(?!(|.*?:)cursor-move).+-move$/,
						/^router-link(|-exact)-active$/,
						/data-v-.*/,
						/data-mode*/,
						/btn-.*/,
						/webmd-pagination-*/,
						/webmd-button-*/,
						/webmd-icon-*/,
						/^webmd((?!(material|(col-([a-z]{2}-)?(push|pull|offset)))).)*$/,
						/class/,
						/v-modal/,
					],
					deep: [/global-nav/, /ad$/, /ad-.*/, /webmd-checkbox/, /amp-.*/, /webmd-row.*/],
					greedy: [],
					keyframes: [],
					variables: [],
				},

				/*
				 * removes vitals css since everything is wrapped in material class.
				 * "material" is a blacklisted word. Do NOT use it in your CSS.
				 */
				blocklist: [/material/],
			})];
	}
}

const plugins = purgeCSSConfig;

const sassLoaderOptionsData = CAREApps.some(rx => rx.test(appid)) ? `
@import "webmd-elements/packages/theme-chalk/src/common/var.scss";
@import "webmd-elements/packages/theme-chalk/src/mixins/mixins.scss";
@import "webmd-elements/packages/theme-chalk/src/mixins/function.scss";
@import "webmd-elements/packages/theme-chalk/src/mixins/utils.scss";
` : '@import "webmd-elements/packages/theme-chalk/src/typography.scss";';

module.exports = {
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			sass: {
				data: sassLoaderOptionsData,
			},
		},

		// comment out below line to make the local build faster
		sourceMap: true,
	},
	publicPath,
	outputDir,
	lintOnSave: false,
	transpileDependencies: [/\.jsx/, /\.es6\.js/, /pagedata.js/, /store.js/, /router.js/, /webmd-html2canvas/, /css-line-break/],

	// comment out below line to make the local build faster
	productionSourceMap: true,
	pluginOptions: {
		ssr: {
			host: '0.0.0.0',

			// Specify public file paths to disable resource prefetch hints for
			shouldNotPrefetch: [],

			// Specify public file paths to disable resource preload hints for
			shouldNotPreload: [],
			directives: {
				metric,
			},
			extendContext: (req, res, process) => ({
				pagedata: {
					meta: {},
					omniture: {
						s_account: 'webmddev',
					},
					jsonld: {},
					startTime: 0,
				},
				url: req.url,
				res,
				fullUrl: req.url,
				env: process.env.WEBMD_ENV,
				host: (req.headers || {}).host,
				appid,
				staticPublicPath: publicPath,
				outputDir,
			}),
			criticalCSS: false,
			applyDefaultServer: false,
			runInNewContext,
			extendServer: ({
				app,
				express,
			}) => {
				// eslint-disable-next-line no-unused-vars
				const webLog = (req, res, next) => {
					if (req.url !== '/health') {
						const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
						const IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
						const method = 'GET';
						console.log(`${IP}\t${method}\t${fullUrl}`);
					}

					// ::1     GET     http://localhost:8080/
					next();
				};

				const allowCors = (req, res, next) => {
					const { hostname } = req;
					const whiteListedHosts = ['webmd.com', 'vitals.com', 'wbmdstatic.com', 'univadis.com', 'medscape.com'];
					if (whiteListedHosts.some(host => hostname.includes(host))) {
						res.setHeader('Access-Control-Allow-Origin', '*');
					}
					next();
				};

				app.use(allowCors);
				app.get('/health', (req, res) => res.send('OK'));
				app.use(webLog);
				app.get('/versions', (req, res) => {
					res.header('Content-Type', 'application/json');
					res.send(JSON.stringify(versions, null, 2));
				});
				app.use('/static_vue', express.static(path.resolve(__dirname, './dist'), {
					maxAge: isProd ? 300 : 0,
					index: false,
				}));
			},
			renderToString: ({
				// eslint-disable-next-line no-unused-vars
				context,
				err,
				renderedHtml,
				// eslint-disable-next-line no-unused-vars
				req,
				res,
			}) => {
				/**
				 * Below code will only execute if the response is not handled during SSR
				 * through the context 'res' provided above.
				 */
				if (!res.headersSent) {
					if (err) {
						if (process.env.ENV !== 'production') {
							res.status(500)
								.end(`<html><body><pre>${err.stack}</pre></body></html>`);
						} else {
							res.redirect(302, errorUrl);
						}
					} else {
						const currentTime = new Date();
						const epocTimeStamp = Math.floor(currentTime / 1000);
						const gmt = currentTime.toGMTString();
						res.set('ETag', epocTimeStamp);
						res.set('Last-Modified', gmt);
						res.set('Cache-Control', 'max-age=120, s-maxage=300, must-revalidate, stale-while-revalidate=30, stale-if-error=43200, public');
						res.end(renderedHtml);
					}
				}
			},
			skipRequests: req => req.originalUrl === '/metrics' || req.originalUrl === '/health' || req.originalUrl === '/__webpack_hmr' || req.originalUrl === '/versions' || req.originalUrl === '/static_vue',

			nodeExternalsWhitelist: [/\.css$/, /\.vue$/, /src\/store$/, /src\/router$/, /util\/pagedata$/, /\.es6$/, /lib\/dfp$/, /webmd-html2canvas/, /css-line-break/],
			distPath: path.resolve(__dirname, `./dist/${appid}`),
			templatePath: path.resolve(__dirname, `./dist/${appid}/index.template.html`),
		},
	},
	chainWebpack: (config) => {
		config
			.devtool('source-map');

		/*
		 * adding timestamp to contenthash of the output css chunks
		 * because change to purgecss config doesn't result
		 * in contenthash change
		 * https://github.com/FullHuman/purgecss-webpack-plugin/issues/65
		 */
		if (config.plugins.has('extract-css')) {
			config
				.plugin('extract-css')
				.tap((args) => {
					args[0].filename = args[0].filename.replace('[name]', `[name]-${Date.now()}`);
					args[0].chunkFilename = args[0].chunkFilename.replace('[name]', `[name]-${Date.now()}`);
					return args;
				});
		}
	},
	configureWebpack: () => ({
		resolve: {
			//	symlinks: false,
		},
		optimization: {
			// eslint-disable-next-line no-nested-ternary
			splitChunks: process.env.VUE_CLI_SSR_TARGET === 'server' ? false : !isProd ? undefined : {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/](webmd-elements)[\\/]/,
						name: 'webmd-elements',
						chunks: 'all',
					},
				},
			},
		},
		plugins,
	}),
};
