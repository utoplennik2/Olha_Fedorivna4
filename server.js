const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const lecturerData = {
    lecturer: {
        fullName: "Булгакова Ольга Федорівна",
        position: "Старший викладач кафедри комп’ютерних наук",
        description: "Викладаю дисципліни з програмування та інформаційних технологій. Професійні інтереси включають проєктування та розробку автоматизованих інформаційних систем.",
        email: "bulgakova@umsf.dp.ua",
        phone: "+380000000000",
        googleScholar: "https://scholar.google.com.ua/citations?user=HyJWkhUAAAAJ&hl=ru"
    },
    education: [
        "Основи розв’язку програмного забезпечення",
        "Алгоритми та програмування",
        "Дані та знання",
        "Розробка проєктів",
        "Додатки",
        "Інформаційні технології",
        "Офісне програмування",
        "Операційні системи"
    ],
    experience: [
        "Куратор академічних груп К23-1, К23-2",
        "З 2021 р. – керівник студентського наукового гуртка «Прикладна аналітика застосування математичного моделювання для розробки програмного забезпечення»",
        "Заступник завідувача кафедри програмного забезпечення та системного аналізу"
    ]
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    // API endpoint
    if (parsedUrl.pathname === '/api/lecturer' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(lecturerData));
        return;
    }

    // Статические файлы из папки client
    let filePath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    filePath = path.join(__dirname, 'client', filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('Сервер запущен!');
    console.log('Сайт: https://olha-fedorivna4.onrender.com');
    console.log('API:  https://olha-fedorivna4.onrender.com/api/lecturer');
});
