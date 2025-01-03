const request = require('supertest');
const app = require('../app');
const Notes = require('../models/Notes');
const mongoose = require('mongoose');

jest.setTimeout(30000); // Define um timeout global maior

describe('Rotas de Notas', () => {
    let mockUserId; // Variável para armazenar um ObjectId válido

    beforeAll(async () => {
        await mongoose.connect("mongodb+srv://usuario021:oseias@cluster0.deyip.mongodb.net/bancodeoseias?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mockUserId = new mongoose.Types.ObjectId(); // Gera um ObjectId válido
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe('POST /notes', () => {
        it('Deve criar uma nota e retornar status 201', async () => {
            const response = await request(app)
                .post('/notes')
                .send({
                    title: 'Minha Nota',
                    description: 'Descrição da nota',
                })
                .set('Authorization', 'Bearer mockToken');

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Nota criada com sucesso!');
            expect(response.body.note).toHaveProperty('title', 'Minha Nota');
        });
    });

    describe('GET /notes', () => {
        it('Deve listar todas as notas do usuário', async () => {
            const response = await request(app)
                .get('/notes')
                .set('Authorization', 'Bearer mockToken');

            expect(response.status).toBe(200);
            expect(response.body.notes).toBeInstanceOf(Array);
        }, 10000); // Timeout ajustado para 10 segundos
    });

    describe('PUT /notes/:id', () => {
        it('Deve atualizar uma nota existente', async () => {
            const note = await Notes.create({
                title: 'Nota Atualizável',
                description: 'Descrição inicial',
                user: mockUserId,
            });

            const response = await request(app)
                .put(`/notes/${note._id}`)
                .send({
                    title: 'Nota Atualizada',
                    description: 'Descrição atualizada',
                })
                .set('Authorization', 'Bearer mockToken');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Nota atualizada com sucesso!');
            expect(response.body.note).toHaveProperty('title', 'Nota Atualizada');
        });
    });

    describe('DELETE /notes/:id', () => {
        it('Deve deletar uma nota existente', async () => {
            const note = await Notes.create({
                title: 'Nota Deletável',
                description: 'Descrição da nota',
                user: mockUserId,
            });

            const response = await request(app)
                .delete(`/notes/${note._id}`)
                .set('Authorization', 'Bearer mockToken');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Nota deletada com sucesso!');
        });
    });
});
