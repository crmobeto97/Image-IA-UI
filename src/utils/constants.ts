// const environment: string = "local";
const environment: string = process.env.ENVIRONMENT ?? 'local';
var Backend: string;
switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "http://localhost:8000/";
		break;
    case "prod":
		Backend = "http://54.162.40.248:8000/";
		break;
}

export { Backend };

