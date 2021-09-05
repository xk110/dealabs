import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observer, Subscription } from 'rxjs';
import { Deal } from '../deal-model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-deal-create',
  templateUrl: './deal-create.component.html',
  styleUrls: ['./deal-create.component.scss']
})
export class DealCreateComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: true }) private formGroupDirective: FormGroupDirective;

  public dealForm: FormGroup;
  public autoResize: boolean = true;
  private dealSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private messageService: MessageService,
    private dealService: DealService
  ) {
  }

  ngOnInit() {

    this.dealForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      shippingFees: ['', [Validators.required]],
      link: ['', [Validators.required]],
      startingDate: [''],
      endingDate: [''],
    });

  }

  createDeal() {

    if (this.dealForm.valid) {
      const dealToCreate = {
        title: this.dealForm.get('title')?.value,
        description: this.dealForm.get('description')?.value,
        price: this.dealForm.get('price')?.value,
        shippingFees: this.dealForm.get('shippingFees')?.value,
        link: this.dealForm.get('link')?.value,
        startingDate: this.dealForm.get('startingDate')?.value,
        endingDate: this.dealForm.get('endingDate')?.value
      } as Deal;


      const dealObserver: Observer<Deal> = {
        next: res => {
        },
        error: err => {
          console.log(JSON.stringify(err));
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Création', detail: 'deal créé avec succès', life: 5000 });
          this.formGroupDirective.resetForm();
        }
      };

      this.dealSubscription = this.dealService.create(dealToCreate).subscribe(dealObserver);

    } else {
      this.messageService.add({ severity: 'error', summary: 'Création', detail: 'Deal non créé - le formulaire est invalide', life: 5000 });
    }
  }

  ngOnDestroy() {
    if (this.dealSubscription) {
      this.dealSubscription.unsubscribe();
    }
  }

}
