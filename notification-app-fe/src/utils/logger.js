const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWExMmQyQHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODM0MTQsImlhdCI6MTc4MjM4MjUxNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFhODBlOGE5LTMwNjgtNDhhOS04ZmQxLTk3NTYxMTc1Zjc4MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwic3ViIjoiNGU2N2NmNjUtODcyZS00YjQ0LWE0NjItY2ExY2Q3MWUxNTllIn0sImVtYWlsIjoiMjNwYTFhMTJkMkB2aXNobnUuZWR1LmluIiwibmFtZSI6Im11a2t1IHZpbmF5IGt1bWFyIiwicm9sbE5vIjoiMjNwYTFhMTJkMiIsImFjY2Vzc0NvZGUiOiJhaFhqdnAiLCJjbGllbnRJRCI6IjRlNjdjZjY1LTg3MmUtNGI0NC1hNDYyLWNhMWNkNzFlMTU5ZSIsImNsaWVudFNlY3JldCI6InlRc014cUFRRnNYYkdLcVAifQ.iZB6Bbaasz_OgPEW6t3ckfIcIr9C5TZqh7SFor-Wvgs";

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