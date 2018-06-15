import {request} from "../common/js/utils/index";

const log = {
  login: {
    post(params) {
      debugger
      return request("login")
        .post("/login", params)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  }
};
export default log;

