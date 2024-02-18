# Documentação de Rotas - Guarita Andaimes

## Clients

### 1. Index

- **Endpoint**: `GET /`
- **Descrição**: Retorna os clientes cadastrados no sistema paginados.
- **Parâmetros**: Nenhum.
- **Exemplo de Resposta**:
  ```json
    {
        "take": 10,
        "page": 1,
        "total": 1,
        "pages": 1,
        "nextPage": 1,
        "previousPage": 1,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "data": [
            {
                "id": 1,
                "name": "Luis",
                "surname": "Brandino",
                "identification_number": "000.000.000-01",
                "city": "Mat├úo",
                "phone": "(16) 99700-2606",
                "cep": "12345678",
                "address": "R. Das Casas",
                "building_number": "1",
                "email": "luis@brasilux.com.br",
                "reference": "Brasilux"
            }
        ]
    }
  ```
  
### 2. Criar um novo cliente

- **Endpoint**: `POST /client`
- **Descrição**: Cria um novo cliente no sistema.
- **Corpo da requisição**:
    ```json
    {
        "name": "Lúcia Rosa Eduarda"
        "surname": "Araújo"
        "identification_number": "773.998.379-96" // CPF ou CNPJ
        "city": "São José dos Campos"
        "cep": "12228-500"
        "address": "Rua H19B"
        "building_number": "292"
        "email": "lucia-araujo86@regional.com.br"
        "phone": "12986818734"
        "reference": "Próximo ao cemitério" // Opcional
    }
    ```
      
### 3. Alterar um cliente

- **Endpoint**: `POST /client/:id/edit`
- **Descrição**: Atualiza um cliente existente com base no ID fornecido.
- **Parâmetros**: ID do cliente a ser atualizado na URL.
- **Corpo da requisição**:
    ```json
    {
        "surname": "Araújo dos Santos" // Enviado somente os campos a serem modificados
    }
    ```
          
### 4. Excluir um cliente

- **Endpoint**: `POST /client/:id/delete`
- **Descrição**: Deleta um cliente com base no ID fornecido.
- **Parâmetros**: ID do cliente a ser excluído na URL.

### 5. Procurar por clientes

- **Endpoint**: `GET /client/search?name=:name`
- **Descrição**: Retorna os clientes cadastrados no sistema paginados com base no nome.
- **Parâmetros**: Nome do cliente a ser pesquisado na URL.
- **Exemplo de Resposta**:
  ```json
  {
        "take": 10,
        "page": 1,
        "total": 1,
        "pages": 1,
        "nextPage": 1,
        "previousPage": 1,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "data": [
            {
                "id": 1,
                "name": "Luis",
                "surname": "Brandino",
                "identification_number": "000.000.000-01",
                "city": "Mat├úo",
                "phone": "(16) 99700-2606",
                "cep": "12345678",
                "address": "R. Das Casas",
                "building_number": "1",
                "email": "luis@brasilux.com.br",
                "reference": "Brasilux"
            }
        ]
    }
  ```

## Products

### 1. Index

- **Endpoint**: `GET /stock`
- **Descrição**: Retorna os produtos cadastrados no sistema paginados.
- **Exemplo de Resposta**:
  ```json
  {
    "take": 10,
    "page": 1,
    "total": 3,
    "pages": 1,
    "nextPage": 1,
    "previousPage": 1,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "data": [
        {
            "id": 1,
            "description": "Martelo",
            "quantity_owned": 35,
            "quantity": 30,
            "daily_price": 5
        },
        {
            "id": 2,
            "description": "Betoneira",
            "quantity_owned": 15,
            "quantity": 10,
            "daily_price": 350.99
        },
        {
            "id": 3,
            "description": "Corda",
            "quantity_owned": 25,
            "quantity": 25,
            "daily_price": 20
        }
    ]
  }
  ```

### 2. Criar um novo produto

- **Endpoint**: `POST /stock`
- **Descrição**: Cria um novo produto no sistema.
- **Corpo da requisição**:
    ```json
    {
        "description": "Betoneira"
        "quantity_owned": 5
        "daily_price": 399.99
    }
    ```
      
### 3. Alterar um produto

- **Endpoint**: `POST /stock/:id/edit`
- **Descrição**: Atualiza um produto existente com base no ID fornecido.
- **Parâmetros**: ID do produto a ser atualizado na URL.
- **Corpo da requisição**:
    ```json
    {
        "quantity_owned": 15 // Enviado somente os campos a serem modificados
    }
    ```

### 4. Excluir um produto

- **Endpoint**: `POST /stock/:id/delete`
- **Descrição**: Deleta um produto com base no ID fornecido.
- **Parâmetros**: ID do produto a ser excluído na URL.


### 5. Procurar por produtos

- **Endpoint**: `GET /stock/search?description=:description`
- **Descrição**: Retorna os produtos cadastrados no sistema paginados com base na descrição.
- **Parâmetros**: Descrição do produto a ser pesquisado na URL.
- **Exemplo de Resposta**:
  ```json
  {
    "take": 10,
    "page": 1,
    "total": 1,
    "pages": 1,
    "nextPage": 1,
    "previousPage": 1,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "data": [
        {
            "id": 1,
            "description": "Martelo",
            "quantity_owned": 35,
            "quantity": 30,
            "daily_price": 5
        }
    ]
  }
  ```

## Rentals

### 1. No prazo

- **Endpoint**: `GET /withdrawn/ontime`
- **Descrição**: Retorna os alugados que estão no prazo paginados.
- **Exemplo de Resposta**:
  ```json
  {
    "take": 10,
    "page": 1,
    "total": 10,
    "pages": 1,
    "nextPage": 1,
    "previousPage": 1,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "data": [
        {
            "id": 15,
            "start_date": "2024-02-07",
            "end_date": "2024-02-27",
            "total_daily_price": 1610.99,
            "completed": false,
            "products": [
                {
                    "id": 29,
                    "product_quantity": 2,
                    "daily_price": 1400,
                    "product": {
                        "id": 1,
                        "description": "Martelo",
                        "quantity_owned": 260,
                        "quantity": 212,
                        "daily_price": 700
                    }
                },
                {
                    "id": 30,
                    "product_quantity": 1,
                    "daily_price": 210.99,
                    "product": {
                        "id": 2,
                        "description": "Betoneira",
                        "quantity_owned": 2333,
                        "quantity": 2298,
                        "daily_price": 210.99
                    }
                }
            ],
            "client": {
                "id": 1,
                "name": "Luis",
                "surname": "Brandino",
                "identification_number": "000.000.000-01",
                "city": "Mat├úo",
                "phone": "(16) 99700-2606",
                "cep": "12345678",
                "address": "R. Das Casas",
                "building_number": "1",
                "email": "luis@brasilux.com.br",
                "reference": "Brasilux"
            }
        },
       ...
      ]
    },
  ```

### 2. Prestes a expirar

- **Endpoint**: `GET /withdrawn/expiring`
- **Descrição**: Retorna os alugados que estão prestes a expirar (dois dias até o fim do prazo) paginados.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```

### 3. Atrasados

- **Endpoint**: `GET /withdrawn/arrears`
- **Descrição**: Retorna os alugados que estão atrasados paginados.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```

### 4. Listar todos aluguéis

- **Endpoint**: `GET /withdrawn`
- **Descrição**: Retorna os alugados paginados.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```
  
### 5. Receber aluguel

- **Endpoint**: `POST /withdrawn/:id/receive`
- **Descrição**: Recebe o aluguel com base no ID fornecido, marcando-o como completado.
- **Parâmetros**: ID do aluguel a ser recebido na URL.
  
### 6. Excluir aluguel

- **Endpoint**: `POST /withdrawn/:id/delete`
- **Descrição**: Deleta o aluguel com base no ID fornecido.
- **Parâmetros**: ID do aluguel a ser deletado na URL.

### 7. Listar aluguéis recebidos

- **Endpoint**: `GET /received`
- **Descrição**: Retorna os aluguéis que já foram completados cadastrados no sistema paginados.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```

  ### 8. Procurar por aluguéis não finalizados

- **Endpoint**: `GET /withdrawn/search?name=:name`
- **Descrição**: Retorna os aluguéis não completados cadastrados no sistema paginados de acordo com o nome do cliente passado no parâmetro query.
- **Parâmetros**: Nome do cliente a ser pesquisado na URL.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```

### 9. Procurar por aluguéis finalizados

- **Endpoint**: `GET /received/search?name=:name`
- **Descrição**: Retorna os aluguéis não completados cadastrados no sistema paginados com base no nome do cliente passado no parâmetro query.
- **Parâmetros**: Nome do cliente a ser pesquisado na URL.
- **Exemplo de Resposta**:
  ```json
  Mesmo do endpoint /withdrawn/ontime
  ```
