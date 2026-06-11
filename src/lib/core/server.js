'use server'

const baseUrl = process.env.SERVER_URL

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
