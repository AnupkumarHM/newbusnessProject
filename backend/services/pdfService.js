const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateInvoicePDF = (invoiceData) => {
  const doc = new PDFDocument();
  const fileName = `invoice_${invoiceData.user.firstName}_${invoiceData.user.lastName}.pdf`;
  doc.pipe(fs.createWriteStream(`path/to/save/${fileName}`));

  // PDF content generation
  doc.fontSize(20).text(`Invoice for ${invoiceData.user.firstName} ${invoiceData.user.lastName}`);
  doc.text(`Service Charge: ${invoiceData.serviceCharge}`);
  doc.text(`Platform Fee: ${invoiceData.platformFee}`);

  doc.end();
};

module.exports = { generateInvoicePDF };
