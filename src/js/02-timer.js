import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
let UserData = null
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0]<options.defaultDate) {
        alert('Please choose a date in the future')
        document.querySelector('[data-start]').disabled = true
        return 
      }
      
      document.querySelector('[data-start]').disabled = false
      return UserData = selectedDates[0]
      
    },
  };

flatpickr(document.querySelector('#datetime-picker'), options);

document.querySelector('[data-start]').addEventListener('click',(e)=>{
  let delta
 const interval =setInterval(() => {
  delta = UserData.getTime() - Date.now()
  const { days, hours, minutes, seconds } = convertMs(delta)
  document.querySelector('[data-days]').textContent =String(days).padStart(2,'0')
  document.querySelector('[data-hours]').textContent=String(hours).padStart(2,'0')
  document.querySelector('[data-minutes]').textContent=String(minutes).padStart(2,'0')
  document.querySelector('[data-seconds]').textContent=String(seconds).padStart(2,'0')
  function removeInterval(){
    if (delta<0) {
      clearInterval(interval)
      document.querySelector('[data-days]').textContent='00'
      document.querySelector('[data-hours]').textContent='00'
      document.querySelector('[data-minutes]').textContent='00'
      document.querySelector('[data-seconds]').textContent='00'
    }
  }
  removeInterval()
 }, 1000);
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}