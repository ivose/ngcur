export interface InvestmentInput {
  initialInvestment: number;
  duration: number;
  expectedReturn: number;
  annualInvestment: number;
}

//export type InvestmentInput {
//    initialInvestment: number;
//    duration: number;
//    expectedReturn: number;
//    annualInvestment: number;
//}

export interface InvestmentResults {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
  totalInterest: number;
  totalAmountInvested: number;
}
