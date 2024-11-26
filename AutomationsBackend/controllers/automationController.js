// controllers/automationController.js
const Automation = require('../models/automationModel');


// @route   POST /api/automations
// exports.createAutomation = async (req, res) => {
//   try {
//     const { automationType, templateId, accountId } = req.body;

//    console.log(automationType)
//    console.log(templateId)
//    console.log(accountId)
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const Account = require('../models/AccountModel.js');
const Contacts = require('../models/contactsModel.js');
const EmailTemplate = require('../models/emailTemplateModel.js')
const nodemailer = require("nodemailer");
exports.createAutomation = async (req, res) => {
  try {
    const { automationType, templateId, accountId } = req.body;

    // Log the incoming data for debugging
    console.log("Automation Type:", automationType);
    console.log("Template ID:", templateId);
    console.log("Account ID:", accountId);

    // Use a switch statement to handle different automation types
    switch (automationType) {
      case "send email":
                // Validate inputs
                if (!templateId || !accountId) {
                    return res.status(400).json({ status: 400, message: "Please provide email template ID and account ID." });
                }

                // Fetch account and contacts
                const account = await Account.findById(accountId).populate("contacts");
                if (!account) {
                    return res.status(404).json({ status: 404, message: "Account not found." });
                }

                // Fetch the email template
                const emailTemplate = await EmailTemplate.findById(templateId);
                if (!emailTemplate) {
                    return res.status(404).json({ status: 404, message: "Email template not found." });
                }

                const { subject: emailsubject, body: emailbody } = emailTemplate;

                // Helper function to replace placeholders
                const replacePlaceholders = (template, data) => {
                    return template.replace(/\[([\w\s]+)\]/g, (match, placeholder) => {
                        return data[placeholder.trim()] || ""; // Replace with data or empty string
                    });
                };

                // Filter valid contacts
                const validContacts = account.contacts.filter(contact => contact.emailSync);
                if (validContacts.length === 0) {
                    return res.status(400).json({ status: 400, message: "No contacts with emailSync enabled." });
                }

                // Email sending logic
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.EMAIL_PASSWORD,
                    },
                    tls: {
                      rejectUnauthorized: false // Only for development
                    },
                });

                for (const contact of validContacts) {
                    try {
                        // Generate email body and subject
                        const mailBody = replacePlaceholders(emailbody, {
                            ACCOUNT_NAME: account.accountName,
                            FIRST_NAME: contact.firstName,
                            LAST_NAME: contact.lastName,
                            EMAIL: contact.email,
                            PHONE_NUMBER: contact.phoneNumbers?.join(", "), // If phoneNumbers is an array
                        });

                        const mailSubject = replacePlaceholders(emailsubject, {
                            ACCOUNT_NAME: account.accountName,
                            FIRST_NAME: contact.firstName,
                            LAST_NAME: contact.lastName,
                        });

                        const mailOptions = {
                            from: process.env.EMAIL_USER,
                            to: contact.email,
                            subject: mailSubject,
                            html: mailBody,
                        };

                        await transporter.sendMail(mailOptions);
                        console.log(`Email sent to ${contact.email}`);
                    } catch (error) {
                        console.error(`Failed to send email to ${contact.email}:`, error.message);
                    }
                }

                return res.status(200).json({ status: 200, message: "Emails sent successfully." });
        // break;

      case "send Invoice":
        console.log("Executing invoice sending logic...");
        // Add invoice logic here
        break;

      case "send proposal":
      case "El":
        console.log("Executing proposal or El logic...");
        // Add proposal/El logic here
        break;

      case "create organizer":
        console.log("Executing organizer creation logic...");
        // Add organizer creation logic here
        break;

      default:
        console.log("Unknown automation type.");
        return res.status(400).json({ message: "Invalid automation type" });
    }

    // Send a success response for demonstration
    res.status(200).json({ message: `Automation '${automationType}' executed successfully.` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

