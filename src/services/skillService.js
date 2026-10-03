const API_URL = "http://localhost:8080/api/skills";

// Get all skills from the Spring Boot backend
export async function getAllSkills() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch skills");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw error;
    }
}