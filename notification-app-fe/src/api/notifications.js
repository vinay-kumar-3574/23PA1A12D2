import { Log } from "../utils/logger.js";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWExMmQyQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODE4MTYsImlhdCI6MTc4MjM4MDkxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjliM2E4MjAwLWE1YjAtNGEyOC05YmMzLTg0YjU0NzA2ZjcyMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwic3ViIjoiNGU2N2NmNjUtODcyZS00YjQ0LWE0NjItY2ExY2Q3MWUxNTllIn0sImVtYWlsIjoiMjNwYTFhMTJkMkB2aXNobnUuZWR1LmluIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwicm9sbE5vIjoiMjNwYTFhMTJkMiIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjRlNjdjZjY1LTg3MmUtNGI0NC1hNDYyLWNhMWNkNzFlMTU5ZSIsImNsaWVudFNlY3JldCI6InlRc014cUFRRnNYYkdLcVAifQ.hZQI2_PgWZGVLsY9oYkQ33wGV97VdeH-rqrMzfXuIoc";

export async function fetchNotifications({ page = 1, limit = 10, notificationType = "All" } = {}) {
  await Log("frontend", "info", "api", "API Started");
  
  try {
    let url = new URL("http://4.224.186.213/evaluation-service/notifications");
    
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    if (notificationType !== "All") {
      url.searchParams.append("notification_type", notificationType);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    await Log("frontend", "info", "api", "API Success");
    
    return data.notifications || [];
  } catch (error) {
    await Log("frontend", "error", "api", "API Error");
    return [];
  }
}
