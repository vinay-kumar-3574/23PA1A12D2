const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWExMmQyQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODUzNjIsImlhdCI6MTc4MjM4NDQ2MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImMwMTUxODEyLTJjMWQtNDZlOS04NzhhLTAzMDBmYTY1NjM4MSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwic3ViIjoiNGU2N2NmNjUtODcyZS00YjQ0LWE0NjItY2ExY2Q3MWUxNTllIn0sImVtYWlsIjoiMjNwYTFhMTJkMkB2aXNobnUuZWR1LmluIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwicm9sbE5vIjoiMjNwYTFhMTJkMiIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjRlNjdjZjY1LTg3MmUtNGI0NC1hNDYyLWNhMWNkNzFlMTU5ZSIsImNsaWVudFNlY3JldCI6InlRc014cUFRRnNYYkdLcVAifQ.ZL39jmPCK7nForWIixeqIhKFE_0tTTOpZj91FQ5DYKw";

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create log");
    }

    return await response.json();
  } catch (error) {
    // Intentionally left empty because the instructions discourage console logging.
  }
}