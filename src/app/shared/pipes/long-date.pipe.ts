import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'longDate',
  pure: true,
})
export class LongDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value instanceof Date) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const day = value.getDate();
      const month = value.getMonth();
      const year = value.getFullYear();

      return `${day} ${months[month]} / ${year}`;
    }

    return value;
  }
}
