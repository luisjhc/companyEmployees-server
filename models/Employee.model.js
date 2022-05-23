const { Schema, model } = require("mongoose");

// In the company propperty, we could reference it to the company schema using:
// Schema.Types.ObjectId,
// ref: "Company"
// This way we could populate the company property and get all the info from that particular company
const employeeSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    company: {
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

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
