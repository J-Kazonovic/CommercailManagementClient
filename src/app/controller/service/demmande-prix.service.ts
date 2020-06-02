import { Injectable } from '@angular/core';
import { Achat } from '../entity/achat.model';
import { AchatItem } from '../entity/achat-item.model';

@Injectable({
	providedIn: 'root'
})
export class DemmandePrixService {

	private _achat: Achat;
	private _achatItemsDB: Array<AchatItem>;
	private _achatItemsCurrent: Array<AchatItem>;

	constructor() { }


	public get achat(): Achat {
		if (this._achat == null) {
			this._achat = new Achat();
		}
		return this._achat;
	}


	public get achatItemsDB(): Array<AchatItem> {
		if (this._achatItemsDB == null) {
			this._achatItemsDB = new Array<AchatItem>();
		}
		return this._achatItemsDB;
	}

	public get achatItemsCurrent(): Array<AchatItem> {
		if (this._achatItemsCurrent == null) {
			this._achatItemsCurrent = new Array<AchatItem>();
		}
		return this._achatItemsCurrent;
	}


	public set achat(value: Achat) {
		this._achat = value;
	}

	public set achatItemsDB(value: Array<AchatItem>) {

		this._achatItemsDB = value;
	}

	public set achatItemsCurrent(value: Array<AchatItem>) {
		this._achatItemsCurrent = value;
	}

}
