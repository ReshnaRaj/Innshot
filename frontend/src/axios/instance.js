import axios from "axios";
import {baseUrl,staffUrl,adminUrl} from '../files/file'

const createAxiosClient = (baseURL) => {
    const client = axios.create({
      baseURL,
      timeout: 10000,
      timeoutErrorMessage: "Request timeout... Please Try Again!!!"
    })
    // console.log(client,"instance data...");
    return client
  }
  const attachToken = (req, tokenName = "usertoken") => {
    let authToken = localStorage.getItem(tokenName)
    // console.log(authToken,"user token structure consoling")
    if (authToken) {
      // console.log(authToken,"authentication working...")
      req.headers.Authorization = `Bearer ${authToken}`
      // console.log(req.headers.Authorization,"ttttttt")
      // console.log(req)

    }
    return req
  }
  // The req object being returned from the attachToken function would 
  // typically contain all the data necessary to make an HTTP request.
  // adding an Authorization header to the request
  
const staffAxiosInstance = createAxiosClient(staffUrl)
staffAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "stafftoken")
  return modifiedReq
})
const userAxiosInstance = createAxiosClient(baseUrl)
// console.log(userAxiosInstance,"oooo")
userAxiosInstance.interceptors.request.use(async (req) => {
  // console.log(req,"hhhhh")
  const modifiedReq = attachToken(req, "usertoken")
  // console.log(modifiedReq,"tokendooo")
  return modifiedReq
})

// In summary, the provided code sets up a request interceptor for the 
// Axios instance userAxiosInstance.  ,
//  modifies it by attaching a token,   and 
//  then returns the modified request object to allow the request to proceed.
//   This mechanism is commonly used for tasks like authentication, where 
//   additional headers or parameters need to be added to outgoing requests.


const adminAxiosInstance = createAxiosClient(adminUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "admintoken")
  return modifiedReq
})

export { staffAxiosInstance, userAxiosInstance, adminAxiosInstance }