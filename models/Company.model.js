const { Schema, model } = require("mongoose");

// In the employee propperty, we could reference it to the employee schema using:
// Schema.Types.ObjectId,
// ref: "Employee"
// This way we could populate the employee property and get all the info from that particular employee
const companySchema = new Schema(
  {
    business_name: {
      type: String,
    },
    industry: {
      type: String,
    },
    type: {
      type: String,
    },
    employee: {
      type: String,
      default: "Not yet assigned",
    },
    assigned: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Company = model("company", companySchema);

module.exports = Company;
