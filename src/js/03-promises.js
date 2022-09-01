import  Notiflix from 'notiflix';

const inputValues = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]')
}
function createPromise(position, delay) {
  const promise = new Promise((res,rej)=>{
  setTimeout(()=>{

    const shouldResolve = Math.random() > 0.3;

       if (shouldResolve) {
         res({position, delay})
     }
      else {
       rej({position, delay})
     }

  },delay) })
  
  return promise
}

document.querySelector('[type="submit"]').addEventListener('click',(e)=>{
e.preventDefault()

for (let i = 0; i < inputValues.amount.value; i++) {
  createPromise(1 + i, inputValues.delay.value + 1 * inputValues.step.value)
  .then(({position, delay})=>{
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({position, delay})=>{
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
  })
}
})