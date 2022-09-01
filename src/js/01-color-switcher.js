const dataStart = document.querySelector('[data-start]')
const dataStop = document.querySelector('[data-stop]')
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  let timerId
  
dataStart.addEventListener('click',(event)=>{
    timerId = setInterval(()=>{
        document.body.style.backgroundColor= `${getRandomHexColor()}`
    },1000)
    event.target.disabled = true
})
dataStop.addEventListener('click',()=>{
    clearInterval(timerId)
    dataStart.disabled = false
})
