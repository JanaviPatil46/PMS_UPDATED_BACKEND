const express = require("express");
const router = express.Router();

const { createOrganizerAccounts, getOrganizerAccountWise, getOrganizerAccountWises, createOrganizerAccountWise, deleteOrganizerAccountWise, getOrganizerByAccountId, updateOrganizerAccountWise } = require("../controller/organizerAccountWiseController");

//******organizer Accountwise Start******** */

router.get("/organizeraccountwise", getOrganizerAccountWises);
router.get("/organizeraccountwise/:id", getOrganizerAccountWise);
router.post("/organizeraccountwise/org", createOrganizerAccountWise);
router.delete("/organizeraccountwise/:id", deleteOrganizerAccountWise);
router.get("/organizeraccountwise/organizerbyaccount/:id", getOrganizerByAccountId);
router.patch("/organizeraccountwise/:id", updateOrganizerAccountWise);
router.post("/organizeraccountswise/org", createOrganizerAccounts);

//******organizer Accountwise ENd******** */

module.exports = router;
