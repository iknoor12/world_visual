const body = document.querySelector("body");

const style = document.createElement("style");
style.textContent=`
    * {
        margin: 0;
    }

   body {
        text-align: center;
   }

    header {
        background-color: rgba(220, 220, 220, 0.53);
        padding: 1em;
        line-height: 2.5em;
    }

    header h1 {
        color: rgb(243, 168, 76);
        font-family: sans-serif;
        letter-spacing: 0.2rem;
        font-size: 2.5em;
    }

    header p {
        font-size: 1.3em;
    }

    input {
        padding: 0.8rem 0 0.8rem 0.8rem;
        margin-top: 2em;
        font-size: 1.2em;
        width: 50%;
        border-radius: 1em;
    }

    .div-btn {
        margin-top: 2em; 
        display: flex;
        justify-content: center;
    }


    .btn {
        background: rgb(250, 185, 105);
        margin-left: 3em;
        padding: 0.8rem 3rem;
        font-size: 1em;
        border-radius: 2em;
        letter-spacing: 0.1rem;
        border: none;
    }

    .cont-grid {
        display: grid;
        grid-template-columns: repeat(5, 18em);
        gap: 1.5em;
        padding: 4em;
    }
    
    .country-card {
        background-color: rgba(224, 222, 222, 0.52);
        padding: 1.3rem;
        text-align: left;
        line-height: 1.6rem;
        letter-spacing: 0.07rem;
        font-size: 1.2em;
        overflow-wrap: break-word;
        
    }

    .country-flag {
        object-fit: cover;
        width: 100%;
        height: 8em;
        margin-bottom: 1em;
        border-radius: 0.5rem;
    }

    #mainChart {
        // background-color: red;
    }

`;
document.head.appendChild(style);




//   H E A D E R  //
let head = document.createElement("header");
body.appendChild(head);


let h1 = document.createElement("h1");
h1.textContent= "World Countries Data";
head.appendChild(h1);


let p1 = document.createElement("p");
p1.textContent= "Currently we have 250 countries.";
head.appendChild(p1);



//  INPUT  //
let input = document.createElement("input");
input.setAttribute("placeholder", "Search countries by name, capital..");
body.appendChild(input);




//  BUTTONS   //
let div1 = document.createElement("div");
div1.classList = "div-btn";
body.appendChild(div1);


let button1 = document.createElement("button");
button1.classList = "btn";
button1.textContent = "Name";
div1.appendChild(button1);

let button2 = document.createElement("button");
button2.classList = "btn";
button2.textContent = "Capital";
div1.appendChild(button2);

let button3 = document.createElement("button");
button3.classList = "btn";
button3.textContent = "Population";
div1.appendChild(button3);



// DISPLAY  DIV  //

let container = document.createElement("div");
container.classList.add("cont-grid");
body.appendChild(container);




function displayDivs(countries) {
    container.innerHTML = "";
    countries.forEach(country => {
        const div = document.createElement("div");
        div.classList.add("country-card");         
        div.innerHTML =`
            <img src="${country.flag}" class="country-flag">
            <h3>${country.name.toUpperCase()}</h3>
            <p><strong>Capital: </strong>${country.capital}</p>
            <p><strong>Languages: </strong>${country.languages}</p>
            <p><strong>Population: </strong>${country.population}</p>
            <p><strong>Region: </strong>${country.region}</p>
        `;
    
        container.appendChild(div);
    });
    
}
displayDivs(countries)



//  M A K I N G   I N P U T   W O R K A B L E    //
input.addEventListener("input", () => {
        const searchValue = input.value.toLowerCase();

        const filteredData = countries.filter(country => {
            const countryName = (country.name || "").toLowerCase();
            const countryCapital = (country.capital || "").toLowerCase();
            return countryName.includes(searchValue) || countryCapital.includes(searchValue);
        });

        console.log("Search Value: ", searchValue);
        console.log("Filtered Result: ", filteredData);
        displayDivs(filteredData);
    }
);




// M A K I N G    B U T T O N S    W O R K A B L E      //

let nameAsc = true;
let capitalAsc = true;
let populationAsc = true;

button1.addEventListener("click", () => {
    const sortByName = [...countries].sort((a, b) => {
        return nameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    });
    nameAsc = !nameAsc;

    button1.textContent = `NAME ${nameAsc ? "↑" : "↓"}`;
    button2.textContent = "Capital"; 
    button3.textContent = "Population";

    displayDivs(sortByName);
});


button2.addEventListener("click", () => {
    const sortByCapital = [...countries].sort((a, b) => {
        const capitalA = (a.capital || "Unknown").toLowerCase();
        const capitalB =  (b.capital || "Unknown").toLowerCase();
        return capitalAsc
            ? capitalA.localeCompare(capitalB)
            : capitalB.localeCompare(capitalA)
    });
    capitalAsc = !capitalAsc;

    button2.textContent = `Capital ${capitalAsc ?  "↑" : "↓"}`;
    button1.textContent = "Name";
    button3.textContent = "Population";

    displayDivs(sortByCapital);
});


button3.addEventListener("click", () => {
    const sortByPopulation = [...countries].sort((a, b) => {
        return populationAsc
            ? a.population - b.population
            : b.population - a.population;
    });
    populationAsc = !populationAsc;

    button3.textContent = `Population ${populationAsc ? "↑" : "↓"}`;
    button1.textContent = "Name";
    button2.textContent = "Capital";

    displayDivs(sortByPopulation);
});






//  C H A R T  WORKABLE  //

// const chartContainer = document.createElement("div");
// chartContainer.classList.add("chartContainer");
// chartContainer.innerHTML = `
//     <canvas id="populationChart"></canvas>
//     <canvas id="languageChart"></canvas>
// `;
// body.appendChild(chartContainer);


//   P O P U L A T I O N   CHART    //
function drawPopulationChart() {
    const topCountries = [...countries]
        .sort((a,b) => b.population - a.population)
        .slice(0, 10);

    const labels = topCountries.map(c => c.name);
    const data = topCountries.map(c => c.population);

    return {
        type:'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Population',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: ''
                }
            },
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };
}


//   L A N G U A G E   CHART    //
function drawLanguageChart() {
    let languageCount = {};

    countries.forEach(country => {
        country.languages.forEach(lang => {
            languageCount[lang] = (languageCount[lang] || 0) + 1;
        });
    });

    const sorted = Object.entries(languageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labels = sorted.map(l => l[0]);
    const data = sorted.map(l => l[1]);

    return {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Countries',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: ''
                }
            },
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };
}



window.onload = () => {
let toggleDiv = document.createElement("div");
toggleDiv.innerHTML = `
    <div id="toggleButtons" style="text-align: center; margin-top: 2em;">
        <button id="populationBtn" style="padding: 0.5em 1em; margin: 0.5em; background-color: rgba(255, 99, 132, 1); border-radius: 5px;">POPULATION</button>
        <button id="languageBtn" style="padding: 0.5em 1em; margin: 0.5em; background-color: rgba(54, 162, 235, 1); border-radius: 5px;">LANGUAGES</button>
    </div>
        <h3 id="chartTitle" style="text-align: center;">Most Populated countries in the World</h3>
        <canvas id="mainChart" width="500" height="200"></canvas>
`;
body.appendChild(toggleDiv);

updateChart(drawPopulationChart(), "10 Most populated countries in the world");

document.getElementById('populationBtn').addEventListener("click", () => {
    updateChart(drawPopulationChart(), "10 Most populated countries in the world");
    document.getElementById("populationBtn").style.backgroundColor = "rgba(255, 99, 132, 1)";
    document.getElementById("languageBtn").style.backgroundColor = "";
});

document.getElementById('languageBtn').addEventListener("click", () => {
    updateChart(drawLanguageChart(), "10 Most spoken languages in the world");
    document.getElementById("languageBtn").style.backgroundColor = "rgba(54, 162, 235, 1)";
    document.getElementById("populationBtn").style.backgroundColor = "";
});

};
let currentChart;

function updateChart(config, titleText) {
    if(currentChart) {
        currentChart.destroy();
    }
    const ctx = document.getElementById("mainChart").getContext('2d');
    currentChart = new Chart(ctx, config);
    document.getElementById('chartTitle').textContent = titleText;
};
