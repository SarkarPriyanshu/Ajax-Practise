(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let aboutme = () =>{

let main = document.querySelector('main');
let aboutMeContainer = document.createElement('section');
aboutMeContainer.classList = 'aboutMeContainer container-fluid';

let loadAboutMe = new XMLHttpRequest()
loadAboutMe.open('GET', '../JSON/aboutme.json',true)

loadAboutMe.onreadystatechange = () => {
    if(loadAboutMe.readyState == 4 && loadAboutMe.status == 200){
        let aboutMeData = JSON.parse(loadAboutMe.responseText)
        createAboutMe(aboutMeData)
    }
  }
  loadAboutMe.send()


  function createAboutMe(data){
        if(data instanceof Object){
            for(let item in data){
                switch(item){
                    case 'Headline':
                         let headline = document.createElement('h2');
                         headline.classList ='AboutMeHeadline';
                         headline.innerHTML = data[item];
                         aboutMeContainer.append(headline)   
                         break;
                    case 'Tagline':
                         let Tagline = document.createElement('h3');
                         Tagline.classList ='AboutTagline';
                         Tagline.innerHTML = data[item]
                         aboutMeContainer.append(Tagline);   
                        break;
                    case 'Content':
                        let AboutMeContent = document.createElement('p');
                        AboutMeContent.classList ='AboutMeContent';
                        AboutMeContent.innerHTML = data[item]
                        aboutMeContainer.append(AboutMeContent);
                        break;
                        default:
                            console.log('Hello World')         
                }
            }
        }
        main.append(aboutMeContainer);
    }


}


module.exports = aboutme;
},{}],2:[function(require,module,exports){
let home = () =>{
    
            let main = document.querySelector('main');
            let homeListContainer = document.createElement('section');
            homeListContainer.classList = 'homeListContainer container-fluid';
            
            
            let loadHomePage = new XMLHttpRequest()
            loadHomePage.open('GET', '../JSON/homepage.json' , true)
            
            loadHomePage.onreadystatechange = () => {
                if(loadHomePage.readyState == 4 && loadHomePage.status == 200){
                    let HomepageList = JSON.parse(loadHomePage.responseText)
                    createHomepageList(HomepageList);
                }
            }
            loadHomePage.send();
            
            
            function createHomepageList(data){
                let listContainer = document.createElement('div')
                let listHome = document.createElement('ul')
                if(data instanceof Object){
                    for(let item in data){
                        if(data[item] instanceof Object){
                            for(let element in data[item]){
                                var value = data[item][element];
                                let li = document.createElement('li');
                                li.classList = 'HomeListItem';
                            let  a = document.createElement('a');
                            a.setAttribute('value',`${data[item][element]}`)
                            a.addEventListener('click', function(){
                                let thi = this;
                                render(thi)
                            })
                            li.classList = 'HomeListLinks';
                            listHome.append(li);
                            li.append(a);
                            a.innerHTML = value;
                            listContainer.append(listHome);
                        }
                    }
                }
                homeListContainer.append(listContainer);
            }
            main.append(homeListContainer);
        }
    }
    
    
    
    module.exports = home;
    const render = require('./render'); 
    
    
},{"./render":4}],3:[function(require,module,exports){
const home = require('./home') 
 
window.onload = () => {
    home();
}



},{"./home":2}],4:[function(require,module,exports){
const home = require('./home');
const aboutme = require('./aboutme'); 
const skills = require('./skills');


let main = document.querySelector('main');
let render = (val) => {
    let  option;
    
    if(val === 'Home'){
        option = 'Home'
    }else{
        option = val.getAttribute('value');
    }
    
    switch(option){
        case 'Home':
          console.log(option)
          removeElement();
          home();
          break;
      case 'About Me':
          removeElement();
          aboutme();
          addBack();
          break;
      case  'Skills':
          removeElement()
          skills(); 
          addBack();
          break;   
       default :
            console.error('Something went wrong!')  
  }
}


function removeElement(){
    console.log(`removing Element in main div`)
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
        let val = 'Home';
        render(val);
    })
}

module.exports = render;
},{"./aboutme":1,"./home":2,"./skills":5}],5:[function(require,module,exports){
let skill = () =>{

    let main = document.querySelector('main');
    let skillsContainer = document.createElement('section');
    skillsContainer.className = 'skillsContainer container-fluid';
    let skills = document.createElement('section');
    skills.className = 'skills';
    let skillsHeadline = document.createElement('h2');
    skillsHeadline.classList = 'skillsHeadline';

    let loadSkills = new XMLHttpRequest();
    loadSkills.open('GET','../JSON/skills.json',true);

    loadSkills.onreadystatechange = () => {
        if(loadSkills.readyState == 4 && loadSkills.status == 200){
           let skillsData = JSON.parse(loadSkills.responseText);
           createSkills(skillsData);

        }
    }
    loadSkills.send()

    function createSkills(data){
        if(data instanceof Object){
            for(let item in data){
                skillsHeadline.innerHTML = item;
                for(let items in data[item]){
                    switch(items){
                        case 'Designing':
                            var h2 = document.createElement('h3');
                            h2.classList = 'designHeadline';
                            h2.innerHTML = items;
                            let design = document.createElement('section');
                            design.className = 'designSection';
                            let designlist  = contentSelector(data[item][items]);
                            design.append(h2);
                            design.append(designlist);
                            skills.append(design);
                            break;
                        case 'Scripting Languages':
                            var h2 = document.createElement('h3');
                            h2.classList = 'developHeadline';
                            h2.innerHTML = items;
                            let develop = document.createElement('section');
                            develop.classList = 'developSection';
                            developlist = contentSelector(data[item][items]);
                            develop.append(h2);
                            develop.append(developlist);
                            skills.append(develop);
                            break;
                        case 'Tools,Management Softwares':
                            var h2 = document.createElement('h3');
                            h2.classList = 'manageHeadline';
                            h2.innerHTML = items;
                            let manage = document.createElement('section');
                            manage.classList = 'manageSection';
                            let managelist = contentSelector(data[item][items]);
                            manage.append(h2);
                            manage.append(managelist);
                            skills.append(manage);
                            break;
                        case 'Os\'s':
                            var h2 = document.createElement('h3');
                            h2.classList = 'osHeadline';
                            h2.innerHTML = items;
                            let os = document.createElement('section');
                            os.classList = 'osSection';
                            let oslist = contentSelector(data[item][items]);
                            os.append(h2);
                            os.append(oslist);
                            skills.append(os)
                            break;        
                    }
                }
            }
        }
        skillsContainer.append(skillsHeadline);
        skillsContainer.append(skills);
        main.append(skillsContainer);
    }

}


function contentSelector(arr){
    let ul = document.createElement('ul')
    ul.className  = 'skillList'
    for(let item of arr){
        let li = document.createElement('li')
        li.innerHTML = item;
        ul.append(li) 
    }
    return ul;

}

module.exports = skill;
},{}]},{},[3]);
