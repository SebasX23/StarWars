const API_URL = `https://swapi.dev/api`

const END_POINTS = {
    people: {
      apiURL:`${API_URL}/people`,
      endpoint: 'people',
      data: [
        "Name",
        "Birth Year",
        "Height",
        "Mass"
      ],
      values: [
        "name",
        "birth_year",
        "height",
        "mass"
      ] 
    },
    planets: {
      apiURL:`${API_URL}/planets`,
      endpoint: 'planets',
      data: [

      ],
      values: [
        
      ] 
    },
    films: {
      apiURL:`${API_URL}/films`,
      endpoint: 'films',
      data: [

      ],
      values: [
        
      ] 
    },
    species: {
      apiURL:`${API_URL}/species`,
      endpoint: 'species',
      data: [

      ],
      values: [
        
      ] 
    },
    vehicles: {
      apiURL:`${API_URL}/vehicles`,
      endpoint: 'vehicles',
      data: [

      ],
      values: [
        
      ] 
    },
    starships: {
      apiURL:`${API_URL}/starships`,
      endpoint: 'starships',
      data: [

      ],
      values: [
        
      ] 
    }
}

const tableHead = document.querySelector('thead')
const tableBody = document.querySelector('tbody')

const btnNext = document.querySelector('#next')
const btnPrevious = document.querySelector('#previous')

btnNext.addEventListener('click', () => {
    const apiURL = btnNext.dataset['url']
    const endpoint = btnNext.dataset['endpoint']

    if (apiURL !== 'null') {
        END_POINTS[endpoint].apiURL = apiURL
        drawTableData(endpoint)
    }
})

btnPrevious.addEventListener('click', () => {
    const apiURL = btnPrevious.dataset['url']
    const endpoint = btnPrevious.dataset['endpoint']

    if (apiURL !== 'null') {
        END_POINTS[endpoint].apiURL = apiURL
        drawTableData(endpoint)
    }else{
        drawEndPoints()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    drawEndPoints()
})

const drawEndPoints = () => {
    
    btnNext.style.display = 'none'
    btnPrevious.style.display = 'none'

    const head = document.createElement('tr')

    head.innerHTML = `
        <th>Resource</th>
        <th>Endpoint</th>
    `
    tableHead.appendChild(head)

    tableHead.innerHTML = ``
    tableBody.innerHTML = ``

    fetch(`${API_URL}/`)
        .then(response => response.json())
        .then(data => {
            const results = Object.entries(data)
            console.log(results)
            results.forEach(result => {
                const row = document.createElement('tr')

                row.innerHTML = `
                <td>${result[0]}</td>
                <td>
                    <a href="#" class="${result[0]}">${result[1]}</a>
                </td>
                `

            tableBody.appendChild(row)
            })
        })
}

tableBody.addEventListener('click', (e) => {
    const endpoint = e.target.classList[0]
    drawTable(endpoint)
    drawTableData(endpoint)
    //console.log(END_POINTS[endpoint])
})

const drawTable = (endpoint) => {

    btnNext.style.display = 'block'
    btnPrevious.style.display = 'block'
    
    tableHead.innerHTML = ''
    tableBody.innerHTML = ''

    const {data} = END_POINTS[endpoint]

    const head = document.createElement('tr')

    data.forEach(infoData => {
        const th = document.createElement('th')
        th.innerHTML = `${infoData}`
        head.appendChild(th)
    })
    tableHead.appendChild(head)
}

const drawTableData = (endpoint) => {
    const {apiURL, values} = END_POINTS[endpoint]
    tableBody.innerHTML = ``
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const {next, previous, results} = data

            btnPrevious.setAttribute('data-url', previous)   
            btnPrevious.setAttribute('data-endpoint', endpoint)

            btnNext.setAttribute('data-url', next)   
            btnNext.setAttribute('data-endpoint', endpoint)

            results.forEach(result => {
                const row = document.createElement('tr')
                values.forEach(value => {
                    const td = document.createElement('td')
                    td.innerHTML = `${result[value]}`
                    row.appendChild(td)
                })
                tableBody.appendChild(row)
            })
        })
}










/*fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        
    })*/