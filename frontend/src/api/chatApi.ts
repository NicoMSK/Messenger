const HOST_URL = "http://localhost:4000";

export async function getChats() {
  try {
    const response = await fetch(`${HOST_URL}/chat`);

    if (!response.ok) {
      throw new Error(`Запрос вернулся с ошибкой ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении чатов:", error);
    return [];
  }
}

export async function createChat(nameChat: string) {
  try {
    const response = await fetch(`${HOST_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nameChat }),
    });

    if (!response.ok) {
      throw new Error(`Запрос вернулся с ошибкой ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при создании чата:", error);
    return null;
  }
}
