import * as moment from 'moment-timezone';
import { daydiff } from "./dayDiff";

export function getDiferenceDays(initial, final) {
  return daydiff(moment(initial).tz("America/Sao_Paulo"),moment(final).tz("America/Sao_Paulo"));
}
