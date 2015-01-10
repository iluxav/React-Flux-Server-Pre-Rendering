module.exports = function() {
    var res = [];
    for (var i = 200; i > 0; i--) {
        res.push({
            id: i,
            title: 'Widget #' + i,
            cost: Math.floor((Math.random() * 200) + 1)
        });
    };
    console.log('REMOTE DATA LOOP RUNNING...');
    var get = function(clb) {
        clb(res);
    }
    return {
        get: get
    }
};
