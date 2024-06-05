export interface IOffer {
  id: string;
  currency: string;
  productDescription: string;
  maxCreditLine: number;
  desgravamen: number;
  maxValueDesgravamen: number;
  tcea: number;
  minCreditLine: number;
  billingDay: number;
  tea: number;
  dni: string;
  monthlyCost: number;
  incrementSteps: number[];
  initialSuggested: number;
  payDay: number;
}
