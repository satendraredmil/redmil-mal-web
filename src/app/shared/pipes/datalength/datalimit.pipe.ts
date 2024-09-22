import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datalimit',
  standalone: true
})
export class DatalimitPipe implements PipeTransform {

  transform(value: string, maxChars: number): string {
    if(!value) return "";
    if(value.length > maxChars){
      return value.substring(0, maxChars) + '...';
    }
    return value
  }

}
