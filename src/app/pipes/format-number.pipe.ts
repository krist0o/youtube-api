import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number): string {
    const k = Math.floor(value / 1000);
    const m = Math.floor(value / 1000000);
    if (m > 0)
      return m + 'M'
    else if (k > 0)
      return k + 'K'
    else
      return value + ''
  }
}
