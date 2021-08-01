import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PartialObserver } from 'rxjs';
import { Deal } from '../deal-model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss']
})
export class DealDetailComponent implements OnInit {

  id: string;
  deal: Deal = {} as Deal;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private dealService: DealService
  ) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    const dealObserver: PartialObserver<Deal> = {
      next: data => {
        this.deal = data;
      }
    };

    this.dealService.getById(this.id)
      .subscribe(dealObserver);

  }

}