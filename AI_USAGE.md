 ### AI Tool Used : Google Gemini
### prompt:
 how to create a custom hook that supports get request,post request,put request and delete request?

import { useMemo, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  // Core raw request handler — forwards parameters directly to global Axios
  const request = useCallback(async (method, url, data, config) => {
    const response = await axios({
      method,
      url: `http://localhost:4000/api${url}`, // Base URL appended directly
      data,
      withCredentials: true, // Retained so cookies are still sent automatically
      ...config,
    });
    return response;
  }, []);

  // Expose standard Axios interface mapping
  const api = useMemo(() => ({
    get:    (url, config)        => request("get", url, undefined, config),
    post:   (url, data, config)  => request("post", url, data, config),
    put:    (url, data, config)  => request("put", url, data, config),
    patch:  (url, data, config)  => request("patch", url, data, config),
    delete: (url, config)        => request("delete", url, undefined, config),
  }), [request]);

  return { api };
};

export default useApi;

1. Centralized Request Handler (request)
JavaScript
const request = useCallback(async (method, url, data, config) => {
  const response = await axios({
    method,
    url: `http://localhost:4000/api${url}`,
    data,
    withCredentials: true,
    ...config,
  });
  return response;
}, []);
Dynamic Axios Config: Instead of writing individual axios.get or axios.post syntax trees, all requests pass through this single functional bottleneck. It uses a configuration object to dynamically set the method, payload data, and destinations.

Hardcoded Base URL: It automatically prefixes all incoming network paths with http://localhost:4000/api, removing the need to write the full server domain address inside components.

withCredentials: true: This is an important security setting. It forces the browser to automatically include cookies (such as session tokens or HTTP-only auth cookies) in cross-origin HTTP requests to your backend server.

The ...config Spread: This allows specific component calls to override or append settings dynamically (e.g., adding custom headers or lengthening timeout thresholds).

2. Syntactic Sugar Mapping (api)
JavaScript
const api = useMemo(() => ({
  get:    (url, config)        => request("get", url, undefined, config),
  post:   (url, data, config)  => request("post", url, data, config),
  ...
}), [request]);
This section reshapes the generic request method into separate, semantic functions (api.get, api.post, api.put, etc.).

It mimics the native Axios interface exactly, ensuring developers can switch from plain Axios to this custom hook without changing their calling habits inside components.

Critical React Performance Choices
The core value of this hook lies in how it optimizes memory pointers via useCallback and useMemo:

Why useCallback is used on request
In JavaScript, functions are recreated on every render. If request was a plain arrow function, it would get a brand-new memory reference on every single component lifecycle tick.

Why useMemo is used on api
Because request is memoized and its reference never changes (indicated by its empty dependency array []), the api object's useMemo is also able to preserve its memory address perfectly.

The Architectural Result: The returned api object remains reference-stable. This means a component can safely drop api or api.get into a useEffect dependency array without triggering dangerous infinite re-render loops.

Responsibility Shift (What this raw hook leaves to the Component)
Because this version strips away internal instance setups and state handlers, it enforces a separation of concerns:

Error Handling: If a network call fails (e.g., a 401 Unauthorized or 500 Server Error), this hook throws the error naturally. The calling component is fully responsible for wrapping the execution block inside a local try/catch block.

Loading States: The hook does not track execution states. Components must manage their own local const [loading, setLoading] = useState(false) lines to switch on spinners during active network calls.

### Modifications Made

Added loading state management,error handling inside the requesst handler, also added axios Instance and Interceptors to the useApi() custom hook.

## Reasons for modification 
 adding  axios Instance can reduce the code duplication and define global behaviors like withCredentials:true are exactly added once.Components don't need to know or pass the whole paths . They just need to pass relative paths.

 Global Security Management-Interceptors act as gatekeepers or middleware that catch incoming responses before they are handled by  application components.

 Adding error state here helps in centralized trouble monitoring

 Loading state-Helps prevent local State Boilerplate and enable instant UI feedback
