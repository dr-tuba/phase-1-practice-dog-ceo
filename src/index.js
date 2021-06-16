const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

document.addEventListener("DOMContentLoaded", initialize)

function initialize() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => data.message.forEach(renderDogPics))

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => Object.keys(data.message).forEach(renderDogBreeds))
}

function renderDogPics(url) {
    const dogPicsList = document.getElementById(`dog-image-container`)
    let img = document.createElement('img')
    dogPicsList.append(img)
    img.src = url
    img.style.width = '250px'
    img.style.height = '250px'
    img.style['object-fit'] = 'scale-down'
    img.style.padding = '1em'
}

function renderDogBreeds(breed) {
    const dogBreedsList = document.getElementById(`dog-breeds`)
    let li = document.createElement('li')
    let p = document.createElement('p')
    dogBreedsList.append(li)
    li.append(p)
    p.innerText = breed
    p.addEventListener('click', toggleColor)
}

function toggleColor(e) {
    if (e.target.style.color === 'purple') {
        e.target.style.color = 'black'
    } else {
        e.target.style.color = 'purple'
    }
}

const dropdown = document.querySelector('#breed-dropdown')
dropdown.addEventListener('change', filterBreeds)

function filterBreeds(e) {
    const allBreeds = document.querySelectorAll('li')
    const breedList = [...allBreeds]
      
    let filteredOutBreeds = breedList.filter(dog => dog.firstChild.innerText.charAt(0) !== e.target.value)
    for (breed of filteredOutBreeds) {
        breed.style.display = 'none'
    }

    let filteredInBreeds = breedList.filter(dog => dog.firstChild.innerText.charAt(0) === e.target.value)
    for (breed of filteredInBreeds) {
        breed.style.display = 'list-item'
    }

    if (e.target.value === 'Please select a letter') {
        for (breed of breedList) {
            breed.style.display = 'list-item'
        }
    }
}