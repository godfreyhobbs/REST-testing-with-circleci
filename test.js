/**
 * Created by godfreyhobbs on 2016-12-09.
 */
const testsModule = require('./exampleTest.js').testModule();
// testModule must provide queires and validateQueryResults (via chai expect)
const rp = require('request-promise-native');
//const expect = require('chai').expect;

function fetchAndValidateQueryResults(optionsQueryPair) {
    var [getOptions, query] = optionsQueryPair;
    var request1 = rp(getOptions(query));
    //this will make parallel request easier
    var resultPromise = Promise.all([request1]).then(values => {
        testsModule.validateQueryResults(values);
    });
    return resultPromise;
}

describe('REST API', function () {
    this.timeout(120000);
    testsModule.QUERIES.forEach(function (optionsQueryPair) {
            var [options, query] = optionsQueryPair;
            it('chat:' + query, function () {
                return fetchAndValidateQueryResults(optionsQueryPair);
            });
        }
    );
});