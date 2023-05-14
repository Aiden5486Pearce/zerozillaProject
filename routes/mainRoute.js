const express = require('express')
const {createAgencyAndClient, UpdateClient, topClients } = require('../controller/agencyClient')
const router = express.Router()

router.route('/createAgencyAndClient').post(createAgencyAndClient)
router.route('/updateClient/:id',).put(UpdateClient)
router.route('/topClients').get(topClients)

module.exports = router