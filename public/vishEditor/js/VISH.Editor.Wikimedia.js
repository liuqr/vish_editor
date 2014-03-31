VISH.Editor.Wikimedia = (function(V,$,undefined){

	var init = function(lala){
		console.log(lala);
	};

	var searchOnWikimedia = function(text, nimages, fmult){

	var imageSearch;
	if(nimages < 10){
		imageSearch = 10;
	}else{
		imageSearch = nimages;
	}

	$.getJSON("http://commons.wikimedia.org/w/api.php?callback=?",{

		'action' : 'query',
		'format': 'json',
		'list' : 'search',
		'srsearch' : text,
		'srnamespace' : 6,
		'prop': 'url'


 		/* 'action' : 'query',
		'format': 'json',
		'list' : 'allimages',
		'ailimit' : fmult*imageSearch,
		'aifrom' : text,
		'aiprop': 'url'*/
      },
      function(data) {
      	console.log("data: ");
      	console.log(data);
      	_onWikimediaDataReceived(data, nimages);
      	}).error(function(){
			//_onAPIError();
      });
	};

	var _onWikimediaDataReceived = function(data, nimages){

		var carrouselImages = [];
		var cont = 1;
		$.each(data.query.allimages, function(index, item) {
		var imageType = VISH.Object.getObjectInfo(item.url).type;


		// Due to Wikimedia API returns audio and video files- even if 
		// we specify we only have image files- we have to
		// filter the results by type

		if(imageType == 'image' && cont < (nimages-1) ){
			var myImg = item.url;
			console.log("he metido una imagen");
			carrouselImages.push(myImg);
			cont++;
			console.log(cont);
		}
		});
		console.log("carrouselImages: ");
		console.log(carrouselImages);
		return carrouselImages;
	};







return {
	init: init,
	searchOnWikimedia : searchOnWikimedia
};

}) (VISH, jQuery);