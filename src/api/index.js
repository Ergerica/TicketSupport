import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-ticket-support.herokuapp.com",
  timeout: 15000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("app_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const logIn = async (email, pass) => {
  let response;

  await instance
    .post("/login", {
      password: pass,
      email: email,
    })
    .then((r) => {
      response = r.data.user;
      localStorage.setItem("app_token", r.data.token);
      localStorage.setItem("current_user", JSON.stringify(r.data.user));
    })
    .catch((e) => {
      console.log(e);
    });

  return response;
};

export const signUp = async (name, email, pass) => {
  let response;

  await instance
    .post("/signup", {
      password: pass,
      email: email,
      name: name,
    })
    .then((r) => {
      response = r.data.user;
    })
    .catch((e) => {
      console.log(e);
    });

  return response;
};

export const getTickets = async () => {
  let response;
  await instance
    .get("/tickets")
    .then((r) => {
      response = r.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const cancelTicket = async (id) => {
  let response;
  await instance
    .patch(`/tickets/${id}`, [
      { op: "update", path: "status", value: "Canceled" },
    ])
    .then((r) => {
      response = r.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const updateTicketStatus = async (id, status) => {
  let response;
  await instance
    .patch(`/tickets/${id}`, [{ op: "update", path: "status", value: status }])
    .then((r) => {
      response = r.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const getNotifications = async () => {
  let response;
  await instance
    .get("/changes")
    .then((r) => {
      response = r.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
};

export const createTicket = async (title, description, type) => {
  let response;

  await instance
    .post("/tickets", {
      title: title,
      description: description,
      type: type,
      severity: Math.floor(Math.random() * 10) + 1,
      priority: Math.floor(Math.random() * 10) + 1,
    })
    .then((r) => {
      response = r.data;
    })
    .catch((e) => {
      console.log(e);
    });

  return response;
};
