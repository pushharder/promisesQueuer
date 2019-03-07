function queue(){
    var res, rej, prevPromise;
    var promise = new Promise(function(resolve, reject){
       resolve(); 
    });

    return {
        push: function(fn) {
            promise = promise.then(fn, fn);
        },
        quitPrev: function(promise, resolveCallback, rejectCallback) {
            if(rej) rej();

            prevPromise = getPending();
            prevPromise.then(function(dataObj) {
                if (dataObj.resolved) {
                    resolveCallback(dataObj.data);
                } else {
                    rejectCallback(dataObj.data);
                }
            },
            function() {console.log('rejected')});

            promise.then(function(data) {
                res({resolved: true, data: data});
            }, 
            function(error) {
                res({resolved: false, data: error});
            })

        }
    };

    function getPending() {
        return new Promise(function(resolve, reject) {
            res = resolve;
            rej = reject;
        });
    }; 
}

function getPromise(delay) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(delay);
        }, delay);
    })
};

