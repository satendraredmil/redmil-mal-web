import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datalimit',
  standalone: true
})
export class DatalimitPipe implements PipeTransform {

  transform(value: string, maxChars: number): string {
    if(value.length <= maxChars){
      return value;
    }
    return value.slice(0, maxChars) + '....';
  }

}
