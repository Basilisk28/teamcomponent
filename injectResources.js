const fs = require('fs');
const { appid } = require('./kubeconfig.json');

const deferCSSEnabledApps = [/091e9c5e81bf2122/, /091e9c5e81bf211c/, /091e9c5e81bf211d/, /091e9c5e81fd5f35/, /091e9c5e81fc34c5/, /091e9c5e81654093/, /091e9c5e81655838/, /091e9c5e813efa75/, /091e9c5e813f0e53/, /091e9c5e813ef48f/, /091e9c5e8140502f/, /091e9c5e813f2bfb/, /091e9c5e813f2bf9/, /091e9c5e81e4870f/, /091e9c5e81e4bc92/, /091e9c5e81e52376/, /091e9c5e81e52a7c/, /091e9c5e81f06bf7/, /091e9c5e814695f1/, /091e9c5e81e52378/, /091e9c5e81f07d41/];
const fontsOptionalApps = [/091e9c5e81654093/, /091e9c5e81655838/, /091e9c5e813efa75/, /091e9c5e813f0e53/, /091e9c5e813ef48f/, /091e9c5e8140502f/, /091e9c5e813f2bfb/, /091e9c5e813f2bf9/, /091e9c5e81e4870f/, /091e9c5e81e4bc92/, /091e9c5e81e52376/, /091e9c5e81e52a7c/, /091e9c5e81f06bf7/, /091e9c5e814695f1/, /091e9c5e81e52378/, /091e9c5e81f07d41/, /091e9c5e819581e5/];
const preloadJsEnabledApps = [/091e9c5e81bf2122/, /091e9c5e81bf211c/, /091e9c5e81bf211d/];
const fontsOptional = fontsOptionalApps.some(rx => rx.test(appid));
const deferCSS = deferCSSEnabledApps.some(rx => rx.test(appid));
const preloadJs = preloadJsEnabledApps.some(rx => rx.test(appid));

function addRenderResourceHints(html, jsFiles, cssFiles, nonCriticalchunk, inlineStyles, preJs) {
	let resourceHints = '';

	if (jsFiles) {
		if (preloadJs) {
			jsFiles.forEach((fileName) => {
				if (fileName.endsWith('.js')) {
					if (preJs.some(rx => rx.test(fileName))) {
						resourceHints += `<link rel="preload" href="/static_vue/${appid}/js/${fileName}" as="script">\n`;
					} else {
						resourceHints += `<link rel="prefetch" href="/static_vue/${appid}/js/${fileName}" as="script">\n`;
					}
				}
			});
		} else {
			jsFiles.forEach((fileName) => {
				if (fileName.endsWith('.js')) {
					if (nonCriticalchunk.some(rx => rx.test(fileName))) {
						resourceHints += `<link rel="prefetch" href="/static_vue/${appid}/js/${fileName}" as="script">\n`;
					} else {
						resourceHints += `<link rel="prefetch" href="/static_vue/${appid}/js/${fileName}" as="script">\n`;
					}
				}
			});
		}
	}

	if (cssFiles) {
		cssFiles.forEach((fileName) => {
			if (fileName.endsWith('.css') && !inlineStyles.some(rx => rx.test(fileName))) {
				if (nonCriticalchunk.some(rx => rx.test(fileName))) {
					resourceHints += `<link rel="prefetch" href="/static_vue/${appid}/css/${fileName}" as="style">\n`;
				} else {
					resourceHints += `<link rel="preload" href="/static_vue/${appid}/css/${fileName}" as="style">\n`;
				}
			}
		});
	}

	return html.replace('{{{ renderResourceHints() }}}', resourceHints);
}

function addRenderScripts(html, files, cssFiles, nonCriticalchunk) {
	let scriptTags = '';

	if (files) {
		files.forEach((fileName) => {
			if (fileName.endsWith('.js')) {
				scriptTags += `<script src="/static_vue/${appid}/js/${fileName}" defer></script>\n`;
			}
		});
	}
	if (deferCSS) {
		if (cssFiles) {
			cssFiles.forEach((fileName) => {
				if (fileName.endsWith('.css') && nonCriticalchunk.some(rx => rx.test(fileName))) {
					scriptTags += `<link rel="stylesheet" href="/static_vue/${appid}/css/${fileName}">\n`;
				}
			});
		}
	}
	if (scriptTags) {
		return html.replace('{{{ renderScripts() }}}', scriptTags);
	}
	return html;
}

function addRenderStyles(html, files, inlineStyles) {
	let cssTags = '';

	if (files) {
		files.forEach((fileName) => {
			if (fileName.endsWith('.css')) {
				if (inlineStyles.some(rx => rx.test(fileName))) {
					let fileContent = fs.readFileSync(`dist/${appid}/css/${fileName}`, { encoding: 'utf8' });
					fileContent = fileContent.replace(/\.\.\/fonts/g, `/static_vue/${appid}/fonts`);
					fileContent = fileContent.replace(/\.\.\/img/g, `/static_vue/${appid}/img`);
					if (fontsOptional) {
						fileContent = fileContent.replace(/font-display:swap/g, 'font-display:optional');
					}
					cssTags += `<style>${fileContent}</style>\n`;
				}
			}
		});
		if (!deferCSS) {
			files.forEach((fileName) => {
				if (fileName.endsWith('.css')) {
					if (!inlineStyles.some(rx => rx.test(fileName))) {
						cssTags += `<link rel="stylesheet" href="/static_vue/${appid}/css/${fileName}">\n`;
					}
				}
			});
		}
		return html.replace('{{{ renderStyles() }}}', cssTags);
	}
	return html;
}

async function readHTML() {
	let html = fs.readFileSync(`dist/${appid}/index.template.html`, { encoding: 'utf8' });
	const nonCriticalchunk = [/non-critical/];
	const inlineStyles = [/app/, /webmd-elements/, /chunk/];
	const dynamicImports = [/load-dynamic/];

	let jsFiles = await fs.promises.readdir(`dist/${appid}/js`);
	let cssFiles = (await fs.promises.readdir(`dist/${appid}/css`)).reverse();
	const preJs = [/app/, /webmd-elements/, /chunk-vendors/];

	// excluding dynamamic import chunks - JS
	if (jsFiles) {
		jsFiles = jsFiles.filter(fileName => (fileName.endsWith('.js') && !dynamicImports.some(rx => rx.test(fileName))));
	}

	// excluding dynamamic import chunks - CSS
	if (cssFiles) {
		cssFiles = cssFiles.filter(fileName => (fileName.endsWith('.css') && !dynamicImports.some(rx => rx.test(fileName))));
	}
	html = addRenderResourceHints(html, jsFiles, cssFiles, nonCriticalchunk, inlineStyles, preJs);
	html = addRenderScripts(html, jsFiles, cssFiles, nonCriticalchunk);
	html = addRenderStyles(html, cssFiles, inlineStyles);

	fs.writeFileSync(`dist/${appid}/index.template.html`, html);
}

readHTML();
