import { useState } from "react";
import { registerUser } from "./services/authService";

function Register({ onNavigate }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle changes in form fields
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    // Handle registration
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");

        const name = formData.name.trim();
        const email = formData.email.trim();

        // Validate fields
        if (!name || !email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (formData.password.length > 72) {
            setError("Password cannot exceed 72 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const result = await registerUser({
                name: name,
                email: email,
                password: formData.password,
            });

            setMessage(
                result.message || "Registration successful!"
            );

            // Clear the form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // Redirect to login after showing success
            setTimeout(() => {
                onNavigate("login");
            }, 1500);

        } catch (err) {
            setError(
                err.message || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1>Join FreelanceHub</h1>

                <p className="auth-subtitle">
                    Learn Skills. Find Clients. Start Freelancing.
                </p>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="register-name">
                        Full Name
                    </label>

                    <input
                        id="register-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="register-email">
                        Email Address
                    </label>

                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={150}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="register-password">
                        Password
                    </label>

                    <input
                        id="register-password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        maxLength={72}
                        autoComplete="new-password"
                        required
                    />

                    <label htmlFor="register-confirm-password">
                        Confirm Password
                    </label>

                    <input
                        id="register-confirm-password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength={8}
                        maxLength={72}
                        autoComplete="new-password"
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

                    {message && (
                        <div
                            className="auth-success"
                            role="status"
                        >
                            {message}
                            <br />
                            Redirecting to login...
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || Boolean(message)}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{" "}

                    <button
                        type="button"
                        className="auth-link"
                        onClick={() => onNavigate("login")}
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;