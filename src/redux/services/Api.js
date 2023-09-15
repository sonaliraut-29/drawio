import axios from "axios";

/**
 * @author Sonali Raut
 * @description api This is used in whole application to call services,
 *  here we have create axios instance
 */

export const api = (baseUrl, header = {}, params = {}) => {
  const service = axios.create({
    baseURL: baseUrl,
    headers: buildHeader({ ...header, ...{} }),
    params: params,
    validateStatus: (status) => {
      if (status === 403) {
        (async () => {})();
      }
      return true;
    },
    transformResponse: [
      (response) => {
        return parseApiResponse(response);
      },
    ],
  });

  return service;
};

/**
 * @author Sonali Raut
 * @description buildHeader This is used For add header object
 */
const buildHeader = (obj = {}) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  Object.assign(header, obj);
  return header;
};

const parseApiResponse = (response) => {
  if (typeof response === "string") {
    try {
      response = JSON.parse(response);
    } catch (e) {
      /* Ignore */
    }
  }
  return response;
};

export default api;
