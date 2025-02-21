const environment: string = "local";

var Backend: string;


switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "";
		break;
    case "prod":
		Backend = "";
		break;
}

export { Backend };

