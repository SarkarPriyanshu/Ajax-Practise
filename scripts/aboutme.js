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