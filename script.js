import sonnetList from "./sonnets.js"

const poemContainer = document.getElementById("poem-container")

const open = document.getElementById("menu-btn")
const nav = document.getElementById("navigation")
const exit = document.getElementById("exit-btn")
open.addEventListener("click", toggleMenu)
exit.addEventListener("click", toggleMenu)

document.getElementById("get-all").addEventListener("click", getAllSonnets)
document.getElementById("number").addEventListener("click", getSonnetByNumber)
document.getElementById("word-search").addEventListener("click", getSonnetsByWord)
document.getElementById("divisible").addEventListener("click", getDivisibleSonnets)
document.getElementById("fibo").addEventListener("click", getFibo)
document.getElementById("range").addEventListener("click", getRange)
document.getElementById("sequence").addEventListener("click", getSonnetSequence)
document.getElementById("randomize").addEventListener("click", getRandomSonnet)
document.getElementById("clear").addEventListener("click", defaultText)

function toggleMenu(e) {
  if (e.target.id === open.id) {
    nav.classList.add("open-nav");
    document.body.classList.add("body-overflow")
  } 
  if (e.target.id === exit.id) {
    nav.classList.remove("open-nav");
    document.body.classList.remove("body-overflow")
  }
}

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

function getRange(e) {
  clear()
  let startRange = document.getElementById("start-range-input").value
  const endRange = document.getElementById("end-range-input").value
  console.log(startRange,endRange)

  if (!e.target.value || !startRange || !endRange) {
    return errorMessage()
  }
  while (startRange <= endRange) {
    renderSonnet(startRange)
    startRange++
  }
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
        <li><p><strong>Range between two</strong> takes two values, and returns all sonnets in range between the two, inclusive of both.</p>
        <li><p><strong>Proportional sequence</strong> takes a base number, and a list of comma-separated numbers, such as <strong>5, 12, 5</strong>. It will display the sonnet with the base number, and then add your sequence of numbers all the way to 154, repeating them from the start if possible. So, with base 0 and sequence input 5, 12, 5, it will display sonnets <strong>5, 17, 22, 27, 39, 44, 49, 61</strong> until it gets to 154.
        <li><p><strong>Fibonacci</strong> will display all sonnets that follow the popular number sequence.</p></li>
        <li><p><strong>Random sonnet</strong> will display a random sonnet.</p></li>
        <li><p><strong>Clear</strong> will bring you back to this menu.</p></li>
    </ul>
  `
}

function renderSonnet(i) {
  nav.classList.remove("open-nav");
  document.body.classList.remove("body-overflow")
  if (i <= 154 && i > 0) {
    poemContainer.innerHTML += `<h2>Sonnet Number ${sonnetList.sonnets[i - 1].number}</h2>`
    sonnetList.sonnets[i-1].lines.map(line => {
      if (sonnetList.sonnets[i-1].lines.indexOf(line) > 11) {
        poemContainer.innerHTML += `<p>&emsp;&emsp;&emsp;&emsp;${line}</p>`
      } else {
        poemContainer.innerHTML += `<p>${line}</p>`
      }
    })
  } else {
    errorMessage()
  }
}

defaultText()


