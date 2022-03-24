'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = function () {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector9('.section--1')

btn.btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect()
  console.log(s1Coords)
})

/////////////////////////////////////////////////////
////LECTURES
/////////////////////////////////////////////////////
//SELECTING ELEMENTS
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
console.log(allSections)

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button')
console.log(allButtons)

console.log(document.getElementsByClassName('btn'))

//CREATING AND INSERTING ELEMENT
// .insertAdjascentHTML
const message = document.createElement('div')
message.classList.add('cookie-message')
// message.textContent = 'We use cookies for improved functionaliity and analytics'
message.innerHTML =
  "We use cookies for improved functionaliity and analytics <button class='btn btn--close-cookie'>Got it!</button>"

header.prepend(message)
// header.append(message.cloneNode(true))
// header.append(message)

// header.before(message)
// header.after(message)

//DELETE ELEMENT
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove()
  })

//STYLES
message.style.backgroundColor = 'ash'
message.style.wideth = '120%'

console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).height)

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + '10' + 'px'

document.documentElement.style.setProperty('--color-primary', 'skyblue')
const logo = document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.className)

console.log(logo.src)
console.log(logo.getAttribute('src'))

logo.alt = 'Beautiful minimalist logo'

//Non standard
console.log(logo.alt)
console.log(logo.getAttribute('designer'))

//Set attribute
logo.setAttribute('company', 'Bankist')

const link = document.querySelector('.nav__link--btn')
console.log(link.href)
console.log(link.getAttribute('href'))

//Data attributes
console.log(logo.dataset.versionNumber)
