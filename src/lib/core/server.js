"use server";

const baseUrl = process.env.SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  //auth
  return res.json();
};

//post 

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  //authentication 401..

  return res.json();
};
