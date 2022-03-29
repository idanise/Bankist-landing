'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')

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

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

//Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

//Sticky navigation
// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

//Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
  const [entry] = entries
  // console.log(entry)

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

//Reveal Sections
const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0
  const maxSlide = slides.length

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    })
  }

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'))

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active')
  }

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    )
  }

  //Go to Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    createDots()
    goToSlide(0)
    activateDot(0)
  }
  init()

  //Event handlers
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide()
    e.key === 'ArrowRight' && nextSlide()
  })

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset
      goToSlide(slide)
      activateDot(slide)
    }
  })
}
slider()

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

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e)
})

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e)
})

window.addEventListener('beforeunload', function (e) {
  e.preventDefault()
  console.log(e)
  e.returnValue = ''
})
