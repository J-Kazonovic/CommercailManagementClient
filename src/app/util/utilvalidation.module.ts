import { Product } from '../controller/entity/product.model';
import { Ebp } from '../controller/entity/ebp.model';

export class UtilValidation{

  static ebValidation(title:string): boolean {
    return title!=null;
  }

  static ebpValidation(libelle:string,qte:number): boolean {
    return libelle!=null && qte > 0;
  }


}