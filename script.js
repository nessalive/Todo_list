const localStorageNome = "todolist";

let novaTarefa = () => {
  let input = document.getElementById("novaAtividade");
  input.style.border = "";
  if (!input.value) {
    input.style.border = "1px solid red";
    alert("Você não digitou nada...");
  } else if (isExiste()) {
    alert("Já existe esse item na lista");
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageNome) || "[]");

    values.push({
      nome: input.value,
    });

    localStorage.setItem(localStorageNome, JSON.stringify(values));
    mostraTela();
  }
  
  input.value = "";
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      adicionarTarefa();
    }
  });
  adicionarTarefa();
};

let mostraTela = () => {
  let values = JSON.parse(localStorage.getItem(localStorageNome) || "[]");
  let lista = document.getElementById("todo");

  lista.innerHTML = "";

  for (let i = 0; i < values.length; i++) {
    lista.innerHTML += `<li> ${values[i]["nome"]}</button><button id='btnApagar' onclick='apagarItem("${values[i]["nome"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg></button><button id='btneditar' onclick='editItem("${values[i]["nome"]}")'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-vignette" viewBox="0 0 16 16">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/>
      <path d="M8.5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 7a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.683-6.281a.5.5 0 1 1-.866-.5.5.5 0 0 1 .866.5m-3.5 6.062a.5.5 0 1 1-.866-.5.5.5 0 0 1 .866.5m4.598-4.598a.5.5 0 1 1-.5-.866.5.5 0 0 1 .5.866m-6.062 3.5a.5.5 0 1 1-.5-.866.5.5 0 0 1 .5.866M11.5 8.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-7 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m6.281 1.683a.5.5 0 1 1 .5-.866.5.5 0 0 1-.5.866m-6.062-3.5a.5.5 0 1 1 .5-.866.5.5 0 0 1-.5.866m4.598 4.598a.5.5 0 1 1 .866-.5.5.5 0 0 1-.866.5m-3.5-6.062a.5.5 0 1 1 .866-.5.5.5 0 0 1-.866.5"/>
    </svg></button></li>`;
  }
};

let editItem = (data) => {
  let values = JSON.parse(localStorage.getItem(localStorageNome) || "[]");
  let lista = document.getElementById("todo");

  for (let i = 0; i < values.length; i++) {
    if (values[i]["nome"] === data) {
      let novoNome = prompt(
        "Digite o novo nome para o item:",
        values[i]["nome"]
      );

      if (novoNome === null || novoNome.trim() === "") {
        return;
      }

      const nomeJaExistente = values.find((item) => item["nome"].toLowerCase() === novoNome.toLowerCase());

      if (nomeJaExistente) {
        alert("Já existe esse item na lista");
        return;
      }

      values[i]["nome"] = novoNome;
      break;
    }
  }

  localStorage.setItem(localStorageNome, JSON.stringify(values));
  mostraTela();
};

let apagarItem = (data) => {
  let values = JSON.parse(localStorage.getItem(localStorageNome) || "[]");
  let index = values.findIndex((Element) => Element.nome === data);
  values.splice(index, 1);
  localStorage.setItem(localStorageNome, JSON.stringify(values));
  mostraTela();
};

let isExiste = () => {
  let values = JSON.parse(localStorage.getItem(localStorageNome) || "[]");
  let valorItem = document.getElementById("novaAtividade").value;
  let existe = values.find((Element) => Element.nome === valorItem);
  return !existe ? false : true;
};

mostraTela();
