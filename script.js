fetch('data/arvicolidi.json')
  .then(response => response.json())
  .then(data => {
    const searchBar = document.getElementById('searchBar');
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
          <strong>Period:</strong> ${entry.Period}
        `;

        card.appendChild(link);
        card.appendChild(info);
        results.appendChild(card);
      });
    }

    searchBar.addEventListener('input', () => {
      const term = searchBar.value.toLowerCase();
      const filtered = data.filter(entry =>
        entry.Species.toLowerCase().includes(term) ||
        entry.Site.toLowerCase().includes(term) ||
        entry.Period.toLowerCase().includes(term) ||
        entry.Country.toLowerCase().includes(term)
      );
      renderResults(filtered);
    });

    // Initial load
    renderResults(data);
  });
