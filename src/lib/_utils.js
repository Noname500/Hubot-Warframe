var util = require('util');

/**
 * Converts the difference between two Date object to a String.
 * Convenience function
 *
 * @param {integer} millis  Difference in milliseconds between the two dates
 *
 * @return {string}
 */
module.exports.timeDeltaToString = function (millis) {
    var seconds = millis / 1000;

    if (seconds >= 86400) { // Seconds in a day
        return util.format('%dd', Math.floor(seconds / 86400));
    } else if (seconds >= 3600) { // Seconds in an hour
        return util.format('%dh %dm', Math.floor(seconds / 3600)
            , Math.floor((seconds % 3600) / 60));
    } else {
        return util.format('%dm', Math.floor(seconds / 60));
    }
};

module.exports.generatePaddingString = function(paddingLength) {
    var str = "";
    for(i = 0; i<paddingLength; i++ ){
        str += " ";
    }
    return str;
}

module.exports.doubleReturn = process.env.HUBOT_DOUBLE_RET || '\n\n';
module.exports.lineEnd = process.env.HUBOT_LINE_END || '\n';
module.exports.blockEnd = process.env.HUBOT_BLOCK_END || ' ';