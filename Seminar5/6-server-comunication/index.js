// URL-ul API-ului
const apiUrl = 'http://localhost:8080/api';
let data = [];
let nameInput, ageInput, idInput, form;

window.onload = async function () {
    // Inițializează referințele pentru formular și câmpuri
    form = document.getElementById('myForm');
    nameInput = document.getElementById('nameInput');
    ageInput = document.getElementById('ageInput');
    idInput = document.getElementById('idInput');

    // Setează evenimentul "submit" pentru formular
    form.onsubmit = async (ev) => {
        ev.preventDefault(); // Previne comportamentul implicit al formularului

        // Crează un obiect din datele formularului
        const formData = new FormData(ev.target);
        const object = Object.fromEntries(formData);

        // Validare simplă a câmpurilor
        if (!object.name || !object.age) {
            alert('Completează toate câmpurile');
            return;
        }

        if (idInput.value) {
            // Editare
            await editItem(idInput.value, object);
        } else {
            // Adăugare
            await addToList(object);
        }

        // Resetează formularul și ID-ul pentru o nouă adăugare
        form.reset();
        idInput.value = "";
    };

    // Încarcă tabelul la încărcarea paginii
    await loadTable();
};

// Funcție GET pentru a prelua datele
async function get(url) {
    return (await axios.get(url)).data;
}

// Funcție POST pentru a adăuga un nou element
async function post(url, data) {
    return (await axios.post(url, data));
}

// Funcție PUT pentru a edita un element existent
async function put(url, data) {
    return (await axios.put(url, data));
}

// Încarcă și afisează datele într-un tabel
async function loadTable() {
    const myContainer = document.getElementById('myContainer');
    data = await get(apiUrl + '/getList');

    if (!myContainer || !data) {
        console.error('Eroare la încărcarea datelor');
        return;
    }

    // Construcția codului HTML pentru tabel
    let myHtmlCode = [
        '<table>',
        '<thead>',
        '<tr><th hidden>Id</th><th>Name</th><th>Age</th><th>Actions</th></tr>',
        '</thead>',
        '<tbody>'
    ];

    // Construiește rânduri pentru fiecare element din "data"
    data.forEach(element => {
        myHtmlCode.push(`
            <tr>
                <td hidden>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td>
                    <button class="editPerson" onclick="selectPerson(${element.id})">Edit</button>
                </td>
            </tr>
        `);
    });

    myHtmlCode.push('</tbody></table>');
    myContainer.innerHTML = myHtmlCode.join('');
}

// Funcție pentru adăugarea unui element nou în listă
async function addToList(data) {
    await post(apiUrl + '/addToList', data);
    await loadTable(); // Reîncarcă tabelul după adăugare
}

// Funcție pentru a selecta o persoană și a popula formularul pentru editare
function selectPerson(id) {
    idInput.value = id;
    const selectedPerson = data.find(x => x.id === id);

    if (selectedPerson) {
        nameInput.value = selectedPerson.name;
        ageInput.value = selectedPerson.age;
    }
}

// Funcție pentru a edita un element existent în listă
async function editItem(id, updatedData) {
    await put(`${apiUrl}/editList/${id}`, updatedData);
    await loadTable(); // Reîncarcă tabelul după editare
}
