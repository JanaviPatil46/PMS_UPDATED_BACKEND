const ProposalesandelsAccountwise = require('../models/proposalAccountwiseModel');
const mongoose = require("mongoose");
const Accounts = require('../models/AccountModel'); // Ensure the path is correct
const User = require('../models/userModel'); // Import User if not already imported
const ProposalanselsTemplate = require('../models/proposalsandelsModel'); // Import if used

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
const getProposalandElsListbyid = async (req, res) => {
    const { id } = req.params;
  
    try {
      const proposalesandelsAccountwise = await ProposalesandelsAccountwise.findById(id)
        .populate({ path: 'accountid', model: 'Accounts' }) // Ensure model name matches exactly
        .populate({ path: 'proposaltemplateid', model: 'ProposalesAndEls', select: 'templatename _id', })
        .populate({ path: 'teammember', model: 'User' });
  
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