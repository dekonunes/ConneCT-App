const moment = require('moment-timezone');
var daydiff = require('./daydiff');

module.exports = function getDiferenceDays(initial, final) {
  return daydiff(moment(initial).tz("America/Sao_Paulo"),moment(final).tz("America/Sao_Paulo"));
}
