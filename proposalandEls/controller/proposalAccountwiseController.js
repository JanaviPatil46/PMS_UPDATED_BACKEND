// const ProposalesandelsAccountwise = require('../models/proposalAccountwiseModel');
// const mongoose = require("mongoose");
// const Accounts = require('../models/AccountModel'); // Ensure the path is correct
// const User = require('../models/userModel'); // Import User if not already imported
// const ProposalanselsTemplate = require('../models/proposalsandelsModel'); // Import if used

// //get all ProposalesAndElsTemplate
// const getProposalesAndElsAccountswise = async (req, res) => {
//     try {
//         const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find({}).sort({ createdAt: -1 });
//         res.status(200).json({ message: "ProposalesAndEls Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// };


// //Get a single ServiceTemplate
// const getProposalesAndElsAccountwise = async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid ProposalesAndEls Accountwise ID" });
//     }
//     try {
//         const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id);
//         if (!proposalesandelsAccountwise) {
//             return res.status(404).json({ error: "No such ProposalesAndEls Accountwise" });
//         }

//         res.status(200).json({ message: "ProposalesAndEls Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a single InvoiceList by Account ID
// const getProposalandElsListbyAccountid = async (req, res) => {
//     const { id } = req.params; // Correct destructuring
//     try {
//         const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find({ accountid: id })
//         .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
//         .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls' })
//         .populate({ path: 'teammember', model: 'User' }); // Ensure model name matches exactly; // Corrected syntax here

//         if (!proposalesandelsAccountwise || proposalesandelsAccountwise.length === 0) {
//             return res.status(404).json({ message: "No Proposalesandels found for this account." });
//         }
//         res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get a single InvoiceList by Account ID
// const getProposalandElsList = async (req, res) => {

//     try {
//         const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find()
//         .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
//         .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls' })
//         .populate({ path: 'teammember', model: 'User' }); // Ensure model name matches exactly; // Corrected syntax here

//         if (!proposalesandelsAccountwise || proposalesandelsAccountwise.length === 0) {
//             return res.status(404).json({ message: "No Proposalesandels found for this account." });
//         }
//         res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// //Get a single InvoiceList List
// // const getProposalandElsListbyid = async (req, res) => {
// //     const { id } = req.params;
  
// //     try {
// //       const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id)
// //         .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
// //         .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls', select: 'templatename _id', })
// //         .populate({ path: 'teammember', model: 'User' });
  
// //       res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   };

// const getProposalandElsListbyid = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id)
//         .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
//         .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls', select: 'templatename _id', })
//         .populate({ path: 'teammember', model: 'User' })
//         .populate({ path: 'invoiceteammember', model: 'User', select: 'username _id', })
//         .populate({ path: 'servicesandinvoicetempid', model: 'InvoiceTemplate', select: 'templatename _id', });

//       res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   const deleteProposalesAndElsAccountwise = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid ProposalesAndEls Accountwise ID" });
//     }
//     try {
//         const deletedProposalesAndElsAccountwise = await ProposalesandelsAccountwise.findByIdAndDelete({ _id: id });
//         if (!deletedProposalesAndElsAccountwise) {
//             return res.status(404).json({ error: "No such  ProposalesAndEls Accountwise" });
//         }
//         res.status(200).json({ message: " ProposalesAndEls Accountwise deleted successfully", deletedProposalesAndElsAccountwise });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// //update a new ServiceTemplate 
// const updateProposalesandelsAccountwise = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Invalid Proposalesandels Accountwise ID" });
//     }
//     try {
//         const updatedProposalesandelsAccountwise = await ProposalesandelsAccountwise.findOneAndUpdate(
//             { _id: id },
//             { ...req.body },
//             { new: true }
//         );
//         if (!updatedProposalesandelsAccountwise) {
//             return res.status(404).json({ error: "No such Proposalesandels Accountwise" });
//         }
//         res.status(200).json({ message: "Proposalesandels Accountwise Updated successfully", updatedProposalesandelsAccountwise });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// const createProposalsAndElsAccounts = async (req, res) => {
//     const { 
//         accountids, 
//         proposaltemplateid, 
//         teammember, 
//         proposalname, 
//         introduction, 
//         terms, 
//         servicesandinvoices, 
//         introductiontextname, 
//         introductiontext, 
//         termsandconditionsname, 
//         termsandconditions, 
//         custommessageinemail, 
//         custommessageinemailtext, 
//         reminders, 
//         daysuntilnextreminder, 
//         numberofreminder, 
//         servicesandinvoicetempid, 
//         invoicetemplatename, 
//         invoiceteammember, 
//         issueinvoice, 
//         specificdate, 
//         specifictime, 
//         description, 
//         lineItems, 
//         summary, 
//         notetoclient, 
//         Addinvoiceoraskfordeposit, 
//         Additemizedserviceswithoutcreatinginvoices, 
//         paymentterms, 
//         paymentduedate, 
//         paymentamount, 
//         active 
//     } = req.body;

//     // Check if accountids is an array
//     if (!Array.isArray(accountids)) {
//         return res.status(400).json({ error: "accountids must be an array" });
//     }
//     try {
//         for (const accountid of accountids) {
//             await ProposalesandelsAccountwise.create({
//                 accountid,
//                 proposaltemplateid,
//                 teammember,
//                 proposalname,
//                 introduction,
//                 terms,
//                 servicesandinvoices,
//                 introductiontextname,
//                 introductiontext,
//                 termsandconditionsname,
//                 termsandconditions,
//                 custommessageinemail,
//                 custommessageinemailtext,
//                 reminders,
//                 daysuntilnextreminder,
//                 numberofreminder,
//                 servicesandinvoicetempid,
//                 invoicetemplatename,
//                 invoiceteammember,
//                 issueinvoice,
//                 specificdate,
//                 specifictime,
//                 description,
//                 lineItems,
//                 summary,
//                 notetoclient,
//                 Addinvoiceoraskfordeposit,
//                 Additemizedserviceswithoutcreatinginvoices,
//                 paymentterms,
//                 paymentduedate,
//                 paymentamount,
//                 active
//             });
//         }
//         return res.status(201).json({ message: "ProposalesandelsAccountwise created successfully" });
//     } catch (error) {
//         console.error("Error creating ProposalesandelsAccountwise:", error);
//         return res.status(500).json({ error: "Error creating ProposalesandelsAccountwise" });
//     }
// };


// module.exports = {
//     createProposalsAndElsAccounts,
//     getProposalesAndElsAccountswise,
//     getProposalesAndElsAccountwise,
//     deleteProposalesAndElsAccountwise,
//     updateProposalesandelsAccountwise,
//     getProposalandElsListbyid,
//     getProposalandElsListbyAccountid,
//     getProposalandElsList
// }
const ProposalesandelsAccountwise = require('../models/proposalAccountwiseModel');
const mongoose = require("mongoose");
const Accounts = require('../models/AccountModel'); // Ensure the path is correct
const User = require('../models/userModel'); // Import User if not already imported
const ProposalanselsTemplate = require('../models/proposalsandelsModel'); // Import if used
const nodemailer = require('nodemailer');
const Contacts = require('../models/contactsModel')
//get all ProposalesAndElsTemplate
const getProposalesAndElsAccountswise = async (req, res) => {
    try {
        const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find({}).sort({ createdAt: -1 });
        res.status(200).json({ message: "ProposalesAndEls Accountwise retrieved successfully", proposalesandelsAccountwise });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


//Get a single ServiceTemplate
const getProposalesAndElsAccountwise = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ProposalesAndEls Accountwise ID" });
    }
    try {
        const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id);
        if (!proposalesandelsAccountwise) {
            return res.status(404).json({ error: "No such ProposalesAndEls Accountwise" });
        }

        res.status(200).json({ message: "ProposalesAndEls Accountwise retrieved successfully", proposalesandelsAccountwise });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single InvoiceList by Account ID
const getProposalandElsListbyAccountid = async (req, res) => {
    const { id } = req.params; // Correct destructuring
    try {
        const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find({ accountid: id })
        .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
        .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls' })
        .populate({ path: 'teammember', model: 'User' }); // Ensure model name matches exactly; // Corrected syntax here

        if (!proposalesandelsAccountwise || proposalesandelsAccountwise.length === 0) {
            return res.status(404).json({ message: "No Proposalesandels found for this account." });
        }
        res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single InvoiceList by Account ID
const getProposalandElsList = async (req, res) => {

    try {
        const proposalesandelsAccountwise = await ProposalesandelsAccountwise.find()
        .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
        .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls' })
        .populate({ path: 'teammember', model: 'User' }); // Ensure model name matches exactly; // Corrected syntax here

        if (!proposalesandelsAccountwise || proposalesandelsAccountwise.length === 0) {
            return res.status(404).json({ message: "No Proposalesandels found for this account." });
        }
        res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Get a single InvoiceList List
// const getProposalandElsListbyid = async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id)
//         .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
//         .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls', select: 'templatename _id', })
//         .populate({ path: 'teammember', model: 'User' });
  
//       res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

const getProposalandElsListbyid = async (req, res) => {
    const { id } = req.params;
  
    try {
      const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id)
        .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
        .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls', select: 'templatename _id', })
        .populate({ path: 'teammember', model: 'User' })
        .populate({ path: 'invoiceteammember', model: 'User', select: 'username _id', })
        .populate({ path: 'servicesandinvoicetempid', model: 'InvoiceTemplate', select: 'templatename _id', });

      res.status(200).json({ message: "Proposalesandels Accountwise retrieved successfully", proposalesandelsAccountwise });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteProposalesAndElsAccountwise = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ProposalesAndEls Accountwise ID" });
    }
    try {
        const deletedProposalesAndElsAccountwise = await ProposalesandelsAccountwise.findByIdAndDelete({ _id: id });
        if (!deletedProposalesAndElsAccountwise) {
            return res.status(404).json({ error: "No such  ProposalesAndEls Accountwise" });
        }
        res.status(200).json({ message: " ProposalesAndEls Accountwise deleted successfully", deletedProposalesAndElsAccountwise });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update a new ServiceTemplate 
const updateProposalesandelsAccountwise = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Proposalesandels Accountwise ID" });
    }
    try {
        const updatedProposalesandelsAccountwise = await ProposalesandelsAccountwise.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true }
        );
        if (!updatedProposalesandelsAccountwise) {
            return res.status(404).json({ error: "No such Proposalesandels Accountwise" });
        }
        res.status(200).json({ message: "Proposalesandels Accountwise Updated successfully", updatedProposalesandelsAccountwise });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// const createProposalsAndElsAccounts = async (req, res) => {
//     const { 
//         accountids, 
//         proposaltemplateid, 
//         teammember, 
//         proposalname, 
//         introduction, 
//         terms, 
//         servicesandinvoices, 
//         introductiontextname, 
//         introductiontext, 
//         termsandconditionsname, 
//         termsandconditions, 
//         custommessageinemail, 
//         custommessageinemailtext, 
//         reminders, 
//         daysuntilnextreminder, 
//         numberofreminder, 
//         servicesandinvoicetempid, 
//         invoicetemplatename, 
//         invoiceteammember, 
//         issueinvoice, 
//         specificdate, 
//         specifictime, 
//         description, 
//         lineItems, 
//         summary, 
//         notetoclient, 
//         Addinvoiceoraskfordeposit, 
//         Additemizedserviceswithoutcreatinginvoices, 
//         paymentterms, 
//         paymentduedate, 
//         paymentamount, 
//         active 
//     } = req.body;

//     // Check if accountids is an array
//     if (!Array.isArray(accountids)) {
//         return res.status(400).json({ error: "accountids must be an array" });
//     }
//     try {
//         for (const accountid of accountids) {
//             await ProposalesandelsAccountwise.create({
//                 accountid,
//                 proposaltemplateid,
//                 teammember,
//                 proposalname,
//                 introduction,
//                 terms,
//                 servicesandinvoices,
//                 introductiontextname,
//                 introductiontext,
//                 termsandconditionsname,
//                 termsandconditions,
//                 custommessageinemail,
//                 custommessageinemailtext,
//                 reminders,
//                 daysuntilnextreminder,
//                 numberofreminder,
//                 servicesandinvoicetempid,
//                 invoicetemplatename,
//                 invoiceteammember,
//                 issueinvoice,
//                 specificdate,
//                 specifictime,
//                 description,
//                 lineItems,
//                 summary,
//                 notetoclient,
//                 Addinvoiceoraskfordeposit,
//                 Additemizedserviceswithoutcreatinginvoices,
//                 paymentterms,
//                 paymentduedate,
//                 paymentamount,
//                 active
//             });
//         }
//         return res.status(201).json({ message: "ProposalesandelsAccountwise created successfully" });
//     } catch (error) {
//         console.error("Error creating ProposalesandelsAccountwise:", error);
//         return res.status(500).json({ error: "Error creating ProposalesandelsAccountwise" });
//     }
// };

const createProposalsAndElsAccounts = async (req, res) => {
    const {
        accountids,
        proposaltemplateid,
        teammember,
        proposalname,
        introduction,
        terms,
        servicesandinvoices,
        introductiontextname,
        introductiontext,
        termsandconditionsname,
        termsandconditions,
        custommessageinemail,
        custommessageinemailtext,
        reminders,
        daysuntilnextreminder,
        numberofreminder,
        servicesandinvoicetempid,
        invoicetemplatename,
        invoiceteammember,
        issueinvoice,
        specificdate,
        specifictime,
        description,
        lineItems,
        summary,
        notetoclient,
        Addinvoiceoraskfordeposit,
        Additemizedserviceswithoutcreatinginvoices,
        paymentterms,
        paymentduedate,
        paymentamount,
        active
    } = req.body;
    
    const missingContactsAccounts = [];

    // Check if accountids is an array
    if (!Array.isArray(accountids)) {
        return res.status(400).json({ error: "accountids must be an array" });
    }
    try {
        for (const accountid of accountids) {
            await ProposalesandelsAccountwise.create({
                accountid,
                proposaltemplateid,
                teammember,
                proposalname,
                introduction,
                terms,
                servicesandinvoices,
                introductiontextname,
                introductiontext,
                termsandconditionsname,
                termsandconditions,
                custommessageinemail,
                custommessageinemailtext,
                reminders,
                daysuntilnextreminder,
                numberofreminder,
                servicesandinvoicetempid,
                invoicetemplatename,
                invoiceteammember,
                issueinvoice,
                specificdate,
                specifictime,
                description,
                lineItems,
                summary,
                notetoclient,
                Addinvoiceoraskfordeposit,
                Additemizedserviceswithoutcreatinginvoices,
                paymentterms,
                paymentduedate,
                paymentamount,
                active
            });

        

            const account = await Accounts.findById(accountid);

            for (const contactId of account.contacts) {
                const contact = await Contacts.findById(contactId);
                console.log(contact)
                if (contact.login === true) {
                    if (!contact.email) {
                        missingContactsAccounts.push(account.accountName);
                    } else {
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // Use STARTTLS
                            auth: {
                                user: "dipeeka.pote52@gmail.com",
                                pass: "togt ljzg urar dlam",
                            },
                        });

                        const mailOptions = {
                            from: 'dipeeka.pote52@gmail.com',
                            to: contact.email,
                            subject: `Review and sign document: ${proposalname}`,
                            html: `                                                           
                                <p><b>${proposalname}</b></p>
                             
                                <p>Button not working? Copy and paste this link into your browser:</p>
                             `,
                        };
                    //     <a href="${proposalLink}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    //     Review and Sign
                    // </a>
                        // <p>${username} has sent the following for your review and signature:</p>
                        // <p><a href="${proposalLink}">${proposalLink}</a></p>
                        await transporter.sendMail(mailOptions);
                        console.log(`Email sent to ${contact.email}`);
                    }
                }
            }

        }

        if (missingContactsAccounts.length > 0) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use STARTTLS
                auth: {
                    user: "dipeeka.pote52@gmail.com",
                    pass: "togt ljzg urar dlam",
                },
            });

            const missingAccountsList = missingContactsAccounts.join(', ');

            const mailOptions = {
                from: 'dipeeka.pote52@gmail.com',
                to: 'dipeeka.pote52@gmail.com',
                subject: 'Some proposals were not created',
                html: `
                    <p>The following accounts have no contacts who can sign proposals, so we couldn’t create proposals for them:</p>
                    <p>${missingAccountsList}</p>
                    <p>Proposal name:</p>
                    <p>${proposalname}</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log('Notification email sent about missing contacts');
        }

        return res.status(201).json({ message: "ProposalesandelsAccountwise created successfully" });
    } catch (error) {
        console.error("Error creating ProposalesandelsAccountwise:", error);
        return res.status(500).json({ error: "Error creating ProposalesandelsAccountwise" });
    }
};

module.exports = {
    createProposalsAndElsAccounts,
    getProposalesAndElsAccountswise,
    getProposalesAndElsAccountwise,
    deleteProposalesAndElsAccountwise,
    updateProposalesandelsAccountwise,
    getProposalandElsListbyid,
    getProposalandElsListbyAccountid,
    getProposalandElsList
}