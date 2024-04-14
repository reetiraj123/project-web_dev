document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsList = document.getElementById('resultsList');
  
    // Function to fetch data from CSV file
    async function fetchData() {
      const response = await fetch('food_data.csv');
      const data = await response.text();
      return data;
    }
  
    // Function to filter data based on search query
    function filterData(data, query) {
      const rows = data.split('\n').slice(1); // Remove header row
      const filteredRows = rows.filter(row => {
        const rowData = row.split(',');
        return rowData[0].toLowerCase().includes(query.toLowerCase());
      });
      return filteredRows;
    }
  
    // Function to display search results
    function displayResults(results) {
      resultsList.innerHTML = ''; // Clear previous results
      if (results.length === 0) {
        const noResultsItem = document.createElement('li');
        noResultsItem.textContent = 'No matching items found.';
        resultsList.appendChild(noResultsItem);
      } else {
        results.forEach(row => {
          const rowData = row.split(',');
          const listItem = document.createElement('li');
          listItem.textContent = `${rowData[0]} - ${rowData[1]}`;
          resultsList.appendChild(listItem);
        });
      }
    }
  
    // Event listener for search button click
    searchBtn.addEventListener('click', async function() {
      const query = searchInput.value.trim();
      if (query !== '') {
        const data = await fetchData();
        const filteredData = filterData(data, query);
        displayResults(filteredData);
      } else {
        resultsList.innerHTML = 'Please enter a search query.';
      }
    });
  });
  
