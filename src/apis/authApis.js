import axiosClient from "./axiosClient";

const authApis = {
  signUp(data) {
    const url = "/auth/sign-up";

    return axiosClient.post(url, data);
  },

  signIn(data) {
    const url = "/auth/sign-in";

    return axiosClient.post(url, data);
  },
};

export default authApis;
