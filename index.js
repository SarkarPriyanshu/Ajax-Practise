// let main = document.querySelector('main');
// let homeListContainer = document.createElement('section');
// homeListContainer.classList = 'homeListContainer container-fluid';

window.onload = () =>{
//     let loadHomePage = new XMLHttpRequest()
//     loadHomePage.open('GET', 'JSON/homepage.json' , true)

//     loadHomePage.onreadystatechange = () => {
//         if(loadHomePage.readyState == 4 && loadHomePage.status == 200){
//             let HomepageList = JSON.parse(loadHomePage.responseText)
//             createHomepageList(HomepageList);
//         }
//     }
//     loadHomePage.send();
// }

// function createHomepageList(data){
//     let listContainer = document.createElement('div')
//     let listHome = document.createElement('ul')
//     if(data instanceof Object){
//         for(let item in data){
//             if(data[item] instanceof Object){
//                 for(let element in data[item]){
//                     var value = data[item][element];
//                     let li = document.createElement('li');
//                     li.classList = 'HomeListItem';
//                     let  a = document.createElement('a');
//                     li.classList = 'HomeListLinks';
//                     listHome.append(li);
//                     li.append(a);
//                     a.setAttribute('href',`/${data[item][element]}`)
//                     a.innerHTML = value;
//                     listContainer.append(listHome);
//                 }
//             }
//         }
//         homeListContainer.append(listContainer);
//     }
//     main.append(homeListContainer);



// let main = document.querySelector('main');
// let aboutMeContainer = document.createElement('section');
// aboutMeContainer.classList = 'aboutMeContainer container-fluid';

// let loadAboutMe = new XMLHttpRequest()
// loadAboutMe.open('GET', 'JSON/aboutme.json',true)

// loadAboutMe.onreadystatechange = () => {
//     if(loadAboutMe.readyState == 4 && loadAboutMe.status == 200){
//         let aboutMeData = JSON.parse(loadAboutMe.responseText)
//         createAboutMe(aboutMeData)
//     }
//   }
//   loadAboutMe.send()


//   function createAboutMe(data){
//         if(data instanceof Object){
//             for(let item in data){
//                 switch(item){
//                     case 'Headline':
//                          let headline = document.createElement('h2');
//                          headline.classList ='AboutMeHeadline';
//                          headline.innerHTML = data[item];
//                          aboutMeContainer.append(headline)   
//                          break;
//                     case 'Tagline':
//                          let Tagline = document.createElement('h3');
//                          Tagline.classList ='AboutTagline';
//                          Tagline.innerHTML = data[item]
//                          aboutMeContainer.append(Tagline);   
//                         break;
//                     case 'Content':
//                         let AboutMeContent = document.createElement('p');
//                         AboutMeContent.classList ='AboutMeContent';
//                         AboutMeContent.innerHTML = data[item]
//                         aboutMeContainer.append(AboutMeContent);
//                         break;
//                         default:
//                             console.log('Hello World')         
//                 }
//             }
//         }
//         main.append(aboutMeContainer);
//     }


let main = document.querySelector('main');
let skillsContainer = document.createElement('section')
skillsContainer.className = 'skillsContainer container-fluid'

}




