import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
  standalone: true,
})
export class SplitStringPipe implements PipeTransform {
  transform(text: string, by: string, index: number = 0) {
    try {
      let arr = text.split(by);
      return arr[index];
    } catch (error) {
      return text;
    }
    // let arr = text.split(by);
    // return arr[index];
  }
}
