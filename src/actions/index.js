import { URL, AUTH } from "../utils/GlobalConet";
import axios from "axios";

export const loginReques = payload => ({
  type: "LOGIN_REQUEST",
  payload
});

export const maritimoRequest = payload => ({
  type: "MARITIMO_REQUEST",
  payload
});

export const terrestreRequest = payload => ({
  type: "TERRESTRE_REQUEST",
  payload
});

export const aereoRequest = payload => ({
  type: "AEREO_REQUEST",
  payload
});

export const facturasRequest = payload => ({
  type: "FACTURAS_REQUEST",
  payload
});

export const setError = payload => ({
  type: "SET_ERROR",
  payload
});

export const logOut = payload => ({
  type: "LOGOUT_REQUEST",
  payload
});

export const sendLogin = (section, payload, redirectURL, history) => {
  return dispatch => {
    axios
      .post(
        `${URL}${section}`,
        { rfc: payload.username, password: payload.password },
        {
          auth: AUTH
        }
      )
      .then(({ data }) => {
        dispatch(loginReques(data));
        dispatch(getMaritimo("embarque", data.clave));
        dispatch(getFacturas("getFacturas", data.clave));
      })
      .then(() => {
        history.push(redirectURL);
      })
      .catch(function(err) {
        dispatch(setError(err));
      });
  };
};

export const getMaritimo = (section, payload) => {
  return dispatch => {
    axios
      .get(`${URL}${section}/${payload}`, {
        auth: AUTH
      })
      .then(function(response) {
        dispatch(maritimoRequest(response.data));
      });
  };
};

export const getTerrestre = (section, payload) => {
  return dispatch => {
    axios
      .get(`${URL}${section}/${payload}`, {
        auth: AUTH
      })
      .then(function(response) {
        dispatch(terrestreRequest(response.data));
      });
  };
};

export const getFacturas = (section, payload) => {
  return dispatch => {
    axios
      .get(`${URL}${section}/${payload}`, {
        auth: AUTH
      })
      .then(function(response) {
        dispatch(facturasRequest(response.data));
      });
  };
};

export const getAereo = (section, payload) => {
  return dispatch => {
    axios
      .get(`${URL}${section}/${payload}`, {
        auth: AUTH
      })
      .then(function(response) {
        dispatch(aereoRequest(response.data));
      });
  };
};


export const sendAttachment = (section, payload) => {
  return dispatch => {
    axios
      .post(
        `${URL}${section}`,
        payload,
        {
          auth: AUTH
        }
      )
      .then(({ data }) => {
        console.log (data.nombre)
        const download = document.createElement("a")
        const linkfile = `data:application/octet-stream;base64,${data.encode}`
        download.href = linkfile;
        download.download = data.nombre;
        download.click();
      });
  };
};

