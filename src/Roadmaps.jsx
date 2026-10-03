import { useState } from "react";

const roadmapData = [
    {
        id: 1,
        title: "Web Development",
        description: "Learn to build websites and web applications.",
        duration: "12 weeks",
        stages: [
            {
                title: "HTML Fundamentals",
                duration: "Week 1–2",
                tasks: [
                    "Learn HTML elements and tags",
                    "Create forms and tables",
                    "Build a simple personal profile page"
                ]
            },
            {
                title: "CSS and Responsive Design",
                duration: "Week 3–4",
                tasks: [
                    "Learn colors, fonts, margins and padding",
                    "Practice Flexbox and Grid",
                    "Build a responsive landing page"
                ]
            },
            {
                title: "JavaScript Basics",
                duration: "Week 5–7",
                tasks: [
                    "Learn variables, functions and arrays",
                    "Practice events and DOM manipulation",
                    "Build a calculator or to-do list"
                ]
            },
            {
                title: "React Fundamentals",
                duration: "Week 8–10",
                tasks: [
                    "Learn components and props",
                    "Practice state and effects",
                    "Build a small React application"
                ]
            },
            {
                title: "Portfolio and Freelancing",
                duration: "Week 11–12",
                tasks: [
                    "Complete two portfolio projects",
                    "Publish your portfolio",
                    "Prepare proposals for potential clients"
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Data Analytics",
        description: "Learn to analyze data and create business reports.",
        duration: "10 weeks",
        stages: [
            {
                title: "Excel Fundamentals",
                duration: "Week 1–2",
                tasks: [
                    "Learn formulas and functions",
                    "Practice sorting and filtering",
                    "Create an Excel dashboard"
                ]
            },
            {
                title: "SQL Fundamentals",
                duration: "Week 3–4",
                tasks: [
                    "Learn SELECT, WHERE and ORDER BY",
                    "Practice GROUP BY and aggregate functions",
                    "Learn JOIN operations"
                ]
            },
            {
                title: "Power BI",
                duration: "Week 5–6",
                tasks: [
                    "Import and transform data",
                    "Create charts and interactive reports",
                    "Build a business dashboard"
                ]
            },
            {
                title: "Python for Analytics",
                duration: "Week 7–8",
                tasks: [
                    "Learn Python basics",
                    "Practice Pandas data manipulation",
                    "Analyze a sample dataset"
                ]
            },
            {
                title: "Portfolio and Freelancing",
                duration: "Week 9–10",
                tasks: [
                    "Complete two analytics projects",
                    "Publish project descriptions and screenshots",
                    "Practice client communication and proposals"
                ]
            }
        ]
    },
    {
        id: 3,
        title: "UI/UX Design",
        description: "Learn to design useful and user-friendly digital products.",
        duration: "8 weeks",
        stages: [
            {
                title: "Design Fundamentals",
                duration: "Week 1–2",
                tasks: [
                    "Study colors and typography",
                    "Learn visual hierarchy",
                    "Analyze existing app designs"
                ]
            },
            {
                title: "Wireframes and User Flows",
                duration: "Week 3–4",
                tasks: [
                    "Learn basic wireframing",
                    "Create user flows",
                    "Sketch a mobile application"
                ]
            },
            {
                title: "Figma Practice",
                duration: "Week 5–6",
                tasks: [
                    "Learn frames and components",
                    "Create reusable design elements",
                    "Design a website or mobile app"
                ]
            },
            {
                title: "Portfolio and Freelancing",
                duration: "Week 7–8",
                tasks: [
                    "Complete two design projects",
                    "Document your design decisions",
                    "Prepare a portfolio and proposal"
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Digital Marketing",
        description: "Learn to promote products and services online.",
        duration: "8 weeks",
        stages: [
            {
                title: "Marketing Fundamentals",
                duration: "Week 1–2",
                tasks: [
                    "Understand target audiences",
                    "Learn marketing funnels",
                    "Study basic campaign planning"
                ]
            },
            {
                title: "Content and Social Media",
                duration: "Week 3–4",
                tasks: [
                    "Create a content calendar",
                    "Practice social media content writing",
                    "Prepare a sample campaign"
                ]
            },
            {
                title: "SEO and Analytics",
                duration: "Week 5–6",
                tasks: [
                    "Learn keyword research",
                    "Understand on-page SEO",
                    "Practice interpreting campaign metrics"
                ]
            },
            {
                title: "Portfolio and Freelancing",
                duration: "Week 7–8",
                tasks: [
                    "Prepare a sample marketing campaign",
                    "Document the campaign strategy",
                    "Create a service proposal for a potential client"
                ]
            }
        ]
    }
];

function Roadmaps() {
    const [selectedRoadmap, setSelectedRoadmap] = useState(roadmapData[0]);
    const [completedTasks, setCompletedTasks] = useState([]);

    function toggleTask(taskId) {
        setCompletedTasks((previous) =>
            previous.includes(taskId)
                ? previous.filter((id) => id !== taskId)
                : [...previous, taskId]
        );
    }

    const allTasks = selectedRoadmap.stages.flatMap((stage, stageIndex) =>
        stage.tasks.map((task, taskIndex) => ({
            id: `${selectedRoadmap.id}-${stageIndex}-${taskIndex}`,
            task
        }))
    );

    const completedCount = allTasks.filter((task) =>
        completedTasks.includes(task.id)
    ).length;

    const progress = allTasks.length
        ? Math.round((completedCount / allTasks.length) * 100)
        : 0;

    return (
        <main style={styles.container}>
            <h1>Learning Roadmaps</h1>
            <p>Follow a step-by-step path to develop freelancing skills.</p>

            <label htmlFor="roadmap">Choose a learning path: </label>

            <select
                id="roadmap"
                value={selectedRoadmap.id}
                onChange={(event) => {
                    const roadmap = roadmapData.find(
                        (item) => item.id === Number(event.target.value)
                    );
                    setSelectedRoadmap(roadmap);
                }}
                style={styles.select}
            >
                {roadmapData.map((roadmap) => (
                    <option key={roadmap.id} value={roadmap.id}>
                        {roadmap.title}
                    </option>
                ))}
            </select>

            <section style={styles.summary}>
                <h2>{selectedRoadmap.title}</h2>
                <p>{selectedRoadmap.description}</p>
                <p><strong>Suggested duration:</strong> {selectedRoadmap.duration}</p>

                <p>
                    Progress: {completedCount} of {allTasks.length} tasks
                    completed ({progress}%)
                </p>

                <div style={styles.progressBackground}>
                    <div
                        style={{
                            ...styles.progressBar,
                            width: `${progress}%`
                        }}
                    />
                </div>
            </section>

            {selectedRoadmap.stages.map((stage, stageIndex) => (
                <section key={stage.title} style={styles.card}>
                    <h3>{stage.title}</h3>
                    <p><strong>{stage.duration}</strong></p>

                    {stage.tasks.map((task, taskIndex) => {
                        const taskId =
                            `${selectedRoadmap.id}-${stageIndex}-${taskIndex}`;

                        return (
                            <label key={taskId} style={styles.task}>
                                <input
                                    type="checkbox"
                                    checked={completedTasks.includes(taskId)}
                                    onChange={() => toggleTask(taskId)}
                                />
                                <span>{task}</span>
                            </label>
                        );
                    })}
                </section>
            ))}
        </main>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937"
    },
    select: {
        padding: "10px",
        margin: "12px 0",
        borderRadius: "6px",
        border: "1px solid #ccc",
        maxWidth: "100%"
    },
    summary: {
        backgroundColor: "#eff6ff",
        padding: "20px",
        borderRadius: "12px",
        margin: "20px 0"
    },
    progressBackground: {
        height: "12px",
        backgroundColor: "#dbeafe",
        borderRadius: "8px",
        overflow: "hidden"
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2563eb",
        transition: "width 0.2s"
    },
    card: {
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "16px"
    },
    task: {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        margin: "12px 0",
        cursor: "pointer"
    }
};

export default Roadmaps;