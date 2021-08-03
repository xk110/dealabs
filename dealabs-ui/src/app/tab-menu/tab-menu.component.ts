import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/deal-list'] }
    ];

  };

}


