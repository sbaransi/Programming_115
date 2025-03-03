const DOM_IDS = {
    Horsepower: "Horsepower",
    Acceleration: "Acceleration",
    Name: "Name",
}
const DOM = {
    searchButton: document.getElementById("searchCars"),
    searchInput: document.getElementById("searchValue"),
    selectOptionKey: document.getElementById("keySelect"),
    newCarForm: {
        name: document.getElementById(DOM_IDS.Name),
        horsePowerInput: document.getElementById(DOM_IDS.Horsepower),
        acceleration: document.getElementById(DOM_IDS.Acceleration),
        newCarButton: document.getElementById("newCarButton")
    }
}
const allCars = carsForRental.concat(carsForSale)


function init() {
    loadDefaultsFromLS()

    DOM.newCarForm.newCarButton.addEventListener("click", function () {

        const newCar = {
            [DOM_IDS.Horsepower]: +DOM.newCarForm.horsePowerInput.value,
            [DOM_IDS.Acceleration]: +DOM.newCarForm.acceleration.value,
            [DOM_IDS.Name]: DOM.newCarForm.name.value
        }
        allCars.push(newCar)
        loadTable(allCars)
    })

    DOM.selectOptionKey.addEventListener("change", function () {
        validateButtonDisabled(this.value, DOM.searchInput.value, DOM.searchButton)
        localStorage.setItem("selectOptionKey", this.value)

    })
    DOM.searchInput.addEventListener("change", function () {
        validateButtonDisabled(DOM.selectOptionKey.value, this.value, DOM.searchButton)
        localStorage.setItem("inputValue", this.value)
    })
    DOM.searchButton?.addEventListener("click", function () {
        const value = document.getElementById("searchValue").value
        const key = document.getElementById("keySelect").value
        const result = searchCars(allCars, key, value)
        loadTable(result)

    })
    document.getElementById("loadCarsRentButton")?.addEventListener("click", function () {
        loadTable(carsForRental)
    })
    document.getElementById("loadCarsSaleButton")?.addEventListener("click", function () {
        loadTable(carsForSale)
    })

    document.getElementById("loadAllCarsButton")?.addEventListener("click", function () {
        // loadTable([...carsForRental, ...carsForSale])

        loadTable(allCars)
    })

}
function loadDefaultsFromLS() {
    const localStorageInputValue = localStorage.getItem("inputValue")
    if (localStorageInputValue) {
        DOM.searchInput.value = localStorageInputValue;
    }
    const localStorageSelectedKey = localStorage.getItem("selectOptionKey")
    if (localStorageSelectedKey) {
        DOM.selectOptionKey.value = localStorageSelectedKey;
    }
}
function searchCars(cars, key, value) {
    if (!key || !value) return;
    if (!Array.isArray(cars)) return
    let result = [];
    const valueNum = +value
    for (let index = 0; index < cars.length; index++) {
        const currentCar = cars[index]
        if (currentCar[key] >= valueNum) {
            result.push(cars[index])
        }
    }
    return result;
}

function validateButtonDisabled(selectValue, inputValue, buttonToDisable) {
    if (selectValue === "0" || inputValue === "") {
        buttonToDisable.disabled = true
    } else {
        buttonToDisable.disabled = false
    }
}

init();



function clearTable() {
    document.getElementById("table-cars-headers").innerHTML = ""
    document.getElementById("table-cars-body").innerHTML = ""

}

function loadTable(arrayOfCars) {
    if (!Array.isArray(arrayOfCars)) return; // validate that arrayOfCars is array
    if (arrayOfCars.length === 0) return; // validate that there is data inside the array
    clearTable()
    const firstElement = arrayOfCars[0]
    const fields = Object.keys(firstElement).sort()
    console.log(firstElement)
    console.log(fields)
    const theadTr = document.getElementById("table-cars-headers")
    if (theadTr) {
        for (let index = 0; index < fields.length; index++) {
            const th = document.createElement("th")
            th.innerText = fields[index].replaceAll("_", " ")
            theadTr.append(th)
        }
        theadTr.append(getTD("Actions", "", "th"))
    }
    const tBody = document.getElementById("table-cars-body")
    if (tBody) {
        for (let index = 0; index < arrayOfCars.length; index++) {
            const currentCar = arrayOfCars[index];
            const tr = document.createElement("tr")
            tr.id = `${currentCar.Name.replaceAll(" ", "-")}-${index}`
            for (let index = 0; index < fields.length; index++) {
                const currentField = fields[index];
                tr.append(getTD(currentCar[currentField], "-"))
            }

            const tdButton = getTdButton()
            tr.append(tdButton)
            tBody.append(tr)
            // tr.append(getTD(currentCar.Name),
            //     getTD(currentCar.Miles_per_Gallon, 0),
            //     getTD(currentCar.Cylinders),
            //     getTD(currentCar.Displacement),
            //     getTD(currentCar.Acceleration),
            //     getTD(currentCar.Weight_in_lbs),
            //     getTD(currentCar.Horsepower, 999),
            //     getTD(currentCar.Year, "2000-04-04"),
            //     getTD(currentCar.Origin, "ISRAEL")
            // )

        }
    }


}


function getTdButton() {
    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger")

    const icon = `<i class="bi bi-trash3"></i>`
    button.innerHTML = icon

    button.onclick = function () {
        console.log(this.parentElement.parentElement.remove())
    }
    const tdButton = document.createElement("td")
    tdButton.append(button)
    return tdButton
}
function getTD(value, defaultValue = "", type = "td") {
    const currentTD = document.createElement(type)
    currentTD.innerHTML = value || defaultValue
    return currentTD
}




