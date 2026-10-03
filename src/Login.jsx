import { useState } from "react";
import { loginUser } from "./services/authService";

function Login({ onNavigate, onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Update form fields
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    // Submit login form
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        const email = formData.email.trim();
        const password = formData.password;

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const result = await loginUser({
                email,
                password,
            });

            if (typeof onLoginSuccess === "function") {
                onLoginSuccess(result);
            } else {
                setError(
                    "Login succeeded, but dashboard navigation is not configured."
                );
            }
        } catch (err) {
            setError(
                err.message || "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back!</h1>

                <p className="auth-subtitle">
                    Log in to continue your FreelanceHub journey.
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="login-email">
                        Email Address
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={150}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />

                    {error && (
                        <div
                            className="auth-error"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging In..."
                            : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        className="auth-link"
                        onClick={() => onNavigate("register")}
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;