const HOST_URL = "http://localhost:4000";

export async function loginUser(userName: string) {
  try {
    const response = await fetch(`${HOST_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });

    if (!response.ok) {
      throw new Error(`Запрос вернулся с ошибкой ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("При входе в систему произошла ошибка:", error);
    return null;
  }
}

export async function logoutUser(userName: string) {
  try {
    const response = await fetch(`${HOST_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: userName }),
    });

    if (!response.ok) {
      throw new Error(`Запрос вернулся с ошибкой ${response.status}`);
    }
    return response.ok;
  } catch (error) {
    console.error("При выходе из системы произошла ошибка:", error);
    return null;
  }
}
