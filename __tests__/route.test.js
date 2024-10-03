const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Learning Pages Routes', () => {
    // Mock authentication middleware
    beforeEach(() => {
        jest.mock('../middleware/auth', () => ({
            authenticate: (req, res, next) => {
                req.user = { id: 1, username: 'testuser' }; // Mock user object
                next();
            }
        }));
    });





    /**
     * Test Linked Lists Page
     */
    describe('GET /linkedlists', () => {
        it('should return the linked lists learning page for authenticated users', async () => {
            const res = await request(app).get('/linkedlists');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Linked Lists'); // Adjust based on your content
        });
    });

    /**
     * Test Graphs Page
     */
    describe('GET /graphs', () => {
        it('should return the graphs learning page for authenticated users', async () => {
            const res = await request(app).get('/graphs');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Graphs'); // Adjust based on your content
        });
    });

    /**
     * Test Trees Page
     */
    describe('GET /trees', () => {
        it('should return the trees learning page for authenticated users', async () => {
            const res = await request(app).get('/trees');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Trees'); // Adjust based on your content
        });
    });

    /**
     * Test Stacks Page
     */
    describe('GET /stacks', () => {
        it('should return the stacks learning page for authenticated users', async () => {
            const res = await request(app).get('/stacks');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Stacks'); // Adjust based on your content
        });
    });

    /**
     * Test Queues Page
     */
    describe('GET /queues', () => {
        it('should return the queues learning page for authenticated users', async () => {
            const res = await request(app).get('/queues');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Queues'); // Adjust based on your content
        });
    });

    /**
     * Test Arrays Page
     */
    describe('GET /arrays', () => {
        it('should return the arrays learning page for authenticated users', async () => {
            const res = await request(app).get('/arrays');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Arrays'); // Adjust based on your content
        });
    });
});
