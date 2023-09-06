function fetchSalariesFromDatabase(workerId) {
  // Return the monthly salary information for the worker
  return [
    { month: 'January', salary: 2000 },
    { month: 'February', salary: 2500 },
    { month: 'March', salary: 2200 },
    // ... additional salary records
  ];
}

// Get worker's salaries
exports.getSalaries = (req, res) => {
  const workerId = req.workerId;

  // Fetch the salary information for the authenticated worker from the database
  const salaries = fetchSalariesFromDatabase(workerId);

  res.json({ salaries });
};