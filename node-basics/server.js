const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT =  process.env.PORT || 3000;

const server = http.createServer( async (req, res) => {

    if(req.url === '/'){

        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({message : 'server running..'}))
    } else if(req.url === '/api/data'){
        try {
            const filePath = path.join(__dirname, 'data.json');
            const data = await fs.readFile(filePath, 'utf-8');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } catch (error) {
            console.error(error);

            res.writeHead(500, {'Content-type' : 'application/json'});
            res.end(JSON.stringify({error : "Internal server error"}))
        }
    } else{
        res.writeHead(404, {'Content-type' : 'application/json'});
        res.end(JSON.stringify({error : 'Route not found'}));
    }
})


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
