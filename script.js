'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

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

//Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect()
  console.log(s1Coords)

  console.log(e.target.getBoundingClientRect())
  console.log('Current scroll (X/Y):', window.pageXOffset, window.pageYOffset)

  console.log(
    'Height/Width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  )

  //Scrolling
  // window.scroll(
  //   s1Coords.left + window.pageYOffset,
  //   s1Coords.top + window.pageYOffset
  // )

  // window.scrollTo({
  //   left: s1Coords.left + window.pageYOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' })
})

window.scroll()

//Page Navigation - smooth scrolling
//Without event delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log(id)
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//   })
// })

//Using event delegation to solve the above
//1. Add event listener to common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault()

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')

  //Guard clause
  if (!clicked) return

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  //Activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})

/*
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

//EVENT LISTENERS
const h1 = document.querySelector('h1')

// h1.addEventListener('mouseenter', function () {
//   alert('addEventListener: Great! You are reading a header')
// })

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading a header')
}

h1.addEventListener('mouseenter', alertH1)

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

h1.addEventListener('copy', function (e) {
  e.preventDefault()
  console.log('You cant copy')
})

//Old school way of listening to events
// h1.onclick = function () {
//   alert('addEventListener: Great! You are reading a header')
// }

//Event propagation
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
console.log(randomColor(0, 255))

document.querySelector('.nav__link').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor()
    console.log('LINK', e.target, e.currentTarget)
    console.log(e.currentTarget === this)

    //Stop propagation
    // e.stopPropagation()
  },
  false
)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('CONTAINER', e.target, e.currentTarget)
})

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor()
  console.log('NAV', e.target, e.currentTarget)
})

//DOM TRAVERSING
//Going download: child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'darkblue'

//Going upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElement)

h1.closest('.header').style.background = 'yellow'
h1.closest('h1').style.background = 'purple'

//Going sideways: siblings
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

console.log(h1.previousSibling)
console.log(h1.nextSibling)

console.log(h1.parentElement.children)
*/
