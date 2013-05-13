function ckParam() {
	search = unescape( location.search.substr(1) );
	if ( search.match(/p=([^&]*)/) ) return RegExp.$1;
}

function getUri( selc ) {
	p = new Array();
	uri = new Array();

	p[0] = "";
	uri[0] = "/jp/label/paper/index.html";
	p[1] = "lm6_y";
	uri[1] = "/jp/label/index.html";
	p[2] = "lmkr2_y";
	uri[2] = "/jp/label/index.html";
	p[3] = "lmmr2_y";
	uri[3] = "/jp/label/index.html";
	p[4] = "lmsr2_y";
	uri[4] = "/jp/label/index.html";
	p[5] = "lmb6_y";
	uri[5] = "/jp/label/index.html";
	p[6] = "pop4_y";
	uri[6] = "/jp/label/index.html";
	p[7] = "lmcr2_y";
	uri[7] = "/jp/label/index.html";
	for( i = 0; i < p.length; i++ ) {
		if ( p[i] == selc ) {
			location.replace(uri[i]);
			return false;
		}
	}
	location.replace(uri[0]);
	return false;
}
