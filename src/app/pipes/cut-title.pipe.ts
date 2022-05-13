import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTitle'
})
export class CutTitlePipe implements PipeTransform {

  transform(value: string, maxLength: number = 50): string {
    if (value.length > maxLength)
      return value.substring(0, maxLength) + '...';
    else return value;
  }

}
