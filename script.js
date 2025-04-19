fetch('data/arvicolidi2.json')
  .then(response => response.json())
  .then(data => {
    const searchBar = document.getElementById('searchBar');
    const searchField = document.getElementById('searchField');
    const results = document.getElementById('results');

    function renderResults(filteredData) {
      results.innerHTML = '';
      filteredData.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'card';

        const link = document.createElement('a');
        link.href = entry.Image;
        link.target = '_blank';

        const img = document.createElement('img');
        img.src = entry.Image;
        img.alt = entry.Species;

        link.appendChild(img);

        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = `
          <strong>Species:</strong> ${entry.Species}<br>
          <strong>Site:</strong> ${entry.Site}<br>
          <strong>Country:</strong> ${entry.Country}<br>
          <strong>Period:</strong> ${entry.Period}<br>
          <strong>Publication:</strong> ${entry.Pubblication ? `<a href="${entry.Pubblication}" target="_blank">Link</a>` : 'N/A'}
        `;

        card.appendChild(link);
        card.appendChild(info);
        results.appendChild(card);
      });
    }

    function filterData() {
      const term = searchBar.value.toLowerCase();
      const field = searchField.value;
      const filtered = data.filter(entry =>
        entry[field].toLowerCase().includes(term)
      );
      renderResults(filtered);
    }

    searchBar.addEventListener('input', filterData);
    searchField.addEventListener('change', filterData);

    // Initial load
    renderResults(data);
  });

