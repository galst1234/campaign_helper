# Installation

1.  Install requirements 
    ```shell script
    cd backend
    pip install -r requirements.txt
    cd frontend
    npm install
    cd ..
    ```
2. Generate Typescript API
    ```shell script
    docker run --rm -it -v $PWD:/local openapitools/openapi-generator-cli generate -i /local/backend/openapi-schema.yml -g typescript-fetch -o /local/frontend/src/backend_api --additional-properties=typescriptThreePlus=true
    ```
