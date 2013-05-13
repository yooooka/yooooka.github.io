document.write('<link href="/jp/label/css/label_layer.css" rel="stylesheet" type="text/css" media="screen,tv,print">');

var sizingLyr={};

	//IE6
if(document.documentElement.clientWidth + document.documentElement.clientHeight == 0){
	sizingLyr.getViewAreaWidth=function(){return document.body.clientWidth;};
	sizingLyr.getViewAreaHeight=function(){return document.body.clientHeight;};
	sizingLyr.getHorizontalScroll=function(){return document.body.scrollLeft;};
	sizingLyr.getVerticalScroll=function(){return document.body.scrollTop};
}

	//Firefox Safari
else if(window.innerWidth && document.documentElement.clientWidth){
	sizingLyr.getViewAreaWidth=function(){return document.body.clientWidth;};
	sizingLyr.getViewAreaHeight=function(){return window.innerHeight;};
	sizingLyr.getHorizontalScroll=function(){return window.pageXOffset;};
	sizingLyr.getVerticalScroll=function(){return window.pageYOffset;};
}

 else if(document.documentElement && document.documentElement.clientWidth){
	//IE7
	sizingLyr.getViewAreaWidth=function(){return document.documentElement.clientWidth;};
	sizingLyr.getViewAreaHeight=function(){return document.documentElement.clientHeight;};
	sizingLyr.getHorizontalScroll=function(){return document.documentElement.scrollLeft;};
	sizingLyr.getVerticalScroll=function(){return document.documentElement.scrollTop;};
}

	var layerflag;

function stLyr(obj){
	 imgSrc = obj.href;

	 scrollX=sizingLyr.getHorizontalScroll();
	 viewX=sizingLyr.getViewAreaWidth();
	 scrollY=sizingLyr.getVerticalScroll();
	 viewY=sizingLyr.getViewAreaHeight();

    if(!layerflag){
			oLayer       = document.createElement('div');
			oLayer.id    = 'inser_img_here';
			oLayer.style.display="block";
			oLayer.style.position="absolute";
		  oLayer.style.top='0';
		  oLayer.style.left='0';
			oLayer.style.zIndex="10";

			if( document.width != "undefined"){
			olWdt = document.body.scrollWidth;
			olHgt = document.body.scrollHeight;
			}else{
			olWdt = document.width;
			olHgt = document.height;
			}
//				alert(olWdt + ":" + olHgt );

		  oLayer.style.width= olWdt + 'px';
			oLayer.style.height= olHgt + 'px';
//		  oLayer.style.width= viewX + 'px';
//			oLayer.style.height= viewY + 'px';
			oLayer.style.overflow='auto';


	  zLayer     = document.createElement('img');

	  iLayer     = document.createElement('div');

  zLayer.onload = function(){
		iLayer.id    = 'closeupimage';
		iLayer.style.display = 'block';
		iLayer.style.position = 'absolute';
		iLayer.style.border = 'none';
 	 	iLayer.style.zIndex= '15';
		iLayer.style.overflow='auto';

		iLayerWdt  = zLayer.width;
		iLayerHgt  = zLayer.height;

				dLayer       = document.createElement('div');
				dLayer.id   = 'delbutton'
				dLayer.style.position = 'absolute';
				dLayer.style.zIndex= '15';

		if( iLayerHgt > viewY * 0.9 && iLayerWdt > viewX * 0.9 ){
			iLayerHgt = viewY * 0.8;
			iLayerWdt = viewX * 0.9;
			iLayer.style.top=(viewY-iLayerHgt)/2+scrollY-10+'px';
			iLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';
			iLayer.style.width= iLayerWdt +'px';
			iLayer.style.height= iLayerHgt +'px';
			
				dLayer.style.width = iLayerWdt + 'px';
				dLayer.style.top=(viewY-iLayerHgt)/2+scrollY+iLayerHgt-10+'px';
				dLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';

		}else if( iLayerHgt > viewY * 0.9 && viewX -20 >= iLayerWdt){
			iLayerHgt = viewY * 0.8;
			iLayer.style.top=(viewY-iLayerHgt)/2+scrollY-10+'px';
			iLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';
			iLayer.style.width= iLayerWdt + 18 +'px';
			iLayer.style.height= iLayerHgt +'px';

				dLayer.style.width = iLayerWdt + 18 + 'px';
				dLayer.style.top=(viewY-iLayerHgt)/2+scrollY+iLayerHgt-10+'px';
				dLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';

		}else if( viewY  -20 >= iLayerHgt && iLayerWdt > viewX * 0.9){
			iLayerWdt = viewX * 0.9;
			iLayer.style.top=(viewY-iLayerHgt)/2+scrollY-10+'px';
			iLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';
			iLayer.style.width= iLayerWdt +'px';
			iLayer.style.height= iLayerHgt + 18 +'px';

				dLayer.style.width = iLayerWdt + 'px';
				dLayer.style.top=(viewY-iLayerHgt)/2+scrollY+iLayerHgt + 8 + 'px';
				dLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';

		}else{
			iLayer.style.top=(viewY-iLayerHgt)/2+scrollY-10+'px';
			iLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';
			iLayer.style.width= iLayerWdt +'px';
			iLayer.style.height= iLayerHgt +'px';

				dLayer.style.width = iLayerWdt + 'px';
				dLayer.style.top=(viewY-iLayerHgt)/2+scrollY+iLayerHgt-10+'px';
				dLayer.style.left=(viewX-iLayerWdt)/2+scrollX+'px';
		}

		bLayerTtl = obj.title;
		bLayerBse = obj.getElementsByTagName('img')[0];

		if( bLayerBse == null || bLayerBse == "undefined"){
			bLayerAlt = "";
		}else{
			bLayerAlt = bLayerBse.alt;
		}

		if( bLayerAlt != "" ){
			dLayerAlt = bLayerAlt;
		}else if(bLayerTtl != "" ){
		  dLayerAlt = bLayerTtl;
		}else{
			dLayerAlt = "Å¶ATLÇ©TITLEÇì¸ÇÍÇƒÇ≠ÇæÇ≥Ç¢";
		}

				dLayer.innerHTML= "<div><a href=\"javascript:removeLayer2();\">ÅyCLOSEÅz</a><span>" + dLayerAlt + "</span></div>";

		document.getElementsByTagName('body')[0].appendChild(oLayer);
		document.getElementsByTagName('body')[0].appendChild(iLayer);
		document.getElementsByTagName('body')[0].appendChild(dLayer);

};

		zLayer.setAttribute('src', imgSrc);
		iLayer.innerHTML= '<img src=\"' + imgSrc + '\">';

		layerflag=true;

	}else{
		removeLayer2();
	}
		return false;
}

function removeLayer2(){// ÉåÉCÉÑÅ[Çè¡Ç∑
	document.getElementsByTagName('body')[0].removeChild(oLayer);
	document.getElementsByTagName('body')[0].removeChild(iLayer);
	document.getElementsByTagName('body')[0].removeChild(dLayer);
	layerflag=false;
}
