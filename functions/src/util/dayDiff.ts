export function daydiff(firstDate, secondDate) {
    return Math.round(Math.abs((new Date(firstDate).getTime() - new Date(secondDate).getTime())/(1000*60*60*24)));
}
  