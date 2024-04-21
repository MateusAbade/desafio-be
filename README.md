# Requisitos
NodeJS 20.6 ou superior
Bancos de dados MySQL
# Instalação
1. Baixe ou clone este repositório
2. Entre no diretório do projeto
3. Instale as dependências
```
npm install
```
3. Construa o projeto usando o script de construção
```
npm run build
```

# Configurar
1. Copie o arquivo .env.example e renomeie-o para .env e atualize os parâmetros conforme seu banco
2. Para produção, copie o .env e cole dentro do build
   
# Execute sua migração
```
node ace migration:run
```
Não se esqueça de sempre executá-los novamente sempre que houver uma alteração nos arquivos de migração

# Uso
- Certifique-se de ter concluído a etapa de instalação e configuração
- Você pode então iniciar o aplicativo como dev ou prod
1. Para inciar como dev
```
npm run dev
```
2. Para executar em prod
```
npm run start
```
Agora o endpoint deve estar disponível de acordo com a configuração das variáveis ​​de ambiente. O padrão é http://localhost:3333

# Documentos da API
Importe o arquivo de coleção Postman (postman_collection.json) para fazer os testes 
