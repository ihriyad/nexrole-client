"use server";

const baseUrl = process.env.SERVER_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  //auth
  return res.json();
};

//post

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  return res.json(); // now returns { success: true, modifiedCount: 1 }
};
