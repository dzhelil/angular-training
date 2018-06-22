import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactName'
})
export class NamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split(" ").reverse().join(", ");
  }

}
