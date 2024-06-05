TrybeFC

Funcionalidades
1️⃣ **Banco de dados:**
  - Um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
 
2️⃣ **Back-end:**
 - Feito em NodeJS
 - COnexão direta com o Front-end
 
3️⃣ **Front-end:**
  - Feito em ReactJS
  
4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;
  

