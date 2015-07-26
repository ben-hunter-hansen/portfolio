/**
 * Created by ben on 7/24/15.
 */


var Result = function(err,doc) {
    if(err && doc) {
        this._result = Result.NotFound;
        this._result.data = {};
    } else if(err) {
        console.error(err);
        this._result = Result.Error;
    } else {
        this._result = Result.Ok;
        this._result.data = doc;
    }
};

Result.NotFound = { stat: 404, error: "The requested resource doesn't exist" };
Result.Error = { stat: 500, error: "Something went wrong." };
Result.Ok = { stat: 200, data: null };

Result.prototype.status = function() {
    return this._result.stat;
};

Result.prototype.data = function() {
    return this._result.data;
};

module.exports = Result;