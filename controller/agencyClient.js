const catchAsyncError = require("../middelware/catchAsyncError");
const mongoose = require('mongoose');
const { Types } = mongoose;
const errorHandler = require("../utils/errorHandler");
const agencyModel = require("../model/agency");
const clientModel = require("../model/client");
const sendToken = require("../utils/jwtToken");

exports.createAgencyAndClient = catchAsyncError(async (req, res, next) => {
    const { agencyName,agencyId, address1, address2, state, city, phoneNumber, clientId, clientName, email, clientPhoneNumber, totalBill } = req.body;
  
    // Create the agency
    const agency = await agencyModel.Agency.create({
      name:agencyName,
      agencyId,
      address1,
      address2,
      state,
      city,
      phoneNumber,
    });
  
    // Create the client and assign it to the agency
    const client = await clientModel.Client.create({
      agency: agency._id,
      name: clientName,
      clientId,
      email,
      phoneNumber: clientPhoneNumber,
      totalBill,
    });
  
    // Update the agency with the client
    agency.clients.push(client._id);
    await agency.save();
  
    sendToken(client, 201, res);
  });
  
  exports.UpdateClient = catchAsyncError(async (req, res, next) => {
    let client = await clientModel.Client.findById(req.params.id);
  
    if (!client) {
      return next(new errorHandler("client not found", 404));
    }
  
    client = await clientModel.Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
      client,
    });
  });
  
  exports.topClients = catchAsyncError(async (req, res, next) => {
    const result = await clientModel.Client.aggregate([
      { $group: { _id: "$agency", maxTotalBill: { $max: "$totalBill" }, client: { $first: "$$ROOT" } } },
      {
        $lookup: {
          from: "agencies",
          localField: "_id",
          foreignField: "_id",
          as: "agency",
        },
      },
      { $unwind: "$agency" },
      { $sort: { maxTotalBill: -1 } },
      { $limit: 1 },
      {
        $project: {
          _id: 0,
          agencyName: "$agency.name",
          clientName: "$client.name",
          totalBill: "$maxTotalBill",
        },
      },
    ]);
    res.json(result[0]);
  });
  
  
