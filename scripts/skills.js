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