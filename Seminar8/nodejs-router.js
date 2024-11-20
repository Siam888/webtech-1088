const http = require('http');

// Create a router object with support for middleware
const router = {
    stack: [], // Unified stack for middleware and route handlers

    // Add middleware or route handler to the stack
    use(pathOrMiddleware, middleware) {
        if (typeof pathOrMiddleware === 'function') {
            // Middleware without a specific path
            this.stack.push({ path: null, handler: pathOrMiddleware });
        } else {
            // Middleware or route handler with a specific path
            this.stack.push({ path: pathOrMiddleware, handler: middleware });
        }
    },

    // Register a route for a specific HTTP method and path
    addRoute(method, path, handler) {
        this.stack.push({
            path,
            handler: (req, res, next) => {
                if (req.method === method && req.url === path) {
                    handler(req, res, next);
                } else {
                    next(); // Skip if method or path doesn't match
                }
            }
        });
    },

    // Execute all middleware and handlers in sequence
    handle(req, res) {
        let index = 0;

        const next = () => {
            if (index < this.stack.length) {
                const layer = this.stack[index++];
                const { path, handler } = layer;

                // Match middleware or route handler
                if (!path || req.url.startsWith(path)) {
                    handler(req, res, next); // Call the handler
                } else {
                    next(); // Skip to the next layer
                }
            } else {
                // Default response for unmatched routes
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            }
        };

        next(); // Start processing the stack
    }
};

// Middleware example: Logger
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware example: JSON body parser
router.use((req, res, next) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
            try {
                req.body = JSON.parse(body);
            } catch {
                req.body = null;
            }
            next();
        });
    } else {
        next();
    }
});

// Registering routes
router.addRoute('GET', '/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Home Page');
});

router.addRoute('POST', '/books', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Received book data', body: req.body }));
});

// Middleware example: Post-route middleware
router.use((req, res, next) => {
    console.log('Post-route middleware ran');
    next();
});

// Create the HTTP server and use the router to handle requests
const server = http.createServer((req, res) => {
    router.handle(req, res);
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
