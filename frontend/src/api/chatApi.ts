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
