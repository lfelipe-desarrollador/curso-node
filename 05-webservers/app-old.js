import http from 'http';


http.createServer( (req, res)=> {

    res.write('hello zawardo');
    res.end();

}).listen(3000);

console.log('server is running on port 3000');