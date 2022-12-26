const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load(){
    const res = await fetch("http://localhost:3000").then((data) => data.json())
    
    res.urls.map(({name,url}) => addElement({name,url}))
}

async function remove(name,url){
    const res = await fetch("http://localhost:3000/?name="+name+"&url="+url+"&del=1").then((data) => console.log(data.json()))
}

async function postElement({ name, url }){
    const res = await fetch("http://localhost:3000/?name="+name+"&url="+url).then((data) => console.log(data.json()))
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {

    if (confirm('Tem certeza que deseja deletar?'))
        remove(el.parentNode.getElementsByTagName('a')[0].innerHTML, el.parentNode.getElementsByTagName('a')[0].getAttribute('href'))
    el.parentNode.remove()
}



form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    postElement({ name, url })
    addElement({ name, url })

    input.value = ""
})