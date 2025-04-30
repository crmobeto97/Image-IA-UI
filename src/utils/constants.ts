const environment: string = "dev";

var Backend: string;


switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "http://54.162.40.248:8000/";
		break;
    case "prod":
		Backend = "";
		break;
}

export { Backend };

