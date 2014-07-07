var dbHelper = require('./../db/db-helper.js');
var when = require('when');

function RunsModel() {

}

RunsModel.prototype.getLatestCompleteRun = function() {
	return when.promise(function(resolve, reject, notify) {
		dbHelper.openDb(function(err, dbConnection) {
			if(err) {
				reject('runs-model.js Unable to get db connection: '+err);
				return;
			}

			dbConnection.query('SELECT * FROM runs WHERE status = ? ORDER BY end_time DESC',
				['successful'], function(err, result) {
					dbConnection.destroy();
					if(err) {
						reject('runs-model.js Unable to select latest run: '+err);
						return;
					}

					if(result.length === 0) {
						reject('runs-model.js No runs to select');
						return;
					}

					var latestRun = result[0];
					
					resolve(latestRun);
				});
		});
	});
};

RunsModel.prototype.getTopResultsForRun = function(runId, numOfResults) {
	return when.promise(function(resolve, reject, notify) {
		dbHelper.openDb(function(err, dbConnection) {
			if(err) {
				reject('runs-model.js Unable to get db connection: '+err);
				return;
			}
			
			dbConnection.query('SELECT run_entries.entry_id, run_entries.run_id, run_entries.score, urls.url FROM run_entries INNER JOIN urls ON run_entries.url_id = urls.url_id WHERE run_id = ? ORDER BY score DESC LIMIT ?',
				[runId, numOfResults], function(err, result) {
					dbConnection.destroy();
					if(err) {
						reject('runs-model.js Unable to select the top results: '+err);
						return;
					}

					if(result.length === 0) {
						reject('runs-model.js No sites in the run to select');
						return;
					}
					
					resolve(result);
				});
		});
	});
};

RunsModel.prototype.getWorstResultsForRun = function(runId, numOfResults) {
	return when.promise(function(resolve, reject, notify) {
		dbHelper.openDb(function(err, dbConnection) {
			if(err) {
				reject('runs-model.js Unable to get db connection: '+err);
				return;
			}

			dbConnection.query('SELECT run_entries.entry_id, run_entries.run_id, run_entries.score, urls.url FROM run_entries INNER JOIN urls ON run_entries.url_id = urls.url_id WHERE run_id = ? ORDER BY score ASC LIMIT ?',
				[runId, numOfResults], function(err, result) {
					dbConnection.destroy();
					if(err) {
						reject('runs-model.js Unable to select the top results: '+err);
						return;
					}

					if(result.length === 0) {
						reject('runs-model.js No sites in the run to select');
						return;
					}
					
					resolve(result);
				});
		});
	});
};

RunsModel.prototype.getPreviousScoreAverages = function(numOfDays) {
	return when.promise(function(resolve, reject, notify) {
		dbHelper.openDb(function(err, dbConnection) {
			if(err) {
				reject('runs-model.js Unable to get db connection: '+err);
				return;
			}
			
			dbConnection.query('SELECT run_id, end_time, mean_score, median_score FROM runs WHERE status = ? AND end_time > DATE_SUB(now(), INTERVAL ? DAY) ORDER BY end_time DESC',
				['successful', numOfDays], function(err, result) {
					dbConnection.destroy();
					if(err) {
						reject('runs-model.js Unable to select the top results: '+err);
						return;
					}

					if(result.length === 0) {
						reject('runs-model.js No sites in the run to select');
						return;
					}
					
					resolve(result);
				});
		});
	});
};

module.exports = new RunsModel();