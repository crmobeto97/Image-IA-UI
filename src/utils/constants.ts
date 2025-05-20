// const environment: string = "local";
const environment: string = process.env.ENVIRONMENT //?? 'local';
console.log(environment)
var Backend: string;
switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "http://54.197.75.153:8000/";
		break;
    case "prod":
		Backend = "http://18.208.172.153:8000/";
		break;
}
export { Backend };

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

