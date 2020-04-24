import { Ebp } from './ebp.model';
import { Personnel } from './personnel.model';
import { Dept } from './dept.model';

export class Eb {
	public id:number;
    public title:string;
    public eb_desc:string;
    public statut:string;
    public personnel=new Personnel();
    public dept=new Dept();
    public saveDate:string;
    public lastUpDate:string;
    public ebp=new Array<Ebp>();
	
}
