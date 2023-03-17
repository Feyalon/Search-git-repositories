async function gitSearch(){
    event.preventDefault()
    let repo_name = document.getElementById('git_name')
    if(repo_name.value.length > 3){
        let git = await fetch(`https://api.github.com/search/repositories?q={${repo_name.value}}{&page,per_page,sort,order}`)
        let commits = await git.json()
        let items = commits.items;
        show_repo(items)
    }else{
        alert("Слишком мало символов, нужно больше 3-x")
    }
}

function show_repo(item){
    
    try{
        let show_repo = document.getElementById('show_repo')
        let div = ''
        let el = item

        for(let i = 1; i <= 10; i++){
            el = item[i]
            div += `
                <ul class="list-group">
                    <li class="list-group-item">
                        <p class="text-decoration-underline">
                            ${el.full_name}
                        </p>
                        <h1>
                            ${el.name}
                        </h1>
                        
                        <p>
                            ${el.description}
                        </p>

                        <a target="_blank" href="${el.clone_url}">
                            Ссылка на репозиторий
                        </a>
                    
                    </li>
                    
                </ul>
            `
        }
        show_repo.innerHTML = div
    }catch(e){
        let show = document.getElementById('show_repo');
        let list ="";
        list +=`
            <h1 class="position-absolute top-50 start-50">
                Репозиторий не был найден
            </h1>
        `
        show.innerHTML = list;
    }
}
