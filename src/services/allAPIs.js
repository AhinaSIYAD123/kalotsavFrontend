import commonAPI from "./commonAPI";
import { serverURL } from "./serverURL";

export const registerUserAPI = async (data) =>
  await commonAPI("POST", `${serverURL}/api/register`, data);

export const loginUserAPI = async (loginBody) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/login`,
    loginBody,
    { "Content-Type": "application/json" } 
  );
};
export const registerParticipantAPI = async (data) =>
  await commonAPI("POST", `${serverURL}/api/register-participant`, data);

export const getAllParticipantsAPI = async () =>
  await commonAPI("GET", `${serverURL}/api/participants`);

export const createResultAPI = async (data) =>
  await commonAPI("POST", `${serverURL}/api/results`, data);

export const getAllResultsAPI = async () =>
  await commonAPI("GET", `${serverURL}/api/results`);

export const uploadVideoAPI = async (formData) =>
  await commonAPI(
    "POST",
    `${serverURL}/api/upload-video`,
    formData,
    { "Content-Type": "multipart/form-data" }
  );


export const getVideosAPI = async () =>
  await commonAPI(
    "GET",
    `${serverURL}/api/videos`   
  );

export const addEventAPI = async (eventData) =>
  await commonAPI(
    "POST",
    `${serverURL}/api/add-event`, 
    eventData
  );
export const getEventsAPI = async () =>
  await commonAPI("GET", `${serverURL}/api/events`);


export const addNotificationAPI = async (notificationData) =>
  await commonAPI("POST", `${serverURL}/api/add-not`, notificationData);

export const getNotificationsAPI = async () =>
  await commonAPI("GET", `${serverURL}/api/get-notifications`);

export const getAllUsersAPI = async () =>
  await commonAPI("GET", `${serverURL}/api/users`);

export const updateAdminAPI = async (formData, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/admin/updateAdmin`,
    formData,
    reqHeader
  );
};

export const getAdminAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/admin`,
    null,
    reqHeader
  );
};

export const deleteVideoAPI = async (id) => {
  const res = await axios.delete(`${serverURL}/videos/${id}`);
  return res.data;
};


export const payWaterAPI = async (data, reqHeader) =>
  await commonAPI(
    "POST",
    `${serverURL}/api/pay-water`,
    data,
    reqHeader
  );

export const createVolunteerRequestAPI = async (requestBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/volunteer-request`, 
    requestBody,
    reqHeader
  );
};


export const getVolunteerRequestsAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/volunteer-requests`,
    null,
    reqHeader
  );
};

export const updateRequestStatusAPI = async (id, data, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/volunteer-requests/${id}`,
    data,
    reqHeader
  );
};

export const getParticipantAPI = async (reqHeader) =>
  await commonAPI("GET", "/api/user/participant", "", reqHeader);

export const updateParticipantAPI = async (requestBody, reqHeader) =>
  await commonAPI("PUT", "/api/user/participant/update", requestBody, reqHeader);




export const updateOrganizerAPI = async (requestBody, reqHeader) =>
  await commonAPI("PUT", `${serverURL}/api/organizer/update`, requestBody, reqHeader);

export const getOrganizerAPI = async (reqHeader) =>
  await commonAPI("GET", `${serverURL}/api/organizer`, null, reqHeader);

export const googleLoginAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/api/google-login`, data);
};
