import React, { useState } from "react";

const DataTable = () => {

  const data = [
    { id: 1, name: "Anshuman padhee", age: 21, department: "IT", year: "3rd", dob: "12-08-2004" },
    { id: 2, name: "adarsh guru", age: 22, department: "IT", year: "3rd", dob: "21-08-2014" },
    { id: 3, name: "pranab", age: 22, department: "cse", year: "3rd", dob: "12-02-1994" },
    { id: 4, name: "lokesh", age: 45, department: "civil", year: "3rd", dob: "13-02-1998" },
    { id: 5, name: "Chintu", age: 30, department: "mme", year: "3rd", dob: "23-07-2003" },
    { id: 6, name: "sidhant", age: 29, department: "civil", year: "2nd", dob: "12-08-2004" },
    { id: 7, name: "raman", age: 33, department: "eco", year: "3rd", dob: "12-00-2001" },
    { id: 8, name: "aditya", age: 27, department: "IT", year: "3rd", dob: "30-06-2005" },
    { id: 9, name: "faizan", age: 40, department: "chemical", year: "3rd", dob: "31-12-2000" },
    { id: 10, name: "soumya ranjan", age: 25, department: "mechanical", year: "2nd", dob: "12-05-1994" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterDepartment, setFilterDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;  

  const filteredData = data.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment ? item.department === filterDepartment : true)
    );
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (sortConfig.key === "dob") {
          
          const dateA = new Date(a.dob.split("-").reverse().join("-"));
          const dateB = new Date(b.dob.split("-").reverse().join("-"));
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === "year") {
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);
          return sortConfig.direction === "asc" ? yearA - yearB : yearB - yearA;
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    setFilterDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Custom DataTable</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterDepartment}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="cse">CSE</option>
          <option value="civil">Civil</option>
          <option value="mme">MME</option>
          <option value="eco">ECO</option>
          <option value="chemical">Chemical</option>
          <option value="mechanical">Mechanical</option>
        </select>
        <select
          value={sortConfig.key || ""}
          onChange={(e) => handleSort(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="age">Age</option>
          <option value="department">Department</option>
          <option value="dob">D.o.B</option>
          <option value="year">Year</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th
                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort("name")}
              >
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort("age")}
              >
                Age {sortConfig.key === "age" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort("department")}
              >
                Department {sortConfig.key === "department" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort("dob")}
              >
                Date of Birth {sortConfig.key === "dob" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort("year")}
              >
                Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.age}</td>
                <td className="px-6 py-4">{item.department}</td>
                <td className="px-6 py-4">{item.dob}</td>
                <td className="px-6 py-4">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
      <span className="text-red-600 !important">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} records
      </span>


        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
