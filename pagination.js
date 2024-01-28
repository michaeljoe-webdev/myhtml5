    // Simulated data for demonstration
    const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

    const perPageSelect = document.getElementById('perPageSelect');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const itemList = document.getElementById('itemList');
    let currentPage = 0;
    let itemsPerPage = parseInt(perPageSelect.value, 10);

    function updateList() {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const displayedItems = items.slice(startIndex, endIndex);
      itemList.innerHTML = '';
      displayedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
      });
    }

    function updateButtons() {
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = (currentPage + 1) * itemsPerPage >= items.length;
    }

    function handlePerPageChange() {
      itemsPerPage = parseInt(perPageSelect.value, 10);
      currentPage = 0;
      updateList();
      updateButtons();
    }

    function handlePrevClick() {
      if (currentPage > 0) {
        currentPage--;
        updateList();
        updateButtons();
      }
    }

    function handleNextClick() {
      const lastPage = Math.ceil(items.length / itemsPerPage) - 1;
      if (currentPage < lastPage) {
        currentPage++;
        updateList();
        updateButtons();
      }
    }

    perPageSelect.addEventListener('change', handlePerPageChange);
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);

    updateList();
    updateButtons();