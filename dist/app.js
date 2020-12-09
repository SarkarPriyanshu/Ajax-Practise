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
const render = require('./render') 

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

   
},{"./render":4}],3:[function(require,module,exports){
const home = require('./home') 

 
window.onload = () => {
    home();
}



},{"./home":2}],4:[function(require,module,exports){
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
},{"./aboutme":1,"./skills":5}],5:[function(require,module,exports){
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
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Fib3V0bWUuanMiLCJzY3JpcHRzL2hvbWUuanMiLCJzY3JpcHRzL2luZGV4LmpzIiwic2NyaXB0cy9yZW5kZXIuanMiLCJzY3JpcHRzL3NraWxscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBhYm91dG1lID0gKCkgPT57XG5cbmxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xubGV0IGFib3V0TWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG5hYm91dE1lQ29udGFpbmVyLmNsYXNzTGlzdCA9ICdhYm91dE1lQ29udGFpbmVyIGNvbnRhaW5lci1mbHVpZCc7XG5cbmxldCBsb2FkQWJvdXRNZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5sb2FkQWJvdXRNZS5vcGVuKCdHRVQnLCAnLi4vSlNPTi9hYm91dG1lLmpzb24nLHRydWUpXG5cbmxvYWRBYm91dE1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBpZihsb2FkQWJvdXRNZS5yZWFkeVN0YXRlID09IDQgJiYgbG9hZEFib3V0TWUuc3RhdHVzID09IDIwMCl7XG4gICAgICAgIGxldCBhYm91dE1lRGF0YSA9IEpTT04ucGFyc2UobG9hZEFib3V0TWUucmVzcG9uc2VUZXh0KVxuICAgICAgICBjcmVhdGVBYm91dE1lKGFib3V0TWVEYXRhKVxuICAgIH1cbiAgfVxuICBsb2FkQWJvdXRNZS5zZW5kKClcblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFib3V0TWUoZGF0YSl7XG4gICAgICAgIGlmKGRhdGEgaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIGluIGRhdGEpe1xuICAgICAgICAgICAgICAgIHN3aXRjaChpdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSGVhZGxpbmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGxpbmUuY2xhc3NMaXN0ID0nQWJvdXRNZUhlYWRsaW5lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkbGluZS5pbm5lckhUTUwgPSBkYXRhW2l0ZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGFib3V0TWVDb250YWluZXIuYXBwZW5kKGhlYWRsaW5lKSAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUYWdsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgVGFnbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgVGFnbGluZS5jbGFzc0xpc3QgPSdBYm91dFRhZ2xpbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFRhZ2xpbmUuaW5uZXJIVE1MID0gZGF0YVtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgIGFib3V0TWVDb250YWluZXIuYXBwZW5kKFRhZ2xpbmUpOyAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEFib3V0TWVDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQWJvdXRNZUNvbnRlbnQuY2xhc3NMaXN0ID0nQWJvdXRNZUNvbnRlbnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgQWJvdXRNZUNvbnRlbnQuaW5uZXJIVE1MID0gZGF0YVtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAgICAgYWJvdXRNZUNvbnRhaW5lci5hcHBlbmQoQWJvdXRNZUNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1haW4uYXBwZW5kKGFib3V0TWVDb250YWluZXIpO1xuICAgIH1cblxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBhYm91dG1lOyIsImNvbnN0IHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJykgXG5cbmxldCBob21lID0gKCkgPT57XG5cbiAgICAgICAgICAgIGxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICAgICAgICAgICAgbGV0IGhvbWVMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgaG9tZUxpc3RDb250YWluZXIuY2xhc3NMaXN0ID0gJ2hvbWVMaXN0Q29udGFpbmVyIGNvbnRhaW5lci1mbHVpZCc7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGxvYWRIb21lUGFnZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICBsb2FkSG9tZVBhZ2Uub3BlbignR0VUJywgJy4uL0pTT04vaG9tZXBhZ2UuanNvbicgLCB0cnVlKVxuXG4gICAgICAgICAgICBsb2FkSG9tZVBhZ2Uub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGxvYWRIb21lUGFnZS5yZWFkeVN0YXRlID09IDQgJiYgbG9hZEhvbWVQYWdlLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgSG9tZXBhZ2VMaXN0ID0gSlNPTi5wYXJzZShsb2FkSG9tZVBhZ2UucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVIb21lcGFnZUxpc3QoSG9tZXBhZ2VMaXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2FkSG9tZVBhZ2Uuc2VuZCgpO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSG9tZXBhZ2VMaXN0KGRhdGEpe1xuICAgICAgICAgICAgbGV0IGxpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgbGV0IGxpc3RIb21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICAgICAgaWYoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpdGVtIGluIGRhdGEpe1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhW2l0ZW1dIGluc3RhbmNlb2YgT2JqZWN0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBpbiBkYXRhW2l0ZW1dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhW2l0ZW1dW2VsZW1lbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0ID0gJ0hvbWVMaXN0SXRlbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCd2YWx1ZScsYCR7ZGF0YVtpdGVtXVtlbGVtZW50XX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhpID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyKHRoaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdCA9ICdIb21lTGlzdExpbmtzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0SG9tZS5hcHBlbmQobGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpLmFwcGVuZChhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RDb250YWluZXIuYXBwZW5kKGxpc3RIb21lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBob21lTGlzdENvbnRhaW5lci5hcHBlbmQobGlzdENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYWluLmFwcGVuZChob21lTGlzdENvbnRhaW5lcik7XG4gICAgICAgIH1cbiB9XG5cbiBcblxuIG1vZHVsZS5leHBvcnRzID0gaG9tZTtcblxuICAgIiwiY29uc3QgaG9tZSA9IHJlcXVpcmUoJy4vaG9tZScpIFxuXG4gXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIGhvbWUoKTtcbn1cblxuXG4iLCJjb25zdCBob21lID0gcmVxdWlyZSgnLi9hYm91dG1lJylcbmNvbnN0IGFib3V0bWUgPSByZXF1aXJlKCcuL2Fib3V0bWUnKSBcbmNvbnN0IHNraWxscyA9IHJlcXVpcmUoJy4vc2tpbGxzJylcblxuXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmxldCByZW5kZXIgPSAodmFsKSA9PiB7XG4gIGxldCAgb3B0aW9uO1xuICBjb25zb2xlLmxvZyh2YWwpO1xuXG4gIGlmKHZhbCA9PT0gJ0hvbWUnKXtcbiAgICAgIG9wdGlvbiA9ICdIb21lJ1xuICB9ZWxzZXtcbiAgICAgIG9wdGlvbiA9IHZhbC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gIH1cbiAgY29uc29sZS5sb2cob3B0aW9uKVxuICBzd2l0Y2gob3B0aW9uKXtcbiAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoKTtcbiAgICAgICAgICBob21lKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBYm91dCBNZSc6XG4gICAgICAgICAgcmVtb3ZlRWxlbWVudCgpO1xuICAgICAgICAgIGFib3V0bWUoKTtcbiAgICAgICAgICBhZGRCYWNrKClcbiAgICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgICdTa2lsbHMnOlxuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoKVxuICAgICAgICAgIHNraWxscygpOyBcbiAgICAgICAgICBhZGRCYWNrKClcbiAgICAgICAgICBicmVhazsgICBcbiAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIScpICBcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoKXtcbiAgICB3aGlsZShtYWluLmZpcnN0Q2hpbGQpe1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4ubGFzdENoaWxkKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhZGRCYWNrKCl7XG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBiYWNrQnV0dG9uLmNsYXNzTGlzdCA9ICdiYWNrJ1xuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKCd2YWx1ZScsJ0hvbWUnKVxuICAgIGJhY2tCdXR0b24uaW5uZXJIVE1MID0gJ0JhY2snXG4gICAgbWFpbi5hcHBlbmQoYmFja0J1dHRvbik7XG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXM7XG4gICAgICAgIHJlbmRlcih2YWwpO1xuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVuZGVyOyIsImxldCBza2lsbCA9ICgpID0+e1xuXG4gICAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgbGV0IHNraWxsc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBza2lsbHNDb250YWluZXIuY2xhc3NOYW1lID0gJ3NraWxsc0NvbnRhaW5lciBjb250YWluZXItZmx1aWQnO1xuICAgIGxldCBza2lsbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgc2tpbGxzLmNsYXNzTmFtZSA9ICdza2lsbHMnO1xuICAgIGxldCBza2lsbHNIZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgc2tpbGxzSGVhZGxpbmUuY2xhc3NMaXN0ID0gJ3NraWxsc0hlYWRsaW5lJztcblxuICAgIGxldCBsb2FkU2tpbGxzID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgbG9hZFNraWxscy5vcGVuKCdHRVQnLCcuLi9KU09OL3NraWxscy5qc29uJyx0cnVlKTtcblxuICAgIGxvYWRTa2lsbHMub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZihsb2FkU2tpbGxzLnJlYWR5U3RhdGUgPT0gNCAmJiBsb2FkU2tpbGxzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICBsZXQgc2tpbGxzRGF0YSA9IEpTT04ucGFyc2UobG9hZFNraWxscy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICBjcmVhdGVTa2lsbHMoc2tpbGxzRGF0YSk7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkU2tpbGxzLnNlbmQoKVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2tpbGxzKGRhdGEpe1xuICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgT2JqZWN0KXtcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICBza2lsbHNIZWFkbGluZS5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaXRlbXMgaW4gZGF0YVtpdGVtXSl7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChpdGVtcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdEZXNpZ25pbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuY2xhc3NMaXN0ID0gJ2Rlc2lnbkhlYWRsaW5lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5pbm5lckhUTUwgPSBpdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzaWduID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5jbGFzc05hbWUgPSAnZGVzaWduU2VjdGlvbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2lnbmxpc3QgID0gY29udGVudFNlbGVjdG9yKGRhdGFbaXRlbV1baXRlbXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYXBwZW5kKGgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpZ24uYXBwZW5kKGRlc2lnbmxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxscy5hcHBlbmQoZGVzaWduKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1NjcmlwdGluZyBMYW5ndWFnZXMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuY2xhc3NMaXN0ID0gJ2RldmVsb3BIZWFkbGluZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuaW5uZXJIVE1MID0gaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRldmVsb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2ZWxvcC5jbGFzc0xpc3QgPSAnZGV2ZWxvcFNlY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmVsb3BsaXN0ID0gY29udGVudFNlbGVjdG9yKGRhdGFbaXRlbV1baXRlbXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZlbG9wLmFwcGVuZChoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2ZWxvcC5hcHBlbmQoZGV2ZWxvcGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxscy5hcHBlbmQoZGV2ZWxvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdUb29scyxNYW5hZ2VtZW50IFNvZnR3YXJlcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5jbGFzc0xpc3QgPSAnbWFuYWdlSGVhZGxpbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgyLmlubmVySFRNTCA9IGl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYW5hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlLmNsYXNzTGlzdCA9ICdtYW5hZ2VTZWN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFuYWdlbGlzdCA9IGNvbnRlbnRTZWxlY3RvcihkYXRhW2l0ZW1dW2l0ZW1zXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlLmFwcGVuZChoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlLmFwcGVuZChtYW5hZ2VsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lsbHMuYXBwZW5kKG1hbmFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdPc1xcJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuY2xhc3NMaXN0ID0gJ29zSGVhZGxpbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgyLmlubmVySFRNTCA9IGl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcy5jbGFzc0xpc3QgPSAnb3NTZWN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3NsaXN0ID0gY29udGVudFNlbGVjdG9yKGRhdGFbaXRlbV1baXRlbXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcy5hcHBlbmQoaDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9zLmFwcGVuZChvc2xpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxscy5hcHBlbmQob3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBza2lsbHNDb250YWluZXIuYXBwZW5kKHNraWxsc0hlYWRsaW5lKTtcbiAgICAgICAgc2tpbGxzQ29udGFpbmVyLmFwcGVuZChza2lsbHMpO1xuICAgICAgICBtYWluLmFwcGVuZChza2lsbHNDb250YWluZXIpO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIGNvbnRlbnRTZWxlY3RvcihhcnIpe1xuICAgIGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICB1bC5jbGFzc05hbWUgID0gJ3NraWxsTGlzdCdcbiAgICBmb3IobGV0IGl0ZW0gb2YgYXJyKXtcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBsaS5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgICB1bC5hcHBlbmQobGkpIFxuICAgIH1cbiAgICByZXR1cm4gdWw7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBza2lsbDsiXX0=
