import { useEffect, useState } from "react";
import { getAllSkills } from "./services/skillService";

function Skills() {
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllSkills()
            .then((data) => setSkills(data))
            .catch(() => setError("Unable to load skills."))
            .finally(() => setLoading(false));
    }, []);

    const categories = [
        "All",
        ...new Set(skills.map((skill) => skill.category))
    ];

    const filteredSkills = skills.filter((skill) => {
        const matchesSearch =
            skill.name.toLowerCase().includes(search.toLowerCase()) ||
            skill.tools.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || skill.category === category;

        return matchesSearch && matchesCategory;
    });

    if (loading) return <p>Loading skills...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.container}>
            <h1>Explore Freelancing Skills</h1>

            <input
                type="text"
                placeholder="Search skills or tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.search}
            />

            <div style={styles.filters}>
                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setCategory(item)}
                        style={{
                            ...styles.button,
                            backgroundColor:
                                category === item ? "#2563eb" : "#e5e7eb",
                            color: category === item ? "white" : "#111827"
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div style={styles.grid}>
                {filteredSkills.length === 0 ? (
                    <p>No matching skills found.</p>
                ) : (
                    filteredSkills.map((skill) => (
                        <div key={skill.id} style={styles.card}>
                            <h2>{skill.name}</h2>
                            <p>
                                <strong>Category:</strong> {skill.category}
                            </p>
                            <p>{skill.description}</p>
                            <p>
                                <strong>Tools:</strong> {skill.tools}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif"
    },
    search: {
        width: "100%",
        maxWidth: "500px",
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "16px"
    },
    filters: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "25px"
    },
    button: {
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px"
    },
    card: {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    }
};

export default Skills;