# CRM - Sistema de Gerenciamento de Usuários 🚀

Este é um sistema simples de CRM (Customer Relationship Management) que permite o cadastro, login e gestão de clientes/usuários, incluindo funcionalidades para adicionar, editar, excluir, buscar e exibir uma lista de usuários no dashboard. É projetado para ser intuitivo e facilitar o gerenciamento de informações dos clientes. 💻📊

## Funcionalidades ⚙️

- **Página de Registro**: Novo usuário pode se registrar. 📝
- **Página de Login**: Usuários autenticados com credenciais do admin têm acesso ao dashboard. 🔑
- **Dashboard do CRM**: Onde os administradores podem:
  - Adicionar, editar e excluir usuários. ➕✏️❌
  - Listar todos os usuários cadastrados. 📋
  - **Buscar usuários** pelo nome, email ou outros critérios. 🔍
  - **Exportar dados dos usuários** em formato **Excel** ou **CSV** para relatórios ou backup. 📄📃

## Tecnologias Usadas 🔧

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

## Instalação ⚡

### 1. Clone este repositório

```bash
git clone https://github.com/OseiasSilva021/Sistema-de-Gerenciamento-de-Clientes.git
cd Sistema-de-Gerenciamento-de-Clientes
```

### 2. Instale as dependências do backend

Certifique-se de ter o Node.js e o npm instalados. 📦

```bash
npm install
```

### 3. Configuração do Banco de Dados

Configure seu banco de dados (MongoDB) conforme necessário. Verifique as credenciais de banco de dados na configuração do seu backend. 💄📄

### 4. Rodando o Backend

```bash
npm start
```

O backend estará rodando em http://localhost:3000. 🌐

### 5. Abrindo o Frontend

Abra o arquivo `index.html` no navegador para acessar a interface. 🌍

---

## Como Funciona 💡

1. **Página de Registro (index.html)**: Usuários novos podem se registrar com informações básicas, como nome, email, telefone, empresa e setor. 🚕

2. **Página de Login (login.html)**: O login é feito com as credenciais de admin. Após o login bem-sucedido, o usuário será redirecionado para o **Dashboard do CRM**. 🔒

3. **Dashboard do CRM (admin-dashboard.html)**:
   - **Adicionar Usuário**: A partir deste painel, você pode adicionar novos usuários à sua base de dados, preenchendo um formulário. ➕
   - **Editar Usuário**: Modifique informações de qualquer usuário clicando em "Editar". ✏️
   - **Excluir Usuário**: Remova um usuário clicando em "Excluir". ❌
   - **Listar Usuários**: Todos os usuários cadastrados aparecem de forma clara. 📁
   - **Buscar Usuários**: Use a barra de busca para filtrar usuários por nome, email ou outro critério específico. 🔍
   - **Exportar Dados**: Baixe os dados dos usuários cadastrados em formato **Excel** ou **CSV** para uso em relatórios ou backup. 📄

4. **Logout**: O administrador pode sair clicando no botão "Sair", que remove o token de autenticação. 🚪

---

## Dicas de Uso ⚠️

1. **Busca Otimizada**: Garanta que os índices apropriados estão configurados no banco de dados para agilizar as buscas. Utilize `text index` no MongoDB para melhorar o desempenho de pesquisas textuais. 🔧
2. **Segurança**: Proteja as rotas sensíveis, como a busca e exportação de dados, para que apenas administradores autenticados possam usá-las. 🔐
3. **UX Melhorado**: Implemente mensagens de erro claras para entradas inválidas na busca e na exportação. ✅
4. **Exportação**: Teste periodicamente a funcionalidade de exportação para garantir que os formatos de dados estão corretos e que informações sensíveis não estão sendo vazadas. 📊

---

## Licença 📄

Este projeto é licenciado sob a [MIT License](LICENSE).

