const environment: string = process.env.NEXT_PUBLIC_ENVIRONMENT || "prod";
const api_url: string =  process.env.NEXT_PUBLIC_API_URL || '';

console.log("ENVIRONMENT:", environment);

var Backend: string;
switch (environment) {
    case "local":
        Backend = "http://localhost:8000/";
        break;
    case "kubernetes":
        Backend = "http://backend-service:8000";
        break;
    case "dev":
		    Backend = "http://54.197.75.153:8000/";
		    break;
    case "prod":
        if( api_url !== '') {
          console.log('Production environment and NEXT_PUBLIC_ENVIRONMENT is not empty.');
          Backend = api_url;
        } else {
          console.log('Production environment but NEXT_PUBLIC_ENVIRONMENT is empty.');
          Backend = "http://127.0.0.1:8000/";
        }
		
		break;
    default:
        Backend = "http://localhost:8000/"
}

console.log("BACKEND URL:", Backend);

export { Backend };


