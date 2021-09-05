import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { PartialObserver } from 'rxjs';
import { Deal } from '../deal-model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})

export class DealListComponent implements OnInit {

  deals: Deal[];
  virtualDeals: Deal[];
  cols: any[];

  constructor(
    private dealService: DealService,
    private router: Router,
    private messageService: MessageService) {
  }

  ngOnInit() {

    const dealObserver: PartialObserver<Deal[]> = {
      next: data => {
        this.deals = data;
        this.virtualDeals = Array.from({ length: data.length });
      },
      error: err => {
        console.log(err.error.message)
        console.log("err:" + JSON.stringify(err))
        console.log("err.error:" + JSON.stringify(err.error))   
        this.messageService.add({
          key: 'myToast',
          severity: 'error',
          summary: "deal list error",
          detail: err.error.message,
          life: 5000
        })
      },
    };

    this.dealService.getAll().subscribe(dealObserver);


    this.cols = [
      { field: 'degree', header: 'Degree' },
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'price', header: 'Price' },
      { field: 'shippingFees', header: 'Shipping Fees' },
      { field: 'link', header: 'Link' },
      { field: 'author', header: 'Author' },
      { field: 'creationDate', header: 'Creation Date' },
      { field: 'startingDate', header: 'Starting Date' },
      { field: 'endingDate', header: 'Ending Date' },
      { field: 'action', header: 'Action' }
    ];

  }

  edit(i: Deal) {
    this.router.navigate(['/deal-detail', i.id]);
  }


  loadDealsLazy(event: LazyLoadEvent) {
    //simulate remote connection with a timeout 
    setTimeout(() => {

      if (this.deals) {
        this.virtualDeals = this.deals.slice(event.first, ((event.first === undefined ? 0 : event.first) + (event.rows === undefined ? 0 : event.rows)));
      }
    }, 250);
  }
};

