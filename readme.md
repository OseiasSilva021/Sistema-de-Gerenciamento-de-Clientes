

# CRM - Sistema de Gerenciamento de Usuários

Este é um sistema simples de CRM (Customer Relationship Management) que permite o cadastro, login e gestão de clientes/usuários, incluindo funcionalidades para adicionar, editar e excluir registros, além de exibir uma lista de usuários no dashboard. É projetado para ser intuitivo e facilitar o gerenciamento de informações dos clientes.

## Funcionalidades

- **Página de Registro**: Novo usuário pode se registrar.
- **Página de Login**: Usuários autenticados com credenciais do admin têm acesso ao dashboard.
- **Dashboard do CRM**: Onde os administradores podem adicionar, editar, excluir e visualizar a lista de usuários.
  
## Tecnologias Usadas

- **Frontend**:
  - HTML
  - CSS
  - JavaScript (vanilla)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

- **Autenticação**:
  - JWT (JSON Web Token) (para o admin)

## Instalação

### 1. Clone este repositório

```bash
git clone https://github.com/OseiasSilva021/Sistema-de-Gerenciamento-de-Clientes.git

cd Sistema-de-Gerenciamento-de-Clientes
```

### 2. Instale as dependências do backend

Se você ainda não tiver, instale o Node.js e o npm (Node Package Manager).

```bash
npm install
```

### 3. Configuração do Banco de Dados

Configure seu banco de dados (MongoDB) conforme necessário. Verifique as credenciais de banco de dados na configuração do seu backend.

### 4. Rodando o Backend

```bash
npm start
```

O backend estará rodando em `http://localhost:3000`.

### 5. Abrindo o Frontend

O frontend estará disponível localmente ao abrir o arquivo `index.html` no navegador.

---

## Como Funciona

1. **Página de Registro (index.html)**: Usuários novos podem se registrar com informações básicas, como nome, email, telefone, empresa e setor.
 

2. **Página de Login (login.html)**: O login é feito com as credenciais de admin. Após o login bem-sucedido, o usuário será redirecionado para o **Dashboard do CRM**.


3. **Dashboard do CRM (admin-dashboard.html)**:
   - **Adicionar Usuário**: A partir deste painel, você pode adicionar novos usuários à sua base de dados, preenchendo um formulário com nome, email, telefone, empresa, setor, status, etc.
   - **Editar Usuário**: Você pode editar qualquer usuário da lista clicando em "Editar" ao lado do registro.
   - **Excluir Usuário**: Você pode excluir um usuário clicando em "Excluir".
   - **Listar Usuários**: Todos os usuários cadastrados são listados no painel de forma clara.

4. **Logout**: O administrador pode sair do painel clicando no botão "Sair", o que irá remover o token de autenticação e redirecioná-lo para a página de login.

---

## Estrutura do Projeto

```plaintext
.
├── backend/               # Código do servidor Node.js
│   ├── controllers/        # Controladores da API (adicionar, editar, excluir usuários)
│   ├── models/             # Modelos de dados (Usuários)
│   ├── routes/             # Rotas do Express.js
│   ├── middlewares/
│   ├── config/
│   ├── tests/
│   └── app.js           # Arquivo principal para rodar o servidor
├── frontend/               # Código do frontend (HTML, CSS, JS)
│   ├── index.html          # Página principal
│   ├── login.html          # Página de login
│   ├── admin-dashboard.html  # Página do dashboard do CRM
│   └── style.css           # Arquivo de estilo
└── README.md               # Este arquivo
```

---

## Dicas de Uso

1. **Autenticação de Admin**: Certifique-se de usar credenciais de admin válidas ao realizar login no painel (as credenciais podem ser criadas por vocÊ e inseridas no arquivo `.env`. Se você quiser, pode mudar o email do admin localizado no arquivo `userController.js na linha 149`).


2. **Segurança**: Lembre-se de proteger as rotas de edição e exclusão de usuários com verificações adequadas de permissões (por exemplo, apenas usuários autenticados com token de admin podem realizar essas ações).


3. **Validação de Formulários**: Aplique validações adequadas de entrada, como verificar se o e-mail é válido ou se o campo de telefone está no formato esperado.

---

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

