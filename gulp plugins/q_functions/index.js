'use strict';

       // MESSAGES
        var q_ok = function (msg) {

            console.log('QUANT:OK, '.bold.green+msg.bold.green)

        }
        var q_err = function (msg) {

            console.log('QUANT:ERROR, '.bold.red+msg.bold.red)

        }

        var q_s = function (msg) {

            console.log('QUANT:SAYS, '.italic.magenta+msg.italic.magenta)

        }


module.exports.err = q_err;
module.exports.ok = q_ok;
module.exports.s = q_s;