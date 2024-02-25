export interface Invoice {
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string | null;
  bankSlipUrl: string;
  billingType: string;
  clientPaymentDate: string | null;
  creditDate: string | null;
  custody: string | null;
  deleted: boolean;
  description: string | null;
  discount: {
    value: number;
    limitDate: string | null;
    dueDateLimitDays: number;
    type: string;
  };
  dueDate: string;
  estimatedCreditDate: string | null;
  externalReference: string | null;
  fine: {
    value: number;
    type: string;
  };
  installmentNumber: number | null;
  interest: {
    value: number;
    type: string;
  };
  interestValue: number | null;
  invoiceNumber: string;
  invoiceUrl: string;
  lastBankSlipViewedDate: string | null;
  lastInvoiceViewedDate: string | null;
  netValue: number;
  nossoNumero: string;
  object: string;
  originalDueDate: string;
  originalValue: number | null;
  paymentDate: string | null;
  pixTransaction: string | null;
  postalService: boolean;
  refunds: any | null;
  status: string;
  transactionReceiptUrl: string | null;
  value: number;
}

export interface FaturasData {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: Invoice[];
}
export interface StatusColor {
  background: string;
  text: string;
  border: string;
}

export interface StatusColors {
  PENDING: StatusColor;
  RECEIVED: StatusColor;
  CONFIRMED: StatusColor;
  OVERDUE: StatusColor;
  REFUNDED: StatusColor;
  RECEIVED_IN_CASH: StatusColor;
  REFUND_REQUESTED: StatusColor;
  REFUND_IN_PROGRESS: StatusColor;
  CHARGEBACK_REQUESTED: StatusColor;
  CHARGEBACK_DISPUTE: StatusColor;
  AWAITING_CHARGEBACK_REVERSAL: StatusColor;
  DUNNING_REQUESTED: StatusColor;
  DUNNING_RECEIVED: StatusColor;
  AWAITING_RISK_ANALYSIS: StatusColor;
  [key: string]: StatusColor;
}
export const statusColors: StatusColors = {
  PENDING: {
    background: "bg-amber-50",
    text: "text-amber-500",
    border: "border-amber-500",
  },
  RECEIVED: {
    background: "bg-green-50",
    text: "text-green-500",
    border: "border-green-500",
  },
  CONFIRMED: {
    background: "bg-blue-50",
    text: "text-blue-500",
    border: "border-blue-500",
  },
  OVERDUE: {
    background: "bg-red-50",
    text: "text-red-500",
    border: "border-red-600",
  },
  REFUNDED: {
    background: "bg-purple-50",
    text: "text-purple-500",
    border: "border-purple-500",
  },
  RECEIVED_IN_CASH: {
    background: "bg-green-50",
    text: "text-green-500",
    border: "border-green-500",
  },
  REFUND_REQUESTED: {
    background: "bg-indigo-50",
    text: "text-indigo-500",
    border: "border-indiho-500",
  },
  REFUND_IN_PROGRESS: {
    background: "bg-indigo-50",
    text: "text-indigo-500",
    border: "border-indigo-500",
  },
  CHARGEBACK_REQUESTED: {
    background: "bg-red-50",
    text: "text-red-500",
    border: "border-red-500",
  },
  CHARGEBACK_DISPUTE: {
    background: "bg-red-50",
    text: "text-red-500",
    border: "border-red-500",
  },
  AWAITING_CHARGEBACK_REVERSAL: {
    background: "bg-red-50",
    text: "text-red-500",
    border: "border-red-500",
  },
  DUNNING_REQUESTED: {
    background: "bg-orange-50",
    text: "text-orange-500",
    border: "border-orange-500",
  },
  DUNNING_RECEIVED: {
    background: "bg-yellow-50",
    text: "text-yellow-500",
    border: "border-yellow-500",
  },
  AWAITING_RISK_ANALYSIS: {
    background: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-500",
  },
};
