const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const User = require('../models/User');
const Invoice = require('../models/Invoice');


// Helper function to ensure the directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
};

function generateInvoicePDF(invoice, user) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];
      doc.fontSize(20)
      .text('INVOICE', 50, 75)
      .moveDown();
      const logoPath = path.resolve(__dirname, `../uploads/${user.image}`);
      doc.image(logoPath, 50, 45, { width: 50 })
         .fontSize(20)
         .fontSize(10)
         .text('INVOICE', 50, 100)
         .moveDown();
    // User Details
    doc.fontSize(12)
    .text(`Invoice for: ${user.firstName} ${user.lastName}`, 50, 150)
    .text(`Email: ${user.email}`, 50, 165)
    .text(`Phone: ${user.phone}`, 50, 180);


      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      console.log(invoice.platformFee+invoice.serviceCharge)
      doc.fontSize(20).text(`Invoice for User: ${user.firstName}`);
      doc.text(`Service Charge: ${invoice.serviceCharge}`);
      doc.text(`Platform Fee: ${invoice.platformFee}`);
      doc.text(`Total Fee: ${invoice.platformFee+invoice.serviceCharge}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

exports.generateInvoice = async (req, res) => {
  const { userId, serviceCharge, platformFee } = req.body;
  try {
    const user = await User.findById(userId);
    const newInvoice = await Invoice.create({ userId, serviceCharge, platformFee });

    const pdfBuffer = await generateInvoicePDF(newInvoice, user);

    // Ensure the directory exists
    const filePath = path.join(__dirname, '..', 'backend', 'pdf', `invoice_${user.firstName}.pdf`);
    // console.log(filePath);
    ensureDirectoryExistence(filePath);

    // Save PDF to the directory
    fs.writeFileSync(filePath, pdfBuffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    res.json({ pdfBuffer }); // Send the file path as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
