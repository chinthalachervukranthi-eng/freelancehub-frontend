import { useState } from "react";

import Skills from "./Skills";
import Roadmaps from "./Roadmaps";
import FindClients from "./FindClients";
import EarningsGuide from "./EarningsGuide";

import Login from "./Login";
import Register from "./Register";

function App() {
    const [activePage, setActivePage] = useState("Overview");

    // Start with registration
    const [authPage, setAuthPage] = useState("register");

    // Store the currently logged-in user's details
    const [currentUser, setCurrentUser] = useState(null);

    const menuItems = [
        "Overview",
        "Explore Skills",
        "Learning Roadmaps",
        "Find Clients",
        "Earnings Guide",
    ];

    // Handle successful login
    function handleLoginSuccess(user) {
        setCurrentUser(user);
        setActivePage("Overview");
        setAuthPage(null);
    }

    // Handle logout
    function handleLogout() {
        setCurrentUser(null);
        setAuthPage("login");
        setActivePage("Overview");
    }

    // Render dashboard content
    function renderPage() {
        switch (activePage) {
            case "Explore Skills":
                return <Skills />;

            case "Learning Roadmaps":
                return <Roadmaps />;

            case "Find Clients":
                return <FindClients />;

            case "Earnings Guide":
                return <EarningsGuide />;

            default:
                return (
                    <main style={styles.overview}>

                        <h1>
                            Welcome to FreelanceHub
                            {currentUser?.name
                                ? `, ${currentUser.name}`
                                : ""}!
                        </h1>

                        <p>
                            Your guide to learning skills, finding clients,
                            and starting your freelancing journey.
                        </p>

                        <div style={styles.grid}>

                            <div style={styles.card}>
                                <h2>Explore Skills</h2>

                                <p>
                                    Discover skills you can learn and offer
                                    as freelance services.
                                </p>

                                <button
                                    onClick={() =>
                                        setActivePage("Explore Skills")
                                    }
                                    style={styles.button}
                                >
                                    Explore Skills
                                </button>
                            </div>

                            <div style={styles.card}>
                                <h2>Learning Roadmaps</h2>

                                <p>
                                    Follow a step-by-step learning path
                                    for your chosen skill.
                                </p>

                                <button
                                    onClick={() =>
                                        setActivePage("Learning Roadmaps")
                                    }
                                    style={styles.button}
                                >
                                    View Roadmaps
                                </button>
                            </div>

                            <div style={styles.card}>
                                <h2>Find Clients</h2>

                                <p>
                                    Discover freelance platforms and learn
                                    how to approach clients.
                                </p>

                                <button
                                    onClick={() =>
                                        setActivePage("Find Clients")
                                    }
                                    style={styles.button}
                                >
                                    Find Clients
                                </button>
                            </div>

                            <div style={styles.card}>
                                <h2>Earnings Guide</h2>

                                <p>
                                    Estimate project revenue, expenses,
                                    and potential profit.
                                </p>

                                <button
                                    onClick={() =>
                                        setActivePage("Earnings Guide")
                                    }
                                    style={styles.button}
                                >
                                    Calculate Earnings
                                </button>
                            </div>

                        </div>
                    </main>
                );
        }
    }

    // Show registration or login before the dashboard
    if (!currentUser) {
        if (authPage === "login") {
            return (
                <Login
                    onNavigate={setAuthPage}
                    onLoginSuccess={handleLoginSuccess}
                />
            );
        }

        return (
            <Register
                onNavigate={setAuthPage}
            />
        );
    }

    // Main dashboard
    return (
        <div style={styles.app}>

            <header style={styles.header}>

                <h2 style={styles.logo}>
                    FreelanceHub
                </h2>

                <p style={styles.tagline}>
                    Learn Skills. Find Clients. Start Freelancing.
                </p>

                <div style={styles.userBar}>
                    <span>
                        Welcome, {currentUser.name}!
                    </span>

                    <button
                        onClick={handleLogout}
                        style={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>

            </header>

            <nav style={styles.nav}>

                {menuItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActivePage(item)}
                        style={{
                            ...styles.navButton,
                            ...(activePage === item
                                ? styles.activeButton
                                : {}),
                        }}
                    >
                        {item}
                    </button>
                ))}

            </nav>

            {renderPage()}

            <footer style={styles.footer}>
                <p>
                    FreelanceHub — Your freelancing journey starts here.
                </p>
            </footer>

        </div>
    );
}

const styles = {
    app: {
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8fafc",
        color: "#1f2937",
    },

    header: {
        backgroundColor: "#172554",
        color: "white",
        padding: "24px",
        textAlign: "center",
    },

    logo: {
        margin: 0,
        fontSize: "30px",
    },

    tagline: {
        marginBottom: "15px",
    },

    userBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        marginTop: "15px",
    },

    logoutButton: {
        padding: "9px 16px",
        border: "1px solid white",
        borderRadius: "7px",
        backgroundColor: "white",
        color: "#172554",
        cursor: "pointer",
        fontWeight: "bold",
    },

    nav: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "8px",
        padding: "14px",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
    },

    navButton: {
        padding: "10px 14px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#e5e7eb",
        color: "#1f2937",
        cursor: "pointer",
        fontSize: "14px",
    },

    activeButton: {
        backgroundColor: "#2563eb",
        color: "white",
    },

    overview: {
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px 20px",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "20px",
        marginTop: "30px",
    },

    card: {
        padding: "22px",
        borderRadius: "12px",
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
    },

    button: {
        padding: "10px 15px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#2563eb",
        color: "white",
        cursor: "pointer",
    },

    footer: {
        padding: "20px",
        marginTop: "30px",
        textAlign: "center",
        backgroundColor: "#172554",
        color: "white",
    },
};

export default App;