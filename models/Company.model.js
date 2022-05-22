const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
