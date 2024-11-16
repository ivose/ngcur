import { Component, computed, inject } from '@angular/core';
import { InvestmentService } from '../investment.service.';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  //results = input()
  //@Input()
  //results?: InvestmentResults[]
  //results = input<InvestmentResults[]>()
  private investmentService = inject(InvestmentService)

  //get results() {
  //  return this.investmentService.resultsData;
  //}
  //signai puhul:
  results = computed(() => this.investmentService.resultsData());
  //või
  //results = this.investmentService.resultsData.asReadonly();
}
