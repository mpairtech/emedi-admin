import { domain } from "../../secret";

const panelLogin = async (user) => {
  const response = await fetch(`${domain}/panel/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export { panelLogin };
