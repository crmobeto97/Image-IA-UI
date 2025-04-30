const environment: string = "local";

var Backend: string;


switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "http://35.153.207.30:8000/";
		break;
    case "prod":
		Backend = "";
		break;
}

export { Backend };

