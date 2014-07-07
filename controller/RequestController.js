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

					getPreviousScoreAverages(function(err, scoreAverages) {
						if(err) {
							console.error(err);
	  						res.send(500, 'Something broke! '+err);
	  						return;
						}

						res.render('home', {
							topSites: topPagesResults,
							worstSites: worstPagesResults,
							scoreAverages: scoreAverages
						});
						//res.send(html);
					});
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

function getPreviousScoreAverages(cb) {
	if(!cb) {
		return;
	}
	numberOfDays = 30 * 3;
	RunsModel.getPreviousScoreAverages(numberOfDays)
		.then(function(result) {
			cb(null, result);
		})
		.catch(function(err) {
			cb(err);
		});
}