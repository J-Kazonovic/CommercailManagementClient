import { Eb } from '../controller/entity/eb.model';
import { Ebp } from '../controller/entity/ebp.model';

export class UtilList{

    //Delete  Eb Array's Item
    static  deleteFromListById(id: number, ebList: any) {
        const i = ebList.findIndex(e => e.id === id);
        if (i !== -1) {
          ebList.splice(i, 1);
        }
    }

    static  deleteFromListByLibelle(libelle:string, list: any) {
      const i = list.findIndex(e => e.libelle === libelle);
      if (i !== -1) {
        list.splice(i, 1);
      }
  }

    

}