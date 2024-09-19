const getListaCompromissos = async () => {
    let url = 'http://127.0.0.1:5001/lista-compromissos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.compromissos.forEach(compromisso => insertList(compromisso.nome, compromisso.id))
      })
      .catch((error) => {
        console.error('Error:', error)
      });
  }
  
  getListaCompromissos()

  
  const postCompromisso = async (inputCompromisso) => {
    const formData = new FormData()
    formData.append('nome', inputCompromisso)
  
    let url = 'http://127.0.0.1:5001/adiciona-compromisso'
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  

  const insertDeleteButton = (parent) => {
    let span = document.createElement("span")
    let txt = document.createTextNode("\u00D7")
    span.className = "close"
    span.appendChild(txt)
    parent.appendChild(span)
  }


  const insertEditButton = (parent) => {
    let span = document.createElement("span")
    let txt = document.createTextNode("\u270E")
    span.className = "edit"
    span.appendChild(txt)
    parent.appendChild(span)
  }
  

  const editElement = () => {
    let editButtons = document.getElementsByClassName("edit")
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].onclick = function () {
            let row = this.parentElement.parentElement
            let cell = row.getElementsByTagName('td')[0]
            let currentName = cell.textContent;
            let newName = prompt("Digite o novo nome do compromisso:", currentName)
            if (newName && newName !== currentName) {
                cell.textContent = newName
                let id = row.getAttribute('data-id')
                editItem(id, newName)
            }
        }
    }
  }


  const editItem = (id, newName) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('nome', newName)

    let url = `http://127.0.0.1:5001/atualiza-compromisso`
    fetch(url, {
        method: 'PUT',
        body: formData
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error)
    });
  }
  
  
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Deseja excluir o compromisso?")) {
          div.remove()
          deleteItem(nomeItem)
        }
      }
    }
  }
  
  
  const deleteItem = (item) => {
    let url = 'http://127.0.0.1:5001/deleta-compromisso?nome=' + item
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  const novoCompromisso = () => {
    let adicionaCompromisso = document.getElementById("newInput").value
  
    if (adicionaCompromisso === '') {
      alert("Escreva o nome de um compromisso!")
    } else {
      insertList(adicionaCompromisso)
      postCompromisso(adicionaCompromisso)
    }
  }
  
  
  const insertList = (nomeCompromisso, id) => {
    var item = [nomeCompromisso]
    var table = document.getElementById('myTable')
    var row = table.insertRow()
    row.setAttribute('data-id', id)
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertEditButton(row.insertCell(-1))
    insertDeleteButton(row.insertCell(-1))
    document.getElementById("newInput").value = ""
    editElement()
    removeElement()
  }