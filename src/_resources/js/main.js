require('intersection-observer');
import smoothscroll from 'smoothscroll-polyfill';
require('./components/foreach-shim');

// kick off the polyfill!
smoothscroll.polyfill();

/*
** Intersection Observer on header
*/

var headerElement, navigationElement;

document.addEventListener('DOMContentLoaded', function() {
  headerElement = document.querySelector('.home-hero');
  if(headerElement) {
    headerElement.style.height = headerElement.offsetHeight + 'px';
  }
    navigationElement = document.querySelector('main .primary-navigation');

    if (headerElement && 'IntersectionObserver' in window) {
      createObserver();
    }
    else {
      navigationElement.classList.add('with-background');
    }
  }, false);

  function createObserver() {
    var observer = new IntersectionObserver(
      handleIntersect,
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.15,1],
      }
    );

    observer.observe(headerElement);
  }

  function handleIntersect(entries) {

    entries.forEach(function (entry) {
      console.log(entry.intersectionRatio);
      if(entry.intersectionRatio < 0.5) {
        navigationElement.classList.add('with-background');
      }
      else {
        navigationElement.classList.remove('with-background');
      }
    });
  }



// get all slides
// get all tabs
// assume mapping between two; i.e. slide[i] is target of tab[i]
// on click of tab, get scrollLeft of slide, and scroll to it.

// use


var slideElements, navigationElements, slideWrapper;

document.addEventListener('DOMContentLoaded', function() {
  var slideElements = document.querySelectorAll('.section--explore--item');
  var slideWrapper = document.querySelector('.section--explore--inner');
  var navigationElements = document.querySelectorAll('.section--explore-navigation .links button');
  var controlElements = document.querySelectorAll('.controls button');
  if ('IntersectionObserver' in window) {
    createSlideObserver();
  }
  exploreClickHandler();
  exploreControlsHandler();


  function exploreClickHandler() {
    navigationElements.forEach(function (navigationElement, index) {
      navigationElement.addEventListener('click', () => {
        console.log(index);

        toggleControls(index);
        slideElements[index].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      });
    });
  }

  function exploreControlsHandler() {
    controlElements.forEach(function (controlElement) {
      controlElement.addEventListener('click', () => {
        var current = parseInt(slideWrapper.querySelector('.active').dataset.slide);
        var direction = controlElement.dataset.direction;
        var target = (direction == 'forwards') ? (current) : (current - 2);
        toggleControls(target);

        slideElements[target].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

      });
    });
  }

  function toggleControls(index) {
    if (index < 1) {
      controlElements[1].setAttribute('disabled',true);
      controlElements[0].removeAttribute('disabled');
    }
    else if ((index + 1) == slideElements.length) {
      controlElements[0].setAttribute('disabled',true);
      controlElements[1].removeAttribute('disabled');
    }
    else {
      controlElements[0].removeAttribute('disabled');
      controlElements[1].removeAttribute('disabled');
    }

  }


  function createSlideObserver() {
    var slideObserver = new IntersectionObserver(
      handleSlideIntersect,
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.5],
      }
    );

    slideElements.forEach(slideElement => {
      slideObserver.observe(slideElement);
    });
  }

  function handleSlideIntersect(entries) {

    entries.forEach(function (entry) {
      if(entry.intersectionRatio > 0.5) {
        entry.target.classList.add('active');
        navigationElements[entry.target.dataset.slide - 1].classList.add('active');
      }
      else {
        entry.target.classList.remove('active');
        navigationElements[entry.target.dataset.slide - 1].classList.remove('active');
      }
    });
  }

  (function() {
    // Get all the <h3> headings
    const headings = document.querySelectorAll('.activity-item--header')

    Array.prototype.forEach.call(headings, heading => {


      heading.onclick = () => {



        // Cast the state as a boolean
        let expanded = heading.getAttribute('aria-expanded') === 'true' || false

        // Close all others if this one isn't open
        if( !expanded ) {
          heading.parentNode.parentNode.querySelectorAll('.activity-item--content').forEach(node => {
            node.hidden = true;
          })
          heading.parentNode.parentNode.querySelectorAll('button').forEach(btn => {
            btn.setAttribute('aria-expanded', false)
          })

        }

        // Switch the state
        heading.setAttribute('aria-expanded', !expanded)
        // Switch the content's visibility
        heading.nextElementSibling.hidden = expanded
      }
    })
  })()

});

