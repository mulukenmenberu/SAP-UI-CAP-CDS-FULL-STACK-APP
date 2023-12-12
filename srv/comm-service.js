const cds = require('@sap/cds');

module.exports = async function () {
  const db = await cds.connect.to('db');
  const { Student_communications, Users, Students } = db.entities;

  // Function to insert demo data
  const insertDemoData = async () => {
    const demoData = [];

    const existingRecords = await SELECT.from(Student_communications).then((result) => result.length);

    if (existingRecords === 0) {
      for (const data of demoData) {
        console.log(data);
        await INSERT.into(Student_communications).entries(data);
      }
    }
  };

  // Insert demo data before processing any read operation
  await insertDemoData();

  // Handle READ operation
  this.on('READ', 'Student_communications', async (req) => {
    const result = await SELECT.from(Student_communications);
    return result;
  });

  // Handle CREATE operation
  this.on('CREATE', 'Student_communications', async (req) => {
    const data = req.data;
    console.log(data);

    // Check if associated Students and Users exist before inserting
    const studentExists = await SELECT.from(Students).where({ Student_db_id: data.Student_db_id });
    const userExists = await SELECT.from(Users).where({ User_id: data.User_id });

    if (studentExists.length > 0 && userExists.length > 0) {
      const newCommunication = await INSERT.into(Student_communications).entries(data);
      return newCommunication;
    } else {
      // Handle error when associated records do not exist
      return req.error(404, 'Associated records not found');
    }
  });
};
