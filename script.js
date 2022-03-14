import sonnetList from "./sonnets.js"

const poemContainer = document.getElementById("poem-container")

document.getElementById("get-all").addEventListener("click", getAllSonnets)
document.getElementById("number").addEventListener("click", getSonnetByNumber)
document.getElementById("word-search").addEventListener("click", getSonnetsByWord)
document.getElementById("divisible").addEventListener("click", getDivisibleSonnets)
document.getElementById("fibo").addEventListener("click", getFibo)
document.getElementById("sequence").addEventListener("click", getSonnetSequence)
document.getElementById("randomize").addEventListener("click", getRandomSonnet)
document.getElementById("clear").addEventListener("click", defaultText)

function getSonnetByNumber(e) {
  e.preventDefault()
  const number = document.getElementById("number-input").value
  if (number != null) {
    clear()
    renderSonnet(number)
  } else {
    return errorMessage()
  }
}

function errorMessage() {
  poemContainer.innerHTML = "<p>Wrong word or number, please try again.</p>"
}

function getSonnetsByWord(e) {
  e.preventDefault()
  const word = document.getElementById("word-input").value
  if (!e.target.value || !word) {
    return errorMessage()
  }

  if (word !== null) {
    clear()
    sonnetList.sonnets.map(sonnet => {
      for (let i = 0; i < sonnet.lines.length; i++) {
        let lowerLine = sonnet.lines[i].toLowerCase()
        if (lowerLine.includes(word.toLowerCase())) {
          return renderSonnet(sonnet.number)
        }
      }
    })
  } 
}

function getDivisibleSonnets(e) {
  e.preventDefault()
  const userNumber = document.getElementById("divisible-input").value

  if (!e.target.value || !userNumber) {
    return errorMessage()
  }  
  
  if (userNumber != null) {
    clear()
    sonnetList.sonnets.map(sonnet => {
      if (sonnet.number % userNumber === 0) {
        renderSonnet(sonnet.number) 
      }
    })
  }
}

function getRandomSonnet() {
  const random = Math.floor(Math.random() * 155)
  clear()
  renderSonnet(random)
}

function getFibo() {
  clear()
  let fiboList = [1,2,3,5,8,13,21,34,55,89,144]
    fiboList.map(number => renderSonnet(number))
}

function getSonnetSequence(e) {
  e.preventDefault()
  clear()

  let baseNumber = parseInt(document.getElementById("base-sequence-input").value) || 0
  const userSequence = document.getElementById("sequence-input").value
  let sequenceArr = userSequence.split(",").map(Number)

  if (!e.target.value || !userSequence) {
    return errorMessage()
  }  
  
  baseNumber &&
    renderSonnet(baseNumber)

  while (baseNumber < 154) {
    sequenceArr.forEach(number => {
      baseNumber += number
      if (baseNumber <= 154) renderSonnet(baseNumber)
    })
  }
}

function getAllSonnets() {
  clear()
  sonnetList.sonnets.map(sonnet => renderSonnet(sonnet.number))
}

function clear() {
  poemContainer.innerHTML = ""
}

function defaultText() {
  poemContainer.innerHTML = `
    <h2>Welcome!</h2>
    <p>Please use the website navigation to display sonnets.</p>
    <ul>
        <li><p><strong>Sonnet number</strong> will display your chosen sonnet number.</p></li>
        <li><p><strong>Search by word</strong> will display all sonnets that contain a word of your choosing.</p></li>
        <li><p><strong>Divisible by</strong> will display all sonnets divisible by the inputted number.</p></li>
        <li><p><strong>Fibonacci</strong> will display all sonnets that follow the popular number sequence.</p></li>
        <li><p><strong>Proportional sequence</strong> takes a base number, and a list of comma-separated numbers, such as <strong>5, 12, 5</strong>. It will display the sonnet with the base number, and then add your sequence of numbers all the way to 154, repeating them from the start if necessary. So, with base 0 and sequence input 5, 12, 5, it will display sonnets <strong>5, 17, 22, 27, 39, 44, 49, 61 until it reaches 154</strong>.
        <li><p><strong>Random sonnet</strong> will display a random sonnet.</p></li>
        <li><p><strong>Clear</strong> will bring you back to this menu.</p></li>
    </ul>
  `
}

function renderSonnet(i) {
  if (i <= 154 && i > 0) {
    poemContainer.innerHTML += `<h2>Sonnet Number ${sonnetList.sonnets[i - 1].number}</h2>`
    sonnetList.sonnets[i-1].lines.map(line => poemContainer.innerHTML += `<p>${line}</p>`)
  } else {
    errorMessage()
  }
}

defaultText()