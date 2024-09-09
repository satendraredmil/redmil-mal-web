import { inject, Pipe, PipeTransform } from '@angular/core';
import { SchangelanguageService } from '../../../core/services/changelanguage/schangelanguage.service';

@Pipe({
  name: 'pchangelanguage',
  standalone: true,
  pure: false,
})
export class PchangelanguagePipe implements PipeTransform {

  private translationService = inject(SchangelanguageService);
  private latestValue: string = '';

  transform(key: string): string {
    this.translationService.getTranslation(key).subscribe(value => {
      this.latestValue = value;
    });
    return this.latestValue || key; // Return the translated string or the key if not found
  }

}