"use server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function generateTerms(data: { projectDetails: string }) {
  const result = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: data.projectDetails }],
    }),
  });

  if (!result.ok) {
    const errText = await result.text();
    return {
      success: false,
      message: "Failed to generate terms.",
      error: errText || result.statusText,
      data: null,
    };
  }

  let resultData: { message?: string };
  try {
    resultData = await result.json();
  } catch {
    return {
      success: false,
      message: "Invalid response from server.",
      data: null,
    };
  }

  return {
    success: true,
    message: "Terms & Conditions generated successfully.",
    data: resultData,
  };
}
