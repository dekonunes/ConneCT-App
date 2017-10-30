module.exports = function daydiff(firstDate, secondDate) {
  firstDate = new Date(firstDate);
  secondDate = new Date(secondDate);
  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(1000*60*60*24)));
}
