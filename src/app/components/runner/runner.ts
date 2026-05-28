import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReportField {
  key: string;
  label: string;
  type: 'select' | 'date' | 'text';
  options?: string[];
  default?: string;
}

export interface ReportDefinition {
  id: string;
  name: string;
  badge: 'fcc' | 'fcr';
  description: string;
  fields: ReportField[];
}

const REPORTS_DB: ReportDefinition[] = [
  {
    id: 'daily-txn-kenya',
    name: 'Daily Transaction Summary',
    badge: 'fcc',
    description: 'Kenya · Returns all transactions processed in the selected date range, grouped by branch and account type.',
    fields: [
      { key: 'country',  label: 'Country',         type: 'select', options: ['Kenya','Uganda','Mozambique','NBC'],            default: 'Kenya'        },
      { key: 'branch',   label: 'Branch',           type: 'select', options: ['All branches','Nairobi HQ','Mombasa','Kisumu'], default: 'All branches' },
      { key: 'dateFrom', label: 'Date from',        type: 'date',                                                             default: '2025-05-01'   },
      { key: 'dateTo',   label: 'Date to',          type: 'date',                                                             default: '2025-05-21'   },
      { key: 'txnType',  label: 'Transaction type', type: 'select', options: ['All types','Credit','Debit','Transfer'],       default: 'All types'    },
      { key: 'minAmt',   label: 'Min amount (KES)', type: 'text',                                                             default: '0'            },
    ]
  },
  {
    id: 'customer-risk-uganda',
    name: 'Customer Risk Score Report',
    badge: 'fcr',
    description: 'Uganda · Returns customer risk scores segmented by risk tier and relationship manager.',
    fields: [
      { key: 'country',  label: 'Country',   type: 'select', options: ['Kenya','Uganda','Mozambique','NBC'], default: 'Uganda'     },
      { key: 'riskTier', label: 'Risk tier', type: 'select', options: ['All tiers','High','Medium','Low'],   default: 'All tiers'  },
      { key: 'dateFrom', label: 'Date from', type: 'date',                                                   default: '2025-05-01' },
      { key: 'dateTo',   label: 'Date to',   type: 'date',                                                   default: '2025-05-21' },
    ]
  },
  {
    id: 'aml-nbc',
    name: 'AML Suspicious Activity',
    badge: 'fcc',
    description: 'NBC · Flags transactions matching AML watchlist criteria within the selected period.',
    fields: [
      { key: 'country',   label: 'Country',    type: 'select', options: ['Kenya','Uganda','Mozambique','NBC'],              default: 'NBC'        },
      { key: 'alertType', label: 'Alert type', type: 'select', options: ['All alerts','Structuring','Layering','Smurfing'], default: 'All alerts' },
      { key: 'dateFrom',  label: 'Date from',  type: 'date',                                                                default: '2025-05-01' },
      { key: 'dateTo',    label: 'Date to',    type: 'date',                                                                default: '2025-05-21' },
      { key: 'minAmt',    label: 'Min amount', type: 'text',                                                                default: '0'          },
    ]
  },
  {
    id: 'compliance-mozambique',
    name: 'Monthly Compliance Summary',
    badge: 'fcr',
    description: 'Mozambique · Monthly regulatory compliance overview including breach count and resolution rate.',
    fields: [
      { key: 'country', label: 'Country', type: 'select', options: ['Kenya','Uganda','Mozambique','NBC'],        default: 'Mozambique' },
      { key: 'month',   label: 'Month',   type: 'select', options: ['January','February','March','April','May'], default: 'May'        },
      { key: 'year',    label: 'Year',    type: 'text',                                                          default: '2025'       },
    ]
  }
];

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './runner.html',
  styleUrl: './runner.css'
})
export class Runner {
  report: ReportDefinition | null = null;
  fieldValues: Record<string, string> = {};
  isRunning      = false;
  showPreview    = true;
  selectedFormat = 'PDF';
  csvAssetPath = '/assets/Bank_Statement_100_Entries.csv';
  csvAssetName = 'Bank_Statement_100_Entries.csv';
  excelAssetPath = '/assets/Bank_Statement_100_Entries.xlsx';
  excelAssetName = 'Bank_Statement_100_Entries.xlsx';
  pdfAssetPath = '/assets/Bank_Statement_100_Entries.pdf';
  pdfAssetName = 'Bank_Statement_100_Entries.pdf';

  // ── Report state: idle → generating → success ──
  reportState: 'idle' | 'generating' | 'success' = 'idle';
  reportMessage = '';

  previewHeaders = ['Date', 'Branch', 'Account', 'Type', 'Amount (KES)', 'Status'];

  previewRows = [
    ['01 May 2025', 'Nairobi HQ', '0012-34567', 'Credit',   '142,500', 'Settled'],
    ['01 May 2025', 'Mombasa',    '0098-11234', 'Debit',    '58,200',  'Settled'],
    ['02 May 2025', 'Kisumu',     '0045-78901', 'Transfer', '320,000', 'Settled'],
    ['02 May 2025', 'Nairobi HQ', '0023-45678', 'Credit',   '89,750',  'Pending'],
    ['03 May 2025', 'Mombasa',    '0067-23456', 'Debit',    '15,600',  'Settled'],
  ];

  totalRows = 4821;
  runTime   = '0.8s';

  get previewFooter(): string {
    return `Showing ${this.previewRows.length} of ${this.totalRows.toLocaleString()} rows · Ran in ${this.runTime}`;
  }

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.loadReport('daily-txn-kenya');
  }

  loadReport(id: string): void {
    this.report = REPORTS_DB.find(r => r.id === id) ?? null;
    if (this.report) {
      this.fieldValues = {};
      this.report.fields.forEach(f => {
        this.fieldValues[f.key] = f.default ?? '';
      });
    }
  }

  loadReportById(id: string): void {
    this.showPreview = true;
    this.loadReport(id);
  }

  get fieldPairs(): ReportField[][] {
    if (!this.report) return [];
    const pairs: ReportField[][] = [];
    for (let i = 0; i < this.report.fields.length; i += 2) {
      pairs.push(this.report.fields.slice(i, i + 2));
    }
    return pairs;
  }

  selectFormat(format: string): void {
    this.selectedFormat = format;
  }

  get downloadFileName(): string {
    if (this.selectedFormat === 'CSV') {
      return this.csvAssetName;
    }
    if (this.selectedFormat === 'PDF') {
      return this.pdfAssetName;
    }
    if (this.selectedFormat === 'Excel') {
      return this.excelAssetName;
    }
    if (!this.report) return `report.${this.selectedFormat.toLowerCase()}`;
    const extension = this.selectedFormat === 'Excel' ? 'xls' : this.selectedFormat.toLowerCase();
    return `${this.report.id}-report.${extension}`;
  }

  // ── Step 1: click Run Report → generating for 3s → success stays until download ──
  runReport(): void {
    this.isRunning     = true;
    this.showPreview   = false;
    this.reportState   = 'generating';
    this.reportMessage = 'Report is generating...';
    this.cdr.detectChanges();

    setTimeout(() => {
      this.isRunning     = false;
      this.reportState   = 'success';
      this.reportMessage = 'Report generated successfully.';
      this.cdr.detectChanges();
    }, 3000);
  }

  // ── Download: triggered by user click, dismisses popup immediately ──
  downloadReport(): void {
    if (this.selectedFormat === 'CSV') {
      this.downloadFromAsset(this.csvAssetPath, this.csvAssetName);
      this.finishDownload();
      return;
    }

    if (this.selectedFormat === 'PDF') {
      this.downloadFromAsset(this.pdfAssetPath, this.pdfAssetName);
      this.finishDownload();
      return;
    }

    if (this.selectedFormat === 'Excel') {
      this.downloadFromAsset(this.excelAssetPath, this.excelAssetName);
      this.finishDownload();
      return;
    }

    // Fallback: if format is unexpected, dismiss and restore preview
    this.finishDownload();
  }

  private finishDownload(): void {
    this.reportState = 'idle';
    this.showPreview = true;
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  private downloadFromAsset(assetPath: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = assetPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private generateExcelContent(): string {
    return `Date\tTransaction ID\tDescription\tDebit Amount\tCredit Amount\tBalance\tTransaction Type\n` +
      `02-01-2026\tTXN1001\tSalary Credit\t\t5925\t55925\tCredit\n` +
      `03-01-2026\tTXN1002\tCash Deposit\t4844\t\t51081\tDebit\n` +
      `04-01-2026\tTXN1003\tElectricity Bill\t1359\t\t49722\tDebit\n` +
      `05-01-2026\tTXN1004\tOnline Purchase\t1185\t\t48537\tDebit\n` +
      `06-01-2026\tTXN1005\tOnline Purchase\t342\t\t48195\tDebit\n`;
  }

  private generatePdfContent(): string {
    return 'Report generated successfully for ' + this.report?.name + '.\n\nThank you for using ReportHub.';
  }
}