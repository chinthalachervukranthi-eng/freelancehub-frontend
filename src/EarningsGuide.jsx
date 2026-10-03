import { useState } from "react";

function EarningsGuide() {
    const [pricingType, setPricingType] = useState("fixed");
    const [hours, setHours] = useState(20);
    const [hourlyRate, setHourlyRate] = useState(500);
    const [fixedPrice, setFixedPrice] = useState(10000);
    const [expenses, setExpenses] = useState(1000);
    const [projects, setProjects] = useState(2);

    const revenue =
        pricingType === "hourly"
            ? Number(hours) * Number(hourlyRate)
            : Number(fixedPrice);

    const totalRevenue = revenue * Number(projects);
    const totalExpenses = Number(expenses) * Number(projects);
    const estimatedProfit = totalRevenue - totalExpenses;

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount);

    return (
        <main style={styles.container}>
            <h1>Freelance Earnings Guide</h1>

            <p>
                Learn how to estimate project prices, account for expenses,
                and plan your freelance income.
            </p>

            <section style={styles.card}>
                <h2>1. Choose your pricing method</h2>

                <label style={styles.label}>
                    <input
                        type="radio"
                        value="fixed"
                        checked={pricingType === "fixed"}
                        onChange={() => setPricingType("fixed")}
                    />
                    Fixed-price project
                </label>

                <label style={styles.label}>
                    <input
                        type="radio"
                        value="hourly"
                        checked={pricingType === "hourly"}
                        onChange={() => setPricingType("hourly")}
                    />
                    Hourly pricing
                </label>

                {pricingType === "hourly" ? (
                    <>
                        <label style={styles.inputLabel}>
                            Hours per project
                            <input
                                type="number"
                                min="0"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                style={styles.input}
                            />
                        </label>

                        <label style={styles.inputLabel}>
                            Rate per hour (₹)
                            <input
                                type="number"
                                min="0"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                style={styles.input}
                            />
                        </label>
                    </>
                ) : (
                    <label style={styles.inputLabel}>
                        Price per project (₹)
                        <input
                            type="number"
                            min="0"
                            value={fixedPrice}
                            onChange={(e) => setFixedPrice(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                )}

                <label style={styles.inputLabel}>
                    Number of projects
                    <input
                        type="number"
                        min="0"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                        style={styles.input}
                    />
                </label>

                <label style={styles.inputLabel}>
                    Expenses per project (₹)
                    <input
                        type="number"
                        min="0"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                        style={styles.input}
                    />
                </label>
            </section>

            <section style={styles.results}>
                <h2>2. Your estimated earnings</h2>

                <div style={styles.resultCard}>
                    <p>Revenue per project</p>
                    <h3>{formatCurrency(revenue)}</h3>
                </div>

                <div style={styles.resultCard}>
                    <p>Total revenue</p>
                    <h3>{formatCurrency(totalRevenue)}</h3>
                </div>

                <div style={styles.resultCard}>
                    <p>Total project expenses</p>
                    <h3>{formatCurrency(totalExpenses)}</h3>
                </div>

                <div style={styles.profitCard}>
                    <p>Estimated profit before tax</p>
                    <h3>{formatCurrency(estimatedProfit)}</h3>
                </div>
            </section>

            <section style={styles.card}>
                <h2>3. Tips for pricing your work</h2>

                <ul>
                    <li>Understand the client's requirements before quoting.</li>
                    <li>Estimate the time needed to complete the project.</li>
                    <li>Include revisions, tools, and other project expenses.</li>
                    <li>Define the deliverables and deadlines in writing.</li>
                    <li>Discuss payment milestones for larger projects.</li>
                    <li>Review your pricing as your experience grows.</li>
                </ul>
            </section>

            <p style={styles.note}>
                Note: These figures are estimates, not guaranteed earnings.
                They exclude taxes and other costs not entered above.
                Actual income depends on finding clients, completing projects,
                and receiving payment.
            </p>
        </main>
    );
}

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
        lineHeight: 1.6
    },
    card: {
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "24px",
        margin: "24px 0",
        backgroundColor: "#fff"
    },
    label: {
        display: "block",
        margin: "14px 0",
        cursor: "pointer"
    },
    inputLabel: {
        display: "block",
        marginTop: "18px",
        fontWeight: "bold"
    },
    input: {
        display: "block",
        width: "100%",
        maxWidth: "400px",
        padding: "10px",
        marginTop: "6px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box",
        fontSize: "16px"
    },
    results: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        margin: "24px 0"
    },
    resultCard: {
        padding: "18px",
        backgroundColor: "#eff6ff",
        borderRadius: "10px"
    },
    profitCard: {
        padding: "18px",
        backgroundColor: "#dcfce7",
        borderRadius: "10px"
    },
    note: {
        fontSize: "14px",
        color: "#6b7280"
    }
};

export default EarningsGuide;