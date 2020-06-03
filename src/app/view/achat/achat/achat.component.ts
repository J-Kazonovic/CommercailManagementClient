import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AchatComponent implements OnInit{

  constructor(){

  }

  ngOnInit(){

  }
}
