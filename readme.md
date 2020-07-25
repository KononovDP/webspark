<h1>Project name</h1>

<h2>Main Gulp tasks:</h2>

<ul>
	<li><strong title="gulp task"><em>gulp</em></strong>: run default gulp task (images, styles, scripts, browsersync, startwatch)</li>
	<li><strong title="cleanimg task"><em>cleanimg</em></strong>: Clean all compressed images</li>
	<li><strong title="styles, scripts, images, assets tasks"><em>styles, scripts, images, assets</em></strong>: build assets (css, js, images or all)</li>
	<li><strong title="rsync task"><em>rsync</em></strong>: project deployment via <strong>RSYNC</strong></li>
</ul>

<h2>Basic rules</h2>

<ol>
	<li>All custom <strong title="scripts task"><em>scripts</em></strong> located in <strong>app/js/app.js</strong></li>
	<li>All custom <strong title="styles task"><em>styles</em></strong> located in <strong>app/{preprocessor}/main.sass|scss|less|styl</strong></li>
	<li>All preprocessor <strong>configs</strong> placed in <strong>app/{preprocessor}/_config.sass|scss|less|styl</strong></li>
	<li>You can <strong>delete folders</strong> of other preprocessors before work.</li>
	<li>All <strong>images</strong> sources placed in <strong>app/images/src/</strong> folder.</li>
</ol>
