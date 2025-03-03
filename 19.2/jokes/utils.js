function loadCards(array, targetContent, action = "add", selectedItems = []) {
    if (!Array.isArray(array)) return; // validate that arrayOfCars is array
    const content = document.getElementById(targetContent) // Tomer remind me!
    if (!content) return;
    content.innerHTML = ""
    for (let index = 0; index < array.length; index++) {
        const currentObject = array[index]
        let cardHtml = null
        if(selectedItems.indexOf(currentObject.id) === -1){
            cardHtml =  getCardTemplate(currentObject, action, false)
        }else{
            cardHtml =  getCardTemplate(currentObject, action, true)
            // cardHtml
        }
        
        content.innerHTML += cardHtml
    }
}

function getCardTemplate(j, action , isSelected = false) {
    const { id, punchline, type, setup } = j
    let button = `<h3> <button class="btn btn-primary" onClick="addToFavorites(${id})"> Add </button> </h3>`
    if (action === 'remove') {
        button = `<h3> <button class="btn btn-danger" onClick="removeFromFavorites(${id})"> Remove </button> </h3>`
    }
    const selectedClass = isSelected ? "selectedClass" : ""
    const buttonSelect = `<h3> <button class="btn btn-warning" onClick="selectItem(${id})"> Select </button> </h3>`
    return `<div id="${id}" class="card card-width ${selectedClass}" >
                <h3>${id}</h3>
                <h2><span class="badge badge-light" style="background:blue">${type}</span></h2>
                <h2>${setup}</h2>
                <h2>${punchline}</h2>
                ${button}
                ${buttonSelect}
                </div>`
}

function getJokeObjById(id, jokesArray) {
    // missing validations 
    for (let index = 0; index < jokesArray.length; index++) {
        const current = jokesArray[index];
        if (current.id === id) {
            return current;
        }
    }
}

function getJokeIndexById(id, jokesArray) {
    // missing validations 
    for (let index = 0; index < jokesArray.length; index++) {
        const current = jokesArray[index];
        if (current.id === id) {
            return index;
        }
    }

}

function loadTotalItems(total, targetContent)   {
   const result =  document.querySelector(`#${targetContent}`)
   result.innerText = total
}

function aggregateJokesTypes(arr){
    // validations
    let stats = {};
    arr.forEach(function(currentJoke)   {
        if(stats[currentJoke.type]){ // if true we have something in the object under the relevant key
            stats[currentJoke.type] = stats[currentJoke.type] + 1
        }else{
            stats[currentJoke.type] = 1;
        }
    })
    return stats;
}
let chart = null
function loadStatistics(obj, targetContent){
    const content = document.querySelector(`#${targetContent}`)
    if(!content) return;
    let labels = []
    let data = []   
    for(const property in obj){
        labels.push(property)
        data.push(obj[property])
        // const span = document.createElement("h4")
        // span.innerText = `${property}: ${obj[property]}`
        // content.appendChild(span)
    }

    const ctx = document.getElementById('myChart');
    if(chart){
        chart.destroy()
    }
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:labels,
        datasets: [{
          label: 'Number of jokes',
          data: data,
          borderWidth: 5,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}