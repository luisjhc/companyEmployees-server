const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
