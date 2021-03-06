VISH.Quiz.API = (function(V,$,undefined){
	
	// URL in the form: "http://localhost:3000/quiz_sessions/"
	var quizSessionAPIrootURL;

	// Just for developping
	var getResultsCount = 0;

	var init = function(quizSessionAPI){
		if((typeof quizSessionAPI == "object")&&(typeof quizSessionAPI.rootURL == "string")){
			quizSessionAPIrootURL = quizSessionAPI.rootURL;
		}
	};
	
   /*
	* Create new quiz session
	* Server responds with a quiz_session JSON object including the quiz session id
	*/
	var startQuizSession = function(quizDOM,quizJSON,successCallback, failCallback){
		if(V.Configuration.getConfiguration().mode===V.Constant.VISH){
			var send_type = 'POST';

			var params = {
			  "quiz": JSON.stringify(quizJSON),
			  "authenticity_token" : V.User.getToken()
			}

			$.ajax({
				type    : send_type,
				url     : quizSessionAPIrootURL,
				data    : params,
				success : function(data) {
					if(typeof successCallback=="function"){
						successCallback(quizDOM,data);
					}
				},
				error: function(error){
					if(typeof failCallback=="function"){
						failCallback(quizDOM,error);
					}
				}
			});
		} else if(V.Configuration.getConfiguration()["mode"]==V.Constant.NOSERVER){
			var quizSessionId = Math.ceil(10000*(1+Math.random())).toString();
			var url = quizSessionAPIrootURL + quizSessionId;
			var quiz_session = {id: quizSessionId, url: url};
			
			if((typeof successCallback=="function")&&(typeof failCallback=="function")){
				setTimeout(function(){
					// failCallback(quizDOM,"error");
					successCallback(quizDOM,quiz_session);
				},1000);
			}
		}
	};

   /*
	* Close opened quiz session
	*/
	var closeQuizSession = function(quizSessionId,name,successCallback,failCallback){

		if(V.Configuration.getConfiguration()["mode"]==V.Constant.VISH){

			var send_type = 'GET';
			var params = {
				"id": quizSessionId, 
				"authenticity_token" : V.User.getToken() 
			}

			if((typeof name == "string")&&(name.trim()!="")){
				params["name"] = name;
			}

			$.ajax({
				type    : send_type,
				url     : quizSessionAPIrootURL + quizSessionId + '/close',
				data    : params,
				success : function(data) {
					if(typeof successCallback=="function"){
						successCallback(data);
					}
				},
				error: function(error){
					if(typeof failCallback=="function"){
						failCallback(error);
					}
				}
			});
		} else if(V.Configuration.getConfiguration()["mode"]==V.Constant.NOSERVER){

			// var params = {
			// 	"id": quizSessionId, 
			// 	"authenticity_token" : V.User.getToken() 
			// }
			// if(typeof name == "string"){
			// 	params["name"] = name;
			// }
			// V.Debugging.log(params)

			var data = {"processed":"true"};
			if((typeof successCallback=="function")&&(typeof failCallback=="function")){
				setTimeout(function(){
					successCallback(data);
					// failCallback();
				},1000);
			}
		}
	};

   /*
	* Delete opened quiz session
	*/
	var deleteQuizSession = function(quizSessionId,successCallback,failCallback){
		if(V.Configuration.getConfiguration()["mode"]==V.Constant.VISH){

			var send_type = 'GET';
			var params = {
				"id": quizSessionId, 
				"authenticity_token" : V.User.getToken()
			}

			$.ajax({
				type    : send_type,
				url     : quizSessionAPIrootURL + quizSessionId + '/delete',
				data    : params,
				success : function(data) {
					if(typeof successCallback=="function"){
						successCallback(data);
					}
				},
				error: function(error){
					if(typeof failCallback=="function"){
						failCallback(error);
					}
				}
			});

		} else if(V.Configuration.getConfiguration()["mode"]==V.Constant.NOSERVER){
			var data = {"processed":"true"};
			if(typeof successCallback=="function"){
				setTimeout(function(){
					successCallback(data);
				},1000);
			}
		}
	};

	/**
	 * GET /quiz_sessions/X/results.json.
	 */
	var getResults = function(quizSessionId, successCallback, failCallback){
		if(V.Configuration.getConfiguration()["mode"]==V.Constant.VISH){

			var send_type = 'GET';
			var params = {
				"id": quizSessionId
			}

			if(V.User.isLogged()){
				params["authenticity_token"] = V.User.getToken();
			}

			$.ajax({
				type    : send_type,
				url     : quizSessionAPIrootURL + quizSessionId + '/results.json',
				data    : params,
				success : function(data) {
					if(typeof successCallback=="function"){
						successCallback(data);
					}
				},
				error: function(error){
					if(typeof failCallback=="function"){
						failCallback(error);
					}
				}
			});
		} else if(V.Configuration.getConfiguration()["mode"]==V.Constant.NOSERVER){
			//Test

			//Empty
			var data;
			if(getResultsCount<1){
				//Empty data
				data = [];
			} else if(getResultsCount<3){
				data = [{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-30T12:35:05Z","id":82,"quiz_session_id":59}];
			} else {
				data = [{"answer":"[{\"no\":\"3\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:49:59Z","id":74,"quiz_session_id":56},{"answer":"[{\"no\":\"2\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:03Z","id":75,"quiz_session_id":56},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:07Z","id":76,"quiz_session_id":56},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:12Z","id":77,"quiz_session_id":56},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:15Z","id":78,"quiz_session_id":56},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:19Z","id":79,"quiz_session_id":56},{"answer":"[{\"no\":\"2\",\"answer\":\"true\"}]","created_at":"2013-11-29T17:50:23Z","id":80,"quiz_session_id":56}];
			}
			getResultsCount++;


			//MC (Multiple Choice)
			// var data = [{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-28T13:24:14Z","id":62,"quiz_session_id":50},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"}]","created_at":"2013-11-28T13:24:22Z","id":63,"quiz_session_id":50},{"answer":"[{\"no\":\"3\",\"answer\":\"true\"}]","created_at":"2013-11-28T13:25:13Z","id":64,"quiz_session_id":50}];

			// MC with only one result
			// var data = [{"answer":"[{\"no\":\"3\",\"answer\":\"true\"}]","created_at":"2013-11-26T12:49:34Z","id":47,"quiz_session_id":31}];

			// MC Multiple answer
			// var data = [{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"true\"},{\"no\":\"3\",\"answer\":\"true\"}]","created_at":"2013-11-22T17:51:20Z","id":37,"quiz_session_id":27},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"true\"},{\"no\":\"3\",\"answer\":\"true\"}]","created_at":"2013-11-22T17:51:29Z","id":38,"quiz_session_id":27},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"true\"}]","created_at":"2013-11-22T17:51:35Z","id":39,"quiz_session_id":27}];

			// TF Quizz (True/False)
			// var data = [{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"false\"},{\"no\":\"3\",\"answer\":\"true\"},{\"no\":\"4\",\"answer\":\"true\"}]","created_at":"2013-05-13T13:10:23Z","id":30,"quiz_session_id":19},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"false\"},{\"no\":\"3\",\"answer\":\"false\"},{\"no\":\"4\",\"answer\":\"true\"}]","created_at":"2013-05-13T13:10:37Z","id":31,"quiz_session_id":19},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"true\"},{\"no\":\"3\",\"answer\":\"false\"},{\"no\":\"4\",\"answer\":\"false\"}]","created_at":"2013-05-13T13:10:52Z","id":32,"quiz_session_id":19},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"false\"},{\"no\":\"3\",\"answer\":\"true\"},{\"no\":\"4\",\"answer\":\"true\"}]","created_at":"2013-05-13T13:11:09Z","id":33,"quiz_session_id":19},{"answer":"[{\"no\":\"1\",\"answer\":\"true\"},{\"no\":\"2\",\"answer\":\"false\"},{\"no\":\"3\",\"answer\":\"true\"},{\"no\":\"4\",\"answer\":\"true\"}]","created_at":"2013-05-13T13:11:41Z","id":34,"quiz_session_id":19}];
			
			if(typeof successCallback=="function"){
				setTimeout(function(){
					successCallback(data);
				},1000);
			}
		}
	};

	/**
	 * Send answers for real time quizzes
	 * PUT /quiz_sessions/X
	 */
	var sendAnwers = function(answers, quizSessionId, successCallback, failCallback){
		if(V.Configuration.getConfiguration().mode===V.Constant.VISH){
			var send_type = 'POST';
		   
			var params = {
				"id": quizSessionId,
				"answers": JSON.stringify(answers)
			}

			if(V.User.isLogged()){
				params["authenticity_token"] = V.User.getToken();
			}

			$.ajax({
			  type    : send_type,
			  url     : quizSessionAPIrootURL + quizSessionId + '/answer',
			  data    : params,
				success : function(data) {
					if(typeof successCallback=="function"){
						successCallback(data);
					}
			  },
				error: function(error){
					if(typeof failCallback=="function"){
						failCallback(error);
					}
				}
			 });

			 return null;
		} else {
			if(typeof successCallback=="function"){
				setTimeout(function(){
					successCallback();
				},1000);
			}
		}
   };

	return {
		init					: init, 
		startQuizSession		: startQuizSession, 
		closeQuizSession		: closeQuizSession,
		deleteQuizSession		: deleteQuizSession,
		getResults 				: getResults,
		sendAnwers				: sendAnwers
	};

}) (VISH, jQuery);