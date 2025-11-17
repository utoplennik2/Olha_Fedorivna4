const Controller = (function() {
    const DOM = {
        fullName: document.getElementById("fullName"),
        description: document.getElementById("description"),
        contacts: document.getElementById("contacts"),
        educationList: document.getElementById("educationList"),
        experienceList: document.getElementById("experienceList")
    };

    async function loadData() {
        try {
            const response = await fetch('/api/lecturer');
            const data = await response.json();

            DOM.fullName.innerHTML = `${data.lecturer.fullName}<br><span style="font-weight:normal;font-size:0.9em;">${data.lecturer.position}</span>`;
            DOM.description.textContent = data.lecturer.description;
            DOM.contacts.innerHTML = `Електронна пошта: ${data.lecturer.email}<br>Номер телефону: ${data.lecturer.phone}`;

            DOM.educationList.innerHTML = "";
            data.education.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                DOM.educationList.appendChild(li);
            });

            DOM.experienceList.innerHTML = "";
            data.experience.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                DOM.experienceList.appendChild(li);
            });

        } catch (err) {
            document.body.innerHTML = "<h1 style='color:red;text-align:center;'>Не вдалось завантажити дані з сервера</h1>";
            console.error(err);
        }
    }

    return {
        init: function() {
            console.log("MVC-додаток запущено (з даними з API). Автор: Маценко");
            loadData();
        }
    };
})();
