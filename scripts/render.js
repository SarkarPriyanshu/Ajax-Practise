const home = require('./aboutme')
const aboutme = require('./aboutme') 
const skills = require('./skills')


let main = document.querySelector('main');
let render = (val) => {
  let  option;
  console.log(val);

  if(val === 'Home'){
      option = 'Home'
  }else{
      option = val.getAttribute('value');
  }
  console.log(option)
  switch(option){
      case 'Home':
          removeElement();
          home();
          break;
      case 'About Me':
          removeElement();
          aboutme();
          addBack()
          break;
      case  'Skills':
          removeElement()
          skills(); 
          addBack()
          break;   
       default :
            console.error('Something went wrong!')  
  }
}


function removeElement(){
    while(main.firstChild){
        main.removeChild(main.lastChild);
    };
}

function addBack(){
    let backButton = document.createElement('button');
    backButton.classList = 'back'
    backButton.setAttribute('value','Home')
    backButton.innerHTML = 'Back'
    main.append(backButton);
    backButton.addEventListener('click',function(){
        let val = this;
        render(val);
    })
}

module.exports = render;