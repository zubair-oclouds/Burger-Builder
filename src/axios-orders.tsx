import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burger-f7711-default-rtdb.firebaseio.com/",
});


export default instance;
