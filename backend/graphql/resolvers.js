const Employee = require("../models/employee");

const resolvers = {
    Query: {
        hello: () => "Hello World",
        getAllEmployee: async () => {
            try {
                return await Employee.find();
            } catch (err) {
                console.log("--> Error :", err);
            }
        },
    },
    Mutation: {
        createEmployee: async (parent, args, context, info) => {
            try {
                const { dateOfJoining } = args.employeeDetails;
                const employee = new Employee({
                    ...args.employeeDetails,
                    dateOfJoining: new Date(dateOfJoining),
                });
                return await employee.save();
            } catch (err) {
                console.log("--> Error :", err);
            }
        },
    },
};

module.exports = { resolvers };
