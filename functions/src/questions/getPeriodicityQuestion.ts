export function getPeriodicityQuestion(DQ,index) {
  if(!DQ.questions)
    return 0;
  return DQ.questions[index].periodicity;
}
