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
    
    