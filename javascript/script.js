const APIURL = 'https://testimonialapi.toolcarton.com/api'
const testimonialContainer = document.querySelector('.testimonial-container');
const userImage = document.querySelector('.user-image');
const designationEl = document.querySelector('.role');
const testimonial = document.querySelector('.testimonial');
const username = document.querySelector('.username');

var maxIdx = 0;
lengthTestimonial()
start();

function start() {
  var idx = 1
  logData(1)
  setInterval(() => {
    if(maxIdx <= idx) {
      idx = 1
      logData(1)
    } else if (maxIdx > idx){
      idx++
      logData(idx)
    }
  }, 10000);
}

async function lengthTestimonial() {
  try {
    const { data } = await axios(APIURL)
    maxIdx = maxIdx + data.length 
    return data

  } catch(err) {
    if(err.response.status == 404){
      createErrorCard('There is no profile with this username')
    }
  }
}

async function logData(idx) {
    const response = await fetch(APIURL + "/" + idx);
    const { name, designation, avatar, message} = await response.json();

    const testimonialHTML = `
    <div class="progress-bar"></div>
    <div class="fas fa-quote-right fa-quote"></div>
    <div class="fas fa-quote-left fa-quote"></div>
    <p class="testimonial">${message}</p>
    <div class="user">
      <img src="${avatar}" class="user-image" alt="user">
      <div class="user-details">
        <h4 class="username">${name}</h4>
        <p class="role">${designation}</p>
      </div>
    </div> 
    `
    testimonialContainer.innerHTML = testimonialHTML
  }







