const cds = require('@sap/cds');

module.exports = async function () {
  const db = await cds.connect.to('db');
  const { Student_applications } = db.entities;

  // Function to insert demo data
  const insertDemoData = async () => {
    const demoData = [];

    const existingRecords = await SELECT.from(Student_applications).then((result) => result.length);

    if (existingRecords === 0) {
      for (const data of demoData) {
        console.log(data);
        await INSERT.into(Student_applications).entries(data);
      }
    }
  };

  // Insert demo data before processing any read operation
  await insertDemoData();

  // Handle READ operation
  this.on('READ', 'Student_applications', async (req) => {
    const result = await SELECT.from(Student_applications);
    return result;
  });

  // Handle CREATE operation
  this.on('CREATE', 'Student_applications', async (req) => {
    const data = req.data;
    console.log(data);

    const newApplication = await INSERT.into(Student_applications).entries(data);
    return newApplication;
  });
};
