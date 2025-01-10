const express = require("express");
const router = express.Router();

const { createOrganizerAccountWise, getOrganizerAccountWise, getOrganizerAccountWises, updateOrganizerAccountWiseStatus,deleteOrganizerAccountWise, getOrganizerByAccountId, updateOrganizerAccountWise,
    // getActiveOrganizerAccountWises

 } = require("../controller/organizerAccountWiseController");

//******organizer Accountwise Start******** */

router.get("/organizeraccountwise", getOrganizerAccountWises);
router.get("/organizeraccountwise/:id", getOrganizerAccountWise);
// router.get("/organizeraccountwise/:isactive/:accountid",getActiveOrganizerAccountWises);
router.post("/organizeraccountwise/org", createOrganizerAccountWise);
router.delete("/organizeraccountwise/:id", deleteOrganizerAccountWise);
// router.get("/organizeraccountwise/organizerbyaccount/:id", getOrganizerByAccountId);
router.get("/organizeraccountwise/organizerbyaccount/accid/:id/:isactive", getOrganizerByAccountId);

router.patch("/organizeraccountwise/:id", updateOrganizerAccountWise);
router.patch("/organizeraccountwise/organizeraccountwisestatus/:id/:issubmited", updateOrganizerAccountWiseStatus);
//******organizer Accountwise ENd******** */

module.exports = router;
