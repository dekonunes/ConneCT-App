import * as moment from 'moment-timezone';
import { getDiferenceDays } from "./getDiferenceDays";

export function getDaysCurrent(DQ,index) {
  if(!DQ.answers[index])
    return 0;
  const indexLastAnwer = Object.keys(DQ['answers'][index])[Object.keys(DQ['answers'][index]).length - 1];
  const lastAnswerString = DQ['answers'][index][indexLastAnwer]['date'];
  return getDiferenceDays(moment(),moment(lastAnswerString).format()); 
}
