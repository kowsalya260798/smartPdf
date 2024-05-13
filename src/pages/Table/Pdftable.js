import React, { useState, useMemo } from 'react';
import './pdftable.css'; // Import your CSS file
import Pdfform from "./Pdfform.js"
import { useNavigate } from 'react-router-dom';

const Pdftable = () => {
  const initialColumns = 6;

  const generateInitialData = (columns) => {
    const initialData = [];
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hannah', 'Isaac', 'Jack'];
    const ages = ['12', '24', '16', '18', '47', '54', '24', '56', '78', '45'];
    const addresses = ['Address1', 'Address2', 'Address3', 'Address4', 'Address5', 'Address6', 'Address7', 'Address8', 'Address9', 'Address10'];
    const places = ['Beach', 'Mountain', 'City', 'Countryside', 'Island', 'Forest', 'Countryside', 'Island', 'Forest', 'Beach'];
    const designations = ['Developer', 'Manager', 'Designer', 'Tester', 'Analyst', 'Architect', 'Engineer', 'Consultant', 'Administrator', 'Coordinator'];

    for (let i = 1; i <= 15; i++) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const name = names[randomIndex];
      const age = ages[randomIndex];
      const address = addresses[randomIndex];
      const place = places[randomIndex];
      const designation = designations[randomIndex];

      const rowData = {
        'S.No': i,
        'Name': name,
        'Age': age,
        'Address': address,
        'Place': place,
        'Designation': designation,
      };
      initialData.push(rowData);
    }
    return initialData;
  };

  const [data, setData] = useState(() => generateInitialData(initialColumns));
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [entryPerPage, setEntryPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showAgeInput, setShowAgeInput] = useState(false);
  const navigate = useNavigate();

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entryPerPage;
    const endIndex = startIndex + entryPerPage;

    const filteredData = data.filter((row) => {
      return Object.values(row).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    const slicedData = filteredData.slice(startIndex, endIndex);

    return slicedData;
  }, [data, currentPage, entryPerPage, searchTerm]);

  const totalPages = Math.ceil(data.length / entryPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntryChange = (e) => {
    const selectedEntry = Number(e.target.value);
    setEntryPerPage(selectedEntry);
    setCurrentPage(1);
  };

  const handleButtonClick = () => {
    navigate('/newform');
  };
  const handleAgeIconClick = () => {
    setShowAgeInput(true);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };
 
  const addNewEntry = (newEntry) => {
    setData((prevData) => [...prevData, newEntry]);
  };

  // Calculate the range for displaying current entries
  const currentRangeStart = (currentPage - 1) * entryPerPage + 1;
  const currentRangeEnd = Math.min(currentPage * entryPerPage, data.length);

  return (
    <div>
      <div className='pdf-search'>
        <div className='search-icon'>
          <i class="fa " aria-hidden="true"></i>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="pdf-button-container">
        <button onClick={handleButtonClick}><i class="fa fa-plus" aria-hidden="true"></i>New</button>
      </div>
      {showForm &&  <Pdfform addNewEntry={addNewEntry} />}
      <div className="pdf-container">
        <label className="pdf-label">Show Entry:</label>
        <select id="pdf-select" value={entryPerPage} onChange={handleEntryChange}>
          <option value={2}>2</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
      </div>
      {paginatedData && paginatedData.length > 0 && (
        <table className="pdf-table">
          <tbody>
            <tr>
              {Object.keys(paginatedData[0]).map((columnHeader, index) => (
                <th key={index}>
                  {columnHeader === 'Age' ? (
                    <div>Age
                      <i
                        className="fa fa-male"
                        aria-hidden="true"
                        onClick={handleAgeIconClick}
                        style={{ cursor: 'pointer' }}
                      ></i>
                      {showAgeInput && (
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Enter age"
                        />
                      )}
                    </div>
                  ) : (
                    columnHeader
                  )}
                </th>
              ))}
            </tr>
            {paginatedData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='pdf-pagination'>
        Page {currentPage}-{entryPerPage} of {totalPages}
      </div>

      <div className='pdf-pagination is-flex is-justify-content-flex-end'>
        {totalPages > 0 && Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pdftable;
