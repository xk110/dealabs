import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
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
    private router: Router) {
  }

  ngOnInit() {

    const dealObserver: PartialObserver<Deal[]> = {
      next: data => {
        this.deals = data;
        this.virtualDeals = Array.from({ length: data.length });
      }
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

