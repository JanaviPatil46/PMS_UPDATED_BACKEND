// const Invoice = require('../models/invoiceModel');
// const mongoose = require("mongoose");

// //get all Invoice
// const getInvoices = async (req, res) => {
//     try {
//         const invoice = await Invoice.find({}).sort({ createdAt: -1 });
//         res.status(200).json({ message: "Invoices retrieved successfully", invoice });

//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// };

// //Get a single Invoice
// const getInvoice = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid Invoice ID" });
//     }

//     try {
//         const invoice = await Invoice.findById(id);

//         if (!invoice) {
//             return res.status(404).json({ error: "No such Invoice" });
//         }

//         res.status(200).json({ message: "Invoice retrieved successfully", invoice });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//         console.log(error.message)
//     }
// };

// //POST a new Invoice
// const createInvoice = async (req, res) => {
//     const { account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
//         reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
//         payInvoicewithcredits, lineItems, summary, active } = req.body;

//     try {
//         const existingInvoice = await Invoice.findOne({
//             invoicenumber
//         });

//         if (existingInvoice) {
//             return res.status(201).json({ message: "Invoice already exists" });
//         }
//         const newInvoice = await Invoice.create({
//             account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
//             reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
//             payInvoicewithcredits, lineItems, summary, active
//         });

//         return res.status(201).json({ message: "Invoice created successfully", newInvoice });

//     } catch (error) {
//         console.error("Error creating Invoice:", error);
//         return res.status(500).json({ error: "Error creating Invoice", error });
//     }
// };

// //delete a Invoice
// const deleteInvoice = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid Invoice ID" });
//     }

//     try {
//         const deletedInvoice = await Invoice.findByIdAndDelete({ _id: id });
//         if (!deletedInvoice) {
//             return res.status(404).json({ error: "No such Invoice" });
//         }
//         res.status(200).json({ message: "Invoice deleted successfully", deletedInvoice });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// //update a new Invoice
// const updateInvoice = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid Invoice ID" });
//     }

//     try {
//         const updatedInvoice = await Invoice.findOneAndUpdate(
//             { _id: id },
//             { ...req.body },
//             { new: true }
//         );

//         if (!updatedInvoice) {
//             return res.status(404).json({ error: "No such Invoice" });
//         }

//         res.status(200).json({ message: "Invoice Updated successfully", updatedInvoice });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// //Get a single InvoiceList List
// const getInvoiceList = async (req, res) => {
//     const invoiceList = [];
//     try {
//         const invoice = await Invoice.find()
//             .populate({ path: 'account', model: 'account' })
//             .populate({ path: 'teammember', model: 'User' });

//         const account = invoice.account.map(accountname);
//         const Assignee = invoice.teammember.map(teammember);

//         invoiceList.push({
//             clientname: account.accountname,
//             clientid: account._id,
//             invoice: invoice.invoicenumber,
//             status: "",
//             assigneename: Assignee.username,
//             assigneeid: Assignee._id,
//             posted: "",
//             amount: invoice.amount,
//             paid: "",
//             description: invoice.description
//         })

//         res.status(200).json({ message: "Invoice retrieved successfully", invoiceList });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// //Get a single InvoiceList List
// const getInvoiceListbyid = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const invoice = await Invoice.findById(id)
//             .populate({ path: 'account', model: 'account' })
//             .populate({ path: 'invoicetemplate', model: 'InvoiceTemplate' })
//             .populate({ path: 'teammember', model: 'User' });

//         res.status(200).json({ message: "Invoice retrieved successfully", invoice });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     createInvoice,
//     getInvoices,
//     getInvoice,
//     deleteInvoice,
//     updateInvoice,
//     getInvoiceList,
//     getInvoiceListbyid,
// }

const Invoice = require("../models/invoiceModel");
const mongoose = require("mongoose");
const Accounts = require("../models/AccountModel"); // Ensure the path is correct
const User = require("../models/userModel"); // Import User if not already imported
const InvoiceTemplate = require("../models/invoiceTemplateModel"); // Import if used
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const Contacts = require("../models/contactsModel")
const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// const { constants } = require('buffer');

//get all Invoice
const getInvoices = async (req, res) => {
  try {
    const invoice = await Invoice.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: "Invoices retrieved successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a single Invoice
const getInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Invoice ID" });
  }

  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ error: "No such Invoice" });
    }

    res.status(200).json({ message: "Invoice retrieved successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

//POST a new Invoice
// const createInvoice = async (req, res) => {
//   const { account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient, reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime, payInvoicewithcredits, lineItems, summary, active } = req.body;

//   try {
//     const existingInvoice = await Invoice.findOne({
//       invoicenumber,
//     });

//     if (existingInvoice) {
//       return res.status(201).json({ message: "Invoice already exists" });
//     }
//     const newInvoice = await Invoice.create({
//       account,
//       invoicenumber,
//       invoicedate,
//       description,
//       invoicetemplate,
//       paymentMethod,
//       teammember,
//       emailinvoicetoclient,
//       reminders,
//       daysuntilnextreminder,
//       numberOfreminder,
//       scheduleinvoice,
//       scheduleinvoicedate,
//       scheduleinvoicetime,
//       payInvoicewithcredits,
//       lineItems,
//       summary,
//       active,
//     });

//     return res.status(201).json({ message: "Invoice created successfully", newInvoice });
//   } catch (error) {
//     console.error("Error creating Invoice:", error);
//     return res.status(500).json({ error: "Error creating Invoice", error });
//   }
// };

const createInvoice = async (req, res) => {
  const {
      account, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
      reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
      payInvoicewithcredits, lineItems, summary, active
  } = req.body;

  try {
      // Generate the next invoice number
      const lastInvoice = await Invoice.findOne().sort({ invoicenumber: -1 }).select("invoicenumber");
      const invoicenumber = lastInvoice ? lastInvoice.invoicenumber + 1 : 1;

      // Check if the invoice already exists (redundant with autoincrement but kept for safety)
      const existingInvoice = await Invoice.findOne({ invoicenumber });
      if (existingInvoice) {
          return res.status(409).json({ message: "Invoice already exists" });
      }

      // Create a new invoice
      const newInvoice = await Invoice.create({
          account, invoicenumber, invoicedate, description, invoicetemplate, paymentMethod, teammember, emailinvoicetoclient,
          reminders, daysuntilnextreminder, numberOfreminder, scheduleinvoice, scheduleinvoicedate, scheduleinvoicetime,
          payInvoicewithcredits, lineItems, summary, active
      });

      const accountinv = await Accounts.findById(account).populate("contacts");
      if (!accountinv) {
          return res.status(404).json({ status: 404, message: "Account not found." });
      }

      // Filter valid contacts
      const validContacts = accountinv.contacts.filter(contact => contact.emailSync);
      if (validContacts.length === 0) {
          return res.status(400).json({ status: 400, message: "No contacts with emailSync enabled." });
      }

      const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use STARTTLS
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false // Only for development
          },
      });

      // Ensure the invoices directory exists
      const invoicesDir = path.resolve(__dirname, "invoices");
      if (!fs.existsSync(invoicesDir)) {
          fs.mkdirSync(invoicesDir, { recursive: true });
      }

      // Generate PDF for the invoice
      const pdfPath = path.join(invoicesDir, `invoice_${invoicenumber}.pdf`);
      const printContent = `
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  padding: 35px;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #555;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
              }
              th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
              }
              th {
                  background-color: #f2f2f2;
              }
              .summary-table {
                  width: 50%;
                  margin-left: auto;
                  margin-top: 20px;
              }
              .total-row td {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <h1>Invoice Number #${newInvoice.invoicenumber}</h1>
          <p><strong>Date:</strong> ${new Date(newInvoice.invoicedate).toLocaleDateString()}</p>
          <p><strong>${accountinv.accountName}</strong></p>
          <p><strong>Description:</strong> ${newInvoice.description}</p>
          <table>
              <thead>
                  <tr>
                      <th>Product/Service</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  ${newInvoice.lineItems
          .map(item => `
                          <tr>
                              <td>${item.productorService}</td>
                              <td>$${item.rate}</td>
                              <td>${item.quantity}</td>
                              <td>$${item.amount}</td>
                          </tr>
                      `)
          .join("")}
              </tbody>
          </table>
          <table class="summary-table">
              <tr>
                  <td><strong>Subtotal</strong></td>
                  <td>$${newInvoice.summary.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                  <td><strong>Tax</strong></td>
                  <td>$${newInvoice.summary.taxTotal.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                  <td><strong>Total</strong></td>
                  <td>$${newInvoice.summary.total.toFixed(2)}</td>
              </tr>
          </table>
      </body>
      </html>
  `;

  // Generate PDF with Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(printContent, { waitUntil: "networkidle0" });
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  console.log("PDF successfully written to:", pdfPath);

      console.log("Starting email sending process...");
      const emailPromises = validContacts.map(async (contact) => {
          console.log(`Preparing to send email to: ${contact.email}`);
          const mailOptions = {
              from: process.env.EMAIL,
              to: contact.email,
              subject: "Invoice Created",
              text: `Dear ${accountinv.accountName},\n\nYour invoice has been created.\n\nBest regards,`,
              attachments: [{ filename: `invoice_${invoicenumber}.pdf`, path: pdfPath }],
          };

          try {
              const result = await transporter.sendMail(mailOptions);
              return result;
          } catch (error) {
              console.error(`Failed to send email to ${contact.email}:`, error.message);
              throw error;
          }
      });

      console.log("Waiting for all emails to complete...");
      await Promise.all(emailPromises);

      console.log("All emails sent successfully.");
      return res.status(201).json({ message: "Invoice created successfully", newInvoice });
  } catch (error) {
      console.error("Error creating Invoice:", error);
      return res.status(500).json({ error: "Error creating Invoice", details: error.message });
  }
};

//delete a Invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Invoice ID" });
  }

  try {
    const deletedInvoice = await Invoice.findByIdAndDelete({ _id: id });
    if (!deletedInvoice) {
      return res.status(404).json({ error: "No such Invoice" });
    }
    res.status(200).json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//update a new Invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Invoice ID" });
  }

  try {
    const updatedInvoice = await Invoice.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!updatedInvoice) {
      return res.status(404).json({ error: "No such Invoice" });
    }

    res.status(200).json({ message: "Invoice Updated successfully", updatedInvoice });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Get a single InvoiceList List
const getInvoiceList = async (req, res) => {
  const invoiceList = [];
  try {
    const invoice = await Invoice.find().populate({ path: "account", model: "account" }).populate({ path: "teammember", model: "User" });

    const account = invoice.account.map(accountname);
    const Assignee = invoice.teammember.map(teammember);

    invoiceList.push({
      clientname: account.accountname,
      clientid: account._id,
      invoice: invoice.invoicenumber,
      status: "",
      assigneename: Assignee.username,
      assigneeid: Assignee._id,
      posted: "",
      amount: invoice.amount,
      paid: "",
      description: invoice.description,
    });

    res.status(200).json({ message: "Invoice retrieved successfully", invoiceList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a single InvoiceList List
const getInvoiceListbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id)
      .populate({ path: "account", model: "Accounts" }) // Ensure model name matches exactly
      .populate({ path: "invoicetemplate", model: "InvoiceTemplate" })
      .populate({ path: "teammember", model: "User" });

    res.status(200).json({ message: "Invoice retrieved successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single InvoiceList by Account ID
const getInvoiceListbyAccountid = async (req, res) => {
  const { id } = req.params; // Correct destructuring
  // console.log(id); // Log the account ID for debugging

  try {
    const invoice = await Invoice.find({ account: id }); // Corrected syntax here

    if (!invoice || invoice.length === 0) {
      return res.status(404).json({ message: "No invoices found for this account." });
    }

    res.status(200).json({ message: "Invoice retrieved successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice,
  getInvoiceList,
  getInvoiceListbyid,
  getInvoiceListbyAccountid,
};
