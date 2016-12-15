/**
 * Created by godfreyhobbs on 2016-12-09.
 */
const expect = require('chai').expect;

module.exports.testModule = () => {

    function getOptions(query) {
        var options = {
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts/' + query,
            headers: {'cache-control': 'no-cache'},
            timeout: 6000,
            // json: {
            //     "query": query
            // },
            time: true
        };
        return options;
    }

    function validateQueryResults(values) {
        var response = values[0];
        if (typeof response === 'string') {
            response = JSON.parse(response);
        }
        // console.log('response[' + JSON.stringify(response) + ']');
        expect(response.body).to.exist;
        expect(response.body).to.equal('quia et suscipit\nsuscipit recusandae consequuntur expedita et ' +
            'cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
    }

    const QUERIES = [
        [getOptions, 1],
    ];

    return {QUERIES: QUERIES, validateQueryResults: validateQueryResults};
};