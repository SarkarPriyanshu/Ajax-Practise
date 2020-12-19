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
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2Fib3V0bWUuanMiLCJzY3JpcHRzL2hvbWUuanMiLCJzY3JpcHRzL2luZGV4LmpzIiwic2NyaXB0cy9yZW5kZXIuanMiLCJzY3JpcHRzL3NraWxscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQgYWJvdXRtZSA9ICgpID0+e1xuXG5sZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmxldCBhYm91dE1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuYWJvdXRNZUNvbnRhaW5lci5jbGFzc0xpc3QgPSAnYWJvdXRNZUNvbnRhaW5lciBjb250YWluZXItZmx1aWQnO1xuXG5sZXQgbG9hZEFib3V0TWUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxubG9hZEFib3V0TWUub3BlbignR0VUJywgJy4uL0pTT04vYWJvdXRtZS5qc29uJyx0cnVlKVxuXG5sb2FkQWJvdXRNZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgaWYobG9hZEFib3V0TWUucmVhZHlTdGF0ZSA9PSA0ICYmIGxvYWRBYm91dE1lLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICBsZXQgYWJvdXRNZURhdGEgPSBKU09OLnBhcnNlKGxvYWRBYm91dE1lLnJlc3BvbnNlVGV4dClcbiAgICAgICAgY3JlYXRlQWJvdXRNZShhYm91dE1lRGF0YSlcbiAgICB9XG4gIH1cbiAgbG9hZEFib3V0TWUuc2VuZCgpXG5cblxuICBmdW5jdGlvbiBjcmVhdGVBYm91dE1lKGRhdGEpe1xuICAgICAgICBpZihkYXRhIGluc3RhbmNlb2YgT2JqZWN0KXtcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICBzd2l0Y2goaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0hlYWRsaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRsaW5lLmNsYXNzTGlzdCA9J0Fib3V0TWVIZWFkbGluZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGxpbmUuaW5uZXJIVE1MID0gZGF0YVtpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhYm91dE1lQ29udGFpbmVyLmFwcGVuZChoZWFkbGluZSkgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVGFnbGluZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFRhZ2xpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFRhZ2xpbmUuY2xhc3NMaXN0ID0nQWJvdXRUYWdsaW5lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICBUYWdsaW5lLmlubmVySFRNTCA9IGRhdGFbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgICBhYm91dE1lQ29udGFpbmVyLmFwcGVuZChUYWdsaW5lKTsgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBBYm91dE1lQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFib3V0TWVDb250ZW50LmNsYXNzTGlzdCA9J0Fib3V0TWVDb250ZW50JztcbiAgICAgICAgICAgICAgICAgICAgICAgIEFib3V0TWVDb250ZW50LmlubmVySFRNTCA9IGRhdGFbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3V0TWVDb250YWluZXIuYXBwZW5kKEFib3V0TWVDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSGVsbG8gV29ybGQnKSAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYWluLmFwcGVuZChhYm91dE1lQ29udGFpbmVyKTtcbiAgICB9XG5cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gYWJvdXRtZTsiLCJsZXQgaG9tZSA9ICgpID0+e1xuICAgIFxuICAgICAgICAgICAgbGV0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgICAgICAgICBsZXQgaG9tZUxpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBob21lTGlzdENvbnRhaW5lci5jbGFzc0xpc3QgPSAnaG9tZUxpc3RDb250YWluZXIgY29udGFpbmVyLWZsdWlkJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbG9hZEhvbWVQYWdlID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgIGxvYWRIb21lUGFnZS5vcGVuKCdHRVQnLCAnLi4vSlNPTi9ob21lcGFnZS5qc29uJyAsIHRydWUpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxvYWRIb21lUGFnZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYobG9hZEhvbWVQYWdlLnJlYWR5U3RhdGUgPT0gNCAmJiBsb2FkSG9tZVBhZ2Uuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBIb21lcGFnZUxpc3QgPSBKU09OLnBhcnNlKGxvYWRIb21lUGFnZS5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUhvbWVwYWdlTGlzdChIb21lcGFnZUxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvYWRIb21lUGFnZS5zZW5kKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlSG9tZXBhZ2VMaXN0KGRhdGEpe1xuICAgICAgICAgICAgICAgIGxldCBsaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBsZXQgbGlzdEhvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgICAgICAgICAgICAgaWYoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCl7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaXRlbSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbaXRlbV0gaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBpbiBkYXRhW2l0ZW1dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YVtpdGVtXVtlbGVtZW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0ID0gJ0hvbWVMaXN0SXRlbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCd2YWx1ZScsYCR7ZGF0YVtpdGVtXVtlbGVtZW50XX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhpID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyKHRoaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdCA9ICdIb21lTGlzdExpbmtzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0SG9tZS5hcHBlbmQobGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpLmFwcGVuZChhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RDb250YWluZXIuYXBwZW5kKGxpc3RIb21lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBob21lTGlzdENvbnRhaW5lci5hcHBlbmQobGlzdENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYWluLmFwcGVuZChob21lTGlzdENvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBob21lO1xuICAgIGNvbnN0IHJlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7IFxuICAgIFxuICAgICIsImNvbnN0IGhvbWUgPSByZXF1aXJlKCcuL2hvbWUnKSBcbiBcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgaG9tZSgpO1xufVxuXG5cbiIsImNvbnN0IGhvbWUgPSByZXF1aXJlKCcuL2hvbWUnKTtcbmNvbnN0IGFib3V0bWUgPSByZXF1aXJlKCcuL2Fib3V0bWUnKTsgXG5jb25zdCBza2lsbHMgPSByZXF1aXJlKCcuL3NraWxscycpO1xuXG5cbmxldCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xubGV0IHJlbmRlciA9ICh2YWwpID0+IHtcbiAgICBsZXQgIG9wdGlvbjtcbiAgICBcbiAgICBpZih2YWwgPT09ICdIb21lJyl7XG4gICAgICAgIG9wdGlvbiA9ICdIb21lJ1xuICAgIH1lbHNle1xuICAgICAgICBvcHRpb24gPSB2YWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgIH1cbiAgICBcbiAgICBzd2l0Y2gob3B0aW9uKXtcbiAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgY29uc29sZS5sb2cob3B0aW9uKVxuICAgICAgICAgIHJlbW92ZUVsZW1lbnQoKTtcbiAgICAgICAgICBob21lKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBYm91dCBNZSc6XG4gICAgICAgICAgcmVtb3ZlRWxlbWVudCgpO1xuICAgICAgICAgIGFib3V0bWUoKTtcbiAgICAgICAgICBhZGRCYWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICAnU2tpbGxzJzpcbiAgICAgICAgICByZW1vdmVFbGVtZW50KClcbiAgICAgICAgICBza2lsbHMoKTsgXG4gICAgICAgICAgYWRkQmFjaygpO1xuICAgICAgICAgIGJyZWFrOyAgIFxuICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmchJykgIFxuICB9XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpe1xuICAgIGNvbnNvbGUubG9nKGByZW1vdmluZyBFbGVtZW50IGluIG1haW4gZGl2YClcbiAgICB3aGlsZShtYWluLmZpcnN0Q2hpbGQpe1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4ubGFzdENoaWxkKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhZGRCYWNrKCl7XG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBiYWNrQnV0dG9uLmNsYXNzTGlzdCA9ICdiYWNrJ1xuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKCd2YWx1ZScsJ0hvbWUnKVxuICAgIGJhY2tCdXR0b24uaW5uZXJIVE1MID0gJ0JhY2snXG4gICAgbWFpbi5hcHBlbmQoYmFja0J1dHRvbik7XG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHZhbCA9ICdIb21lJztcbiAgICAgICAgcmVuZGVyKHZhbCk7XG4gICAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7IiwibGV0IHNraWxsID0gKCkgPT57XG5cbiAgICBsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICBsZXQgc2tpbGxzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHNraWxsc0NvbnRhaW5lci5jbGFzc05hbWUgPSAnc2tpbGxzQ29udGFpbmVyIGNvbnRhaW5lci1mbHVpZCc7XG4gICAgbGV0IHNraWxscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICBza2lsbHMuY2xhc3NOYW1lID0gJ3NraWxscyc7XG4gICAgbGV0IHNraWxsc0hlYWRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBza2lsbHNIZWFkbGluZS5jbGFzc0xpc3QgPSAnc2tpbGxzSGVhZGxpbmUnO1xuXG4gICAgbGV0IGxvYWRTa2lsbHMgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBsb2FkU2tpbGxzLm9wZW4oJ0dFVCcsJy4uL0pTT04vc2tpbGxzLmpzb24nLHRydWUpO1xuXG4gICAgbG9hZFNraWxscy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKGxvYWRTa2lsbHMucmVhZHlTdGF0ZSA9PSA0ICYmIGxvYWRTa2lsbHMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgIGxldCBza2lsbHNEYXRhID0gSlNPTi5wYXJzZShsb2FkU2tpbGxzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgIGNyZWF0ZVNraWxscyhza2lsbHNEYXRhKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRTa2lsbHMuc2VuZCgpXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTa2lsbHMoZGF0YSl7XG4gICAgICAgIGlmKGRhdGEgaW5zdGFuY2VvZiBPYmplY3Qpe1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIGluIGRhdGEpe1xuICAgICAgICAgICAgICAgIHNraWxsc0hlYWRsaW5lLmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpdGVtcyBpbiBkYXRhW2l0ZW1dKXtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGl0ZW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Rlc2lnbmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5jbGFzc0xpc3QgPSAnZGVzaWduSGVhZGxpbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgyLmlubmVySFRNTCA9IGl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNpZ24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaWduLmNsYXNzTmFtZSA9ICdkZXNpZ25TZWN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzaWdubGlzdCAgPSBjb250ZW50U2VsZWN0b3IoZGF0YVtpdGVtXVtpdGVtc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hcHBlbmQoaDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2lnbi5hcHBlbmQoZGVzaWdubGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzLmFwcGVuZChkZXNpZ24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnU2NyaXB0aW5nIExhbmd1YWdlcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5jbGFzc0xpc3QgPSAnZGV2ZWxvcEhlYWRsaW5lJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5pbm5lckhUTUwgPSBpdGVtcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGV2ZWxvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZlbG9wLmNsYXNzTGlzdCA9ICdkZXZlbG9wU2VjdGlvbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2ZWxvcGxpc3QgPSBjb250ZW50U2VsZWN0b3IoZGF0YVtpdGVtXVtpdGVtc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmVsb3AuYXBwZW5kKGgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZlbG9wLmFwcGVuZChkZXZlbG9wbGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzLmFwcGVuZChkZXZlbG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1Rvb2xzLE1hbmFnZW1lbnQgU29mdHdhcmVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgyLmNsYXNzTGlzdCA9ICdtYW5hZ2VIZWFkbGluZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuaW5uZXJIVE1MID0gaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hbmFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2UuY2xhc3NMaXN0ID0gJ21hbmFnZVNlY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYW5hZ2VsaXN0ID0gY29udGVudFNlbGVjdG9yKGRhdGFbaXRlbV1baXRlbXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2UuYXBwZW5kKGgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYW5hZ2UuYXBwZW5kKG1hbmFnZWxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxscy5hcHBlbmQobWFuYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ09zXFwncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoMi5jbGFzc0xpc3QgPSAnb3NIZWFkbGluZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaDIuaW5uZXJIVE1MID0gaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9zLmNsYXNzTGlzdCA9ICdvc1NlY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvc2xpc3QgPSBjb250ZW50U2VsZWN0b3IoZGF0YVtpdGVtXVtpdGVtc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9zLmFwcGVuZChoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3MuYXBwZW5kKG9zbGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzLmFwcGVuZChvcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNraWxsc0NvbnRhaW5lci5hcHBlbmQoc2tpbGxzSGVhZGxpbmUpO1xuICAgICAgICBza2lsbHNDb250YWluZXIuYXBwZW5kKHNraWxscyk7XG4gICAgICAgIG1haW4uYXBwZW5kKHNraWxsc0NvbnRhaW5lcik7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gY29udGVudFNlbGVjdG9yKGFycil7XG4gICAgbGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgIHVsLmNsYXNzTmFtZSAgPSAnc2tpbGxMaXN0J1xuICAgIGZvcihsZXQgaXRlbSBvZiBhcnIpe1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGxpLmlubmVySFRNTCA9IGl0ZW07XG4gICAgICAgIHVsLmFwcGVuZChsaSkgXG4gICAgfVxuICAgIHJldHVybiB1bDtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNraWxsOyJdfQ==
