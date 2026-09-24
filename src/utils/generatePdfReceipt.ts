import { jsPDF } from 'jspdf';

export interface ReceiptItem {
  name: string;
  qty: number;
  unit?: string;
  rate: number;
  amount: number;
}

export interface ReceiptData {
  billNumber: string;
  billDate: string;
  billTime?: string;
  customerName: string;
  customerPhone?: string;
  customerVillage?: string;
  paymentMode: 'cash' | 'upi' | 'khata';
  items: ReceiptItem[];
  subtotal: number;
  discount?: number;
  total: number;
  previousBalance?: number;
  newBalance?: number;
  shopName: string;
  shopOwner: string;
  shopLocation: string;
}

export function downloadBillPdfReceipt(data: ReceiptData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // 1. Tricolor Saffron/White/Green top accent bar
  doc.setFillColor(255, 153, 51); // Saffron
  doc.rect(margin, 12, contentWidth / 3, 2.5, 'F');
  doc.setFillColor(255, 255, 255); // White
  doc.rect(margin + contentWidth / 3, 12, contentWidth / 3, 2.5, 'F');
  doc.setFillColor(19, 136, 8); // India Green
  doc.rect(margin + (contentWidth * 2) / 3, 12, contentWidth / 3, 2.5, 'F');

  // 2. Official Header
  let y = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(26, 46, 26);
  doc.text(data.shopName.toUpperCase(), pageWidth / 2, y, { align: 'center' });

  y += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('Government of India • Ministry of Social Justice & Empowerment (MoSJE)', pageWidth / 2, y, { align: 'center' });

  y += 4.5;
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(`${data.shopLocation} | Proprietor: ${data.shopOwner}`, pageWidth / 2, y, { align: 'center' });

  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Udyam Reg: UDYAM-UP-28-0091823 • GramMitra Authorized Village Enterprise', pageWidth / 2, y, { align: 'center' });

  // Divider line
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);

  // 3. Invoice Meta & Customer Badge
  y += 7;
  doc.setFillColor(248, 250, 248);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(220, 226, 220);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'S');

  // Left side: Bill meta
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(26, 46, 26);
  doc.text('BILL NO:', margin + 4, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(19, 136, 8);
  doc.text(data.billNumber, margin + 25, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Date & Time:', margin + 4, y + 12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.billDate} ${data.billTime || ''}`, margin + 25, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.text('Payment Mode:', margin + 4, y + 18);
  const payModeText =
    data.paymentMode === 'cash'
      ? 'CASH (नकद भुगतान)'
      : data.paymentMode === 'upi'
      ? 'UPI / QR (ऑनलाइन प्राप्त)'
      : 'ADDED TO KHATA (उधार खाता)';
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(data.paymentMode === 'khata' ? 180 : 19, data.paymentMode === 'khata' ? 30 : 136, data.paymentMode === 'khata' ? 30 : 8);
  doc.text(payModeText, margin + 29, y + 18);

  // Right side: Customer details
  const rightX = pageWidth / 2 + 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(26, 46, 26);
  doc.text('BILLED TO (ग्राहक):', rightX, y + 6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text(data.customerName, rightX + 34, y + 6);

  if (data.customerPhone) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Mobile No:', rightX, y + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.customerPhone, rightX + 34, y + 12);
  }

  if (data.customerVillage) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Village / Tola:', rightX, y + 18);
    doc.text(data.customerVillage, rightX + 34, y + 18);
  }

  // 4. Items Table
  y += 31;
  const colX = {
    sno: margin + 4,
    desc: margin + 14,
    qty: margin + 92,
    rate: margin + 122,
    amt: pageWidth - margin - 4,
  };

  // Table Header
  doc.setFillColor(35, 78, 45); // Deep Forest Green
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('#', colX.sno, y + 5.5);
  doc.text('ITEM DESCRIPTION (सामान)', colX.desc, y + 5.5);
  doc.text('QUANTITY', colX.qty, y + 5.5);
  doc.text('RATE (₹)', colX.rate, y + 5.5);
  doc.text('AMOUNT (₹)', colX.amt, y + 5.5, { align: 'right' });

  y += 8;

  // Table Body Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);

  data.items.forEach((item, index) => {
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(252, 252, 252);
      doc.rect(margin, y, contentWidth, 7.5, 'F');
    }

    doc.setDrawColor(235, 235, 235);
    doc.setLineWidth(0.2);
    doc.line(margin, y + 7.5, pageWidth - margin, y + 7.5);

    doc.text(String(index + 1), colX.sno, y + 5);
    doc.text(item.name.substring(0, 42), colX.desc, y + 5);
    const qtyStr = `${item.qty} ${item.unit || ''}`.trim();
    doc.text(qtyStr, colX.qty, y + 5);
    doc.text(`₹${item.rate.toLocaleString('en-IN')}`, colX.rate, y + 5);
    doc.text(`₹${item.amount.toLocaleString('en-IN')}`, colX.amt, y + 5, { align: 'right' });

    y += 7.5;
  });

  // Table bottom border
  doc.setDrawColor(35, 78, 45);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);

  // 5. Totals & Calculation Summary
  y += 5;
  const totalsBoxX = pageWidth / 2 + 10;
  const totalsBoxWidth = pageWidth - margin - totalsBoxX;

  // Subtotal
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Subtotal (सामान राशि):', totalsBoxX, y + 3);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text(`₹${data.subtotal.toLocaleString('en-IN')}`, pageWidth - margin - 4, y + 3, { align: 'right' });

  if (data.discount && data.discount > 0) {
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 40, 40);
    doc.text('Special Discount (छूट):', totalsBoxX, y + 3);
    doc.setFont('helvetica', 'bold');
    doc.text(`- ₹${data.discount.toLocaleString('en-IN')}`, pageWidth - margin - 4, y + 3, { align: 'right' });
  }

  // Grand Total in Highlight Box
  y += 7;
  doc.setFillColor(240, 248, 240);
  doc.roundedRect(totalsBoxX, y, totalsBoxWidth, 12, 1.5, 1.5, 'F');
  doc.setDrawColor(35, 78, 45);
  doc.setLineWidth(0.5);
  doc.roundedRect(totalsBoxX, y, totalsBoxWidth, 12, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(35, 78, 45);
  doc.text('GRAND TOTAL (कुल):', totalsBoxX + 4, y + 7.5);
  doc.setFontSize(12);
  doc.text(`₹${data.total.toLocaleString('en-IN')}`, pageWidth - margin - 4, y + 8, { align: 'right' });

  // Khata Balance details if applicable
  if (data.paymentMode === 'khata' && data.newBalance !== undefined) {
    y += 16;
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(248, 113, 113);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text('BAHI-KHATA RECORD (उधार खाता प्रविष्टि):', margin + 4, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const prevText = data.previousBalance !== undefined ? `Previous Due: ₹${data.previousBalance.toLocaleString('en-IN')} | ` : '';
    doc.text(
      `${prevText}This Bill: +₹${data.total.toLocaleString('en-IN')} | Total New Outstanding Balance: ₹${data.newBalance.toLocaleString('en-IN')}`,
      margin + 4,
      y + 10
    );
  }

  // 6. Signatures and Verification Footer
  const footerY = pageHeight - 38;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  // Left: QR & Digital payment note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(26, 46, 26);
  doc.text('DIGITAL BHIM / UPI ACCEPTED', margin, footerY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Scan GPay / PhonePe / Paytm at counter or pay via BharatPe QR.', margin, footerY + 11);
  doc.text('Thank you for supporting rural commerce! Items once sold are subject to store policy.', margin, footerY + 16);

  // Right: Proprietor Stamp / Signature
  const stampX = pageWidth - margin - 50;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text('For SHREE RADHE KIRANA', stampX, footerY + 6);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('[Authorized Signatory / Seal]', stampX, footerY + 17);

  // Bottom-most sovereign footer note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  doc.text(
    'Digitally generated by GramMitra Portal • MoSJE National Concessional Finance Development Corporation',
    pageWidth / 2,
    pageHeight - 8,
    { align: 'center' }
  );

  // Save the PDF
  doc.save(`${data.billNumber}.pdf`);
}
