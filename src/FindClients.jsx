import { useState } from "react";

const platforms = [
    {
        name: "Upwork",
        url: "https://www.upwork.com/",
        description: "Explore freelance projects posted by clients.",
        beginnerTip: "Build a focused profile and submit tailored proposals."
    },
    {
        name: "Fiverr",
        url: "https://www.fiverr.com/",
        description: "Create service listings that clients can discover.",
        beginnerTip: "Offer a clearly defined service with sample work."
    },
    {
        name: "Freelancer",
        url: "https://www.freelancer.com/",
        description: "Explore projects across multiple professional categories.",
        beginnerTip: "Read the requirements carefully before bidding."
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        description: "Connect with businesses and professionals.",
        beginnerTip: "Share useful work samples and build professional connections."
    }
];

const services = [
    "Website Development",
    "Excel Reports and Dashboards",
    "SQL Data Analysis",
    "Power BI Dashboards",
    "Graphic and UI/UX Design",
    "Social Media Management",
    "Content Writing"
];

const proposalTemplate = `Hello [Client Name],

I read your project requirements and understand that you need [describe the client's goal].

I can help you by:
1. [First task or deliverable]
2. [Second task or deliverable]
3. [Final deliverable]

Here is my relevant work: [Portfolio Link]

I would be happy to discuss your requirements and timeline.

Thank you,
[Your Name]`;

function FindClients() {
    const [copied, setCopied] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    const checklist = [
        "Choose one service I can deliver confidently",
        "Create at least two relevant work samples",
        "Prepare a professional profile",
        "Write a short introduction",
        "Understand the client's requirements",
        "Agree on deliverables, deadlines and payment terms"
    ];

    async function copyProposal() {
        try {
            await navigator.clipboard.writeText(proposalTemplate);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
            window.alert("Copy is unavailable. Please select and copy the template manually.");
        }
    }

    function toggleChecklist(item) {
        setCheckedItems((previous) =>
            previous.includes(item)
                ? previous.filter((value) => value !== item)
                : [...previous, item]
        );
    }

    return (
        <main style={styles.container}>
            <h1>Find Freelance Clients</h1>

            <p>
                Learn where to discover projects, present your skills,
                and communicate professionally with potential clients.
            </p>

            <h2>1. Where can you find clients?</h2>

            <div style={styles.grid}>
                {platforms.map((platform) => (
                    <article key={platform.name} style={styles.card}>
                        <h3>{platform.name}</h3>
                        <p>{platform.description}</p>
                        <p><strong>Tip:</strong> {platform.beginnerTip}</p>

                        <a
                            href={platform.url}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.link}
                        >
                            Visit platform ↗
                        </a>
                    </article>
                ))}
            </div>

            <h2>2. Services you can offer</h2>

            <p>Choose a service that matches your actual skills and experience.</p>

            <div style={styles.services}>
                {services.map((service) => (
                    <span key={service} style={styles.badge}>
                        {service}
                    </span>
                ))}
            </div>

            <h2>3. Prepare before contacting a client</h2>

            <div style={styles.card}>
                {checklist.map((item) => (
                    <label key={item} style={styles.checkItem}>
                        <input
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleChecklist(item)}
                        />
                        <span>{item}</span>
                    </label>
                ))}

                <p>
                    Preparation completed: {checkedItems.length}/{checklist.length}
                </p>
            </div>

            <h2>4. Freelance proposal template</h2>

            <div style={styles.card}>
                <pre style={styles.template}>{proposalTemplate}</pre>

                <button onClick={copyProposal} style={styles.button}>
                    {copied ? "Copied!" : "Copy Proposal"}
                </button>
            </div>

            <h2>5. Protect yourself from scams</h2>

            <div style={styles.warning}>
                <ul>
                    <li>Never pay a client to receive a job.</li>
                    <li>Be cautious of requests for passwords or verification codes.</li>
                    <li>Confirm the scope, deadline and payment terms in writing.</li>
                    <li>Use platform payment protections when available.</li>
                    <li>Be cautious of suspicious links and requests to move payments off-platform.</li>
                </ul>
            </div>
        </main>
    );
}

const styles = {
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
        lineHeight: 1.6
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "18px"
    },
    card: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#fff"
    },
    link: {
        color: "#2563eb",
        fontWeight: "bold"
    },
    services: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        margin: "16px 0 28px"
    },
    badge: {
        backgroundColor: "#eff6ff",
        color: "#1d4ed8",
        padding: "8px 12px",
        borderRadius: "20px"
    },
    checkItem: {
        display: "flex",
        gap: "10px",
        marginBottom: "12px",
        cursor: "pointer"
    },
    template: {
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        fontFamily: "inherit"
    },
    button: {
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer"
    },
    warning: {
        backgroundColor: "#fff7ed",
        border: "1px solid #fed7aa",
        padding: "10px 20px",
        borderRadius: "10px"
    }
};

export default FindClients;