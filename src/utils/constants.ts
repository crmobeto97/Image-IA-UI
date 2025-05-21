const environment: string = process.env.NEXT_PUBLIC_ENVIRONMENT || "prod";

console.log("ENVIRONMENT:", environment);

var Backend: string;
switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "dev":
		Backend = "http://54.197.75.153:8000/";
		break;
    case "prod":
		Backend = "http://13.218.216.83:8000/";
		break;
    default:
        Backend = "http://localhost:8000/"
}

console.log("BACKEND URL:", Backend);

export { Backend };


