VISH.Editor.Object.Flash = (function(V,$,undefined){
	
	
	var drawFlashObjectWithSource = function(src){
	  var current_area = VISH.Editor.getCurrentArea();
	  var template = VISH.Editor.getTemplate();

	  var nextFlashId = VISH.Utils.getId();
	  var idToDrag = "draggable" + nextFlashId;
	  var idToResize = "resizable" + nextFlashId;
	  current_area.attr('type','object');
	   
	  var embedDiv = document.createElement('div');
	  embedDiv.setAttribute('id', idToDrag);
	  $(embedDiv).addClass('object_wrapper');
	  $(embedDiv).addClass(template + "_object");
	  
	  var embedTag = document.createElement('embed');
	  embedTag.setAttribute('id', idToResize );
	  embedTag.setAttribute('class', template + "_object");
	  embedTag.setAttribute('src', src);
	  embedTag.setAttribute('wmode', 'opaque');
	  $(embedDiv).append(embedTag); 
	  
	  $(current_area).html("");
	  $(current_area).append(embedDiv);
	  	    
	  VISH.Editor.addDeleteButton($(current_area));
	  
	  $("#" + idToDrag).draggable({cursor: "move"});
	}
			
	return {
		drawFlashObjectWithSource : drawFlashObjectWithSource
	};

}) (VISH, jQuery);
