export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'A express typescript library API'
        },
        servers: [
            {
                url: "https://api-lowdb.arielmartin3.repl.co"
            }
        ]
    },
    //apis:["./src/routes/*.ts"]
    apis:["./src/swagger/*.http"]
}