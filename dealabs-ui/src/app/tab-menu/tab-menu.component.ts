import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
  providers: [DialogService]
})
export class TabMenuComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Dealabs', icon: 'pi pi-fw pi-home', routerLink: ['/deal-list'] },
      { label: 'Poster', icon: 'pi pi-fw pi-pencil', routerLink: ['/deal-create'] },
      {
        label: 'Connexion', icon: 'pi pi-fw pi-cog', command: event => {
          this.login();
        }
      }
    ];

  };

  login() {
    const ref = this.dialogService.open(LoginComponent, {
      header: 'Bienvenue sur Dealabs !',
      // width: '30%'
      width: '30%'
    });
  }

}


