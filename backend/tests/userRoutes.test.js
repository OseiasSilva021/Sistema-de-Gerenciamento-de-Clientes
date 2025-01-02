const request = require('supertest');
const app = require('../app'); // Importa a aplicação principal
const User = require('../models/User'); // Modelo de usuário (mockearemos isso)
const jwt = require('jsonwebtoken')

describe('Testes da API de Usuários', () => {
  // Limpar o banco de dados antes de cada teste
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Teste de criação de usuário
  it('Deve criar um novo usuário', async () => {
    const userData = {
      name: 'João Silva',
      email: 'joao@gmail.com',
      password: 'senha123',
      phoneNumber: '123456789',
      empresa: 'Minha Empresa',
      setor: 'TI',
    };

    const response = await request(app).post('/users').send(userData);
    expect(response.status).toBe(201); // Verifica o status HTTP
    expect(response.body.user).toHaveProperty('_id'); // Verifica se o ID foi gerado
    expect(response.body.user.name).toBe(userData.name); // Verifica os dados retornados
  });

  // Teste de login do administrador
it('Deve realizar o login como administrador', async () => {
  // Define as credenciais de admin para o teste
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123'; // Certifique-se de usar a mesma senha definida no ambiente de teste
  process.env.ADMIN_PASSWORD = adminPassword;

  const response = await request(app).post('/login').send({
    email: adminEmail,
    password: adminPassword,
  });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token'); // Verifica se o token foi gerado
  expect(response.body.role).toBe('admin'); // Verifica o papel do usuário
});

it('Deve editar os dados de um usuário existente pelo ID', async () => {
  // Cria um usuário para o teste
  const user = await User.create({
    name: 'João Silva',
    email: 'joao@gmail.com',
    password: 'senha123',
    phoneNumber: '123456789',
    empresa: 'Minha Empresa',
    setor: 'TI',
  });

  // Gerar o token para o usuário criado (simulando autenticação)
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Dados para atualização
  const updateData = {
    name: 'João Silva Atualizado',
    phoneNumber: '987654321',
    empresa: 'Empresa Nova',
    setor: 'Desenvolvimento',
  };

  // Chamar a rota PUT com o token gerado e os dados a serem atualizados
  const response = await request(app)
    .put(`/users/${user._id}`) // Aqui estamos passando o ID do usuário como parâmetro
    .set('Authorization', `Bearer ${token}`) // Inclui o token de autenticação
    .send(updateData); // Envia os dados para atualizar

  // Validar o resultado
  expect(response.status).toBe(200); // Status 200 de sucesso
  expect(response.body.user.name).toBe(updateData.name); // Verifica se o nome foi atualizado
  expect(response.body.user.phoneNumber).toBe(updateData.phoneNumber); // Verifica o número de telefone
  expect(response.body.user.empresa).toBe(updateData.empresa); // Verifica a empresa
  expect(response.body.user.setor).toBe(updateData.setor); // Verifica o setor
});



  it('Deve atualizar os dados de um usuário existente', async () => {
    const user = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: 'senha789',
      phoneNumber: '111222333',
      empresa: 'Empresa C',
      setor: 'Financeiro',
    });
  
    // Gerar o token para o usuário criado
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    // Dados para atualização
    const updateData = {
      name: 'Carlos Atualizado',
      phoneNumber: '222333444',
      empresa: 'Empresa D',
      setor: 'Administrativo',
    };
  
    // Chamar a rota PUT com o token gerado
    const response = await request(app)
      .put('/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);
  
    // Validar o resultado
    expect(response.status).toBe(200); 
    expect(response.body.user.name).toBe(updateData.name); 
    expect(response.body.user.phoneNumber).toBe(updateData.phoneNumber); 
    expect(response.body.user.empresa).toBe(updateData.empresa);
  });
  
  

  // Teste de login
  it('Deve realizar o login do usuário', async () => {
    const userData = {
      name: 'João Silva',
      email: 'joao@gmail.com',
      password: 'senha123',
      phoneNumber: '123456789',
      empresa: 'Minha Empresa',
      setor: 'TI',
    };

    // Cria o usuário para o teste
    await new User(userData).save();

    const response = await request(app).post('/login').send({
      email: 'joao@gmail.com',
      password: 'senha123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token'); // Verifica se o token foi gerado
  });

  // Teste de listagem de usuários
  it('Deve listar todos os usuários', async () => {
    // Cria usuários para o teste
    await User.insertMany([
      { name: 'João', email: 'joao@gmail.com', password: 'senha123', phoneNumber: '123456789', empresa: 'Empresa A', setor: 'TI' },
      { name: 'Maria', email: 'maria@gmail.com', password: 'senha456', phoneNumber: '987654321', empresa: 'Empresa B', setor: 'RH' },
    ]);

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(2); // Verifica se há dois usuários na lista
  });

  // Teste de exclusão de usuário
  it('Deve excluir um usuário pelo ID', async () => {
    const user = await User.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: 'senha789',
      phoneNumber: '111222333',
      empresa: 'Empresa C',
      setor: 'Financeiro',
    });

    const response = await request(app).delete(`/users/${user._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuário deletado com sucesso!');
  });
});
