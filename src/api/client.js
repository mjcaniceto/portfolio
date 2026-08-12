const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
import { PROJECTS } from "../data/projects.js";
import { SKILLS } from "../data/skills.js";
import { EXPERIENCE } from "../data/experience.js";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message = body?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

export const api = {
  getProjects: () => Promise.resolve(PROJECTS), // request("/projects"),
  getSkills: () => Promise.resolve(SKILLS), // request("/skills"),
  getExperiences: () => Promise.resolve(EXPERIENCE), // request("/experiences"),
  getCertifications: () => request("/certifications"),
  getPosts: () => request("/posts"),
  getPost: (id) => request(`/posts/${id}`),
  getHealth: () => request("/health"),
  postContact: (payload) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
