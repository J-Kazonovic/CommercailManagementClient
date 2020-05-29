import { Eb } from '../controller/entity/eb.model';
import { Ebp } from '../controller/entity/ebp.model';

export class UtilList {

  //Delete  Eb Array's Item
  static deleteFromListById(id: number, list: any) {
    const i = list.findIndex(e => e.id === id);
    if (i !== -1) {
      list.splice(i, 1);
    }
  }

  static deleteFromListByLibelle(value: string, list: any) {
    const i = list.findIndex(e => e.libelle === value);
    if (i !== -1) {
      list.splice(i, 1);
    }
  }

  static deleteFromListByLibelle2(libelle: string, list: any) {
    const i = list.findIndex(e => e.produit.libelle === libelle);
    if (i !== -1) {
      list.splice(i, 1);
    }
  }


  static stringSort(list: any, prop: string, i: number) {
    if (i == 0) {
      list.sort((a: any, b: any): number => {
        return a[prop].localeCompare(b.prop);
      });
    } else if (i == 1) {
      list.sort((a: any, b: any): number => {
        return b[prop].localeCompare(a.prop);
      });
    }
  }
  static dateSort(list: any, prop: string, i: number) {
    if (i == 0) {
      list.sort((a: any, b: any): number => {
        return new Date(Date.parse(a[prop])).getTime() - new Date(Date.parse(b[prop])).getTime();
      });
    } else if (i == 1) {
      list.sort((a: any, b: any): number => {
        return new Date(Date.parse(b[prop])).getTime() - new Date(Date.parse(a[prop])).getTime();
      });
    }

  }



}