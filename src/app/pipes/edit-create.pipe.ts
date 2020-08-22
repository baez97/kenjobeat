import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editCreate'
})
export class EditCreatePipe implements PipeTransform {

  map = {
    'edit': 'Editar',
    'create': 'Crear',
    'album': 'Álbum',
    'artist': 'Artista'
  }
  transform(value: string, itemType: 'album' | 'artist'): string {
    return this.map[value] + ' ' + this.map[itemType];
  }

}
