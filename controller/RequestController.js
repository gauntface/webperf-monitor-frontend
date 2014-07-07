var RunsModel = require('./../model/runs-model.js');

exports.getIndexRequest = function(req, res) {
	RunsModel.getLatestCompleteRun()
		.then(function(result) {
			var runId = result['run_id'];

			getTopResultsForRun(runId, 10, function(err, topPagesResults) {
				if(err){
					console.error(err);
  					res.send(500, 'Something broke! '+err);
  					return;
				}

				getWorstResultsForRun(runId, 10, function(err, worstPagesResults) {
					if(err){
						console.error(err);
	  					res.send(500, 'Something broke! '+err);
	  					return;
					}

					var html = '';
					html += '<h1>Top Pages</h1>';
					html += '<table>';
					for(var i = 0; i < topPagesResults.length; i++) {
						html += '<tr>';
						html += '<td>';
						html += topPagesResults[i].url;
						html += '</td>';
						html += '<td>';
						html += topPagesResults[i].score;
						html += '</td>';
						html += '</tr>';
					}
					html += '</table>';


					html += '<h1>Worst Pages</h1>';
					html += '<table>';
					for(var i = 0; i < worstPagesResults.length; i++) {
						html += '<tr>';
						html += '<td>';
						html += worstPagesResults[i].url;
						html += '</td>';
						html += '<td>';
						html += worstPagesResults[i].score;
						html += '</td>';
						html += '</tr>';
					}
					html += '</table>';

					res.send(html);
				});
			});
		})
		.catch(function(err) {
			console.error(err);
  			res.send(500, 'Something broke! '+err);
		});
};

function getTopResultsForRun(runId, numOfResults, cb) {
	if(!cb) {
		return;
	}

	numOfResults = numOfResults || 10;
	RunsModel.getTopResultsForRun(runId, numOfResults)
		.then(function(result) {
			cb(null, result);
		})
		.catch(function(err) {
			cb(err);
		});
}

function getWorstResultsForRun(runId, numOfResults, cb) {
	if(!cb) {
		return;
	}

	numOfResults = numOfResults || 10;
	RunsModel.getWorstResultsForRun(runId, numOfResults)
		.then(function(result) {
			cb(null, result);
		})
		.catch(function(err) {
			cb(err);
		});
}