    // Simulated data for demonstration
    // const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);
    const items = JSON.parse(localStorage.getItem('pokeList'));

    const perPageSelect = document.getElementById('perPageSelect');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const itemList = document.getElementById('itemList');
    const retrievedObject = JSON.parse(localStorage.getItem('pokeList'));
    let currentPage = 0;
    let itemsPerPage = parseInt(perPageSelect.value, 10);

    function updateList() {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const displayedItems = items.slice(startIndex, endIndex);
    
      const itemGrid = document.getElementById('itemGrid');
      itemGrid.innerHTML = ''; // Clear previous content
    
      for (let i = 0; i < displayedItems.length; i += 10) {
        // Create a new row for every 10 items
        const row = itemGrid.insertRow();
        for (let j = i; j < i + 10 && j < displayedItems.length; j++) {
          // Create a cell in the row for each item
          const cell = row.insertCell();
          const span = document.createElement('span');
          span.textContent = (startIndex + j + 1) + '. ' + (displayedItems[j].name);
          cell.appendChild(span);
          const img = document.createElement('img');
          const pokemonIndex = startIndex + j + 1; // Adjust index to start from 1 instead of 0
          img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
          img.alt = `Pokemon ${pokemonIndex}`;

          // Add a click event listener to each image
          img.addEventListener('click', async function() {
            //Fetch
            var getPokeInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`) .then(response => response.json())
            var getPokeType = fetch(`https://pokeapi.co/api/v2/type/${pokemonIndex}/`) .then(response => response.json())

            const infoPromise = getPokeInfo.then((pokemonData) => {
              // Perform some operations with pokemonData
              return pokemonData;
            });
            const typePromise = getPokeType.then((pokemonType) => {
              // Perform some operations with pokemonData
              return pokemonType;
            });

            infoPromise.then((value) => {
              console.log('Resolved Value:', value);
              const pokeId = document.getElementById('pokeId');
              pokeId.textContent = (value.id) + '. ' + (value.name);
              const pokeInfo = document.getElementById('pokeInfo');
              typePromise.then((value) => {
                pokeInfo.textContent = 'TYPE:' + value.name;
                // pokeType = value.name
                console.log('Resolved Type:', value);
  
              })
              

             

              
            
            
            // const span = document.createElement('span');
            // span.textContent = promise1.id;
            // modalImg.appendChild(span);

            });
            //Promise
            // const promise1 = Promise.resolve(getPokeInfo);
            // promise1.then((value) => {
            //   console.log('value',value)

              
            // });
            // localStorage.setItem('pokeList', JSON.stringify(value.results));


            // Open modal dialog with the clicked Pokémon image
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modalImg');
            modalImg.src = this.src;
            modal.style.display = 'block';

            // Close the modal when the "x" button is clicked
            const closeBtn = document.getElementsByClassName('close')[0];
            closeBtn.onclick = function() {
              modal.style.display = 'none';
            };
          });
          cell.appendChild(img);
        }
      }
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

    //POKE FUNCTIONS
    function getValue() {
        // Get the selected value
        var selectedValue = document.getElementById("perPageSelect").value;         
        console.log("Selected value: " + selectedValue);
    } 




    

    perPageSelect.addEventListener('change', handlePerPageChange);
    prevBtn.addEventListener('click', handlePrevClick);
    nextBtn.addEventListener('click', handleNextClick);

    //MOUNT
    // Set the value to "20" when the page is loaded
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById("perPageSelect").value = "10";
      if(items == undefined){
        //Fetch
        var getPokeList = fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000') .then(response => response.json())
  
  
        //Promise
        const promise1 = Promise.resolve(getPokeList);
        promise1.then((value) => {
            localStorage.setItem('pokeList', JSON.stringify(value.results));
        });
        
        items = JSON.parse(localStorage.getItem('pokeList'));
      }
    });

    updateList();
    updateButtons();