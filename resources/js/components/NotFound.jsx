import React from "react";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <a href="/" className="not-found-link">
                    Go back to the homepage
                </a>
            </div>
        </div>
    );
};

export default NotFound;
