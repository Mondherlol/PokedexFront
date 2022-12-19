import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-fight-modal',
  templateUrl: './fight-modal.component.html',
  styleUrls: ['./fight-modal.component.scss']
})
export class FightModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<FightModalComponent>) {}

  ngOnInit(): void {
  }

}
