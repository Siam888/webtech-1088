
window.onload = () => {
    const form = document.getElementById('form');
    const tableBody = document.querySelector('#myTable tbody')
    form.onsubmit = (ev) => {

        ev.preventDefault();
        const formData = new FormData(ev.target);
        const formProps = Object.fromEntries(formData);

        const tr = document.createElement('tr');

        for (const key in formProps) {
            const td = document.createElement('td');

            td.innerText = formProps[key]
            tr.appendChild(td);
        }

        tableBody.appendChild(tr);
        form.reset();
    }
}