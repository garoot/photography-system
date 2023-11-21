import React from 'react';
import './Portfolio.css'; // Your CSS file for styling

const works = [
    {
        title: "Adam And Eve Wedding",
        category: "Events",
        imageUrl: "path-to-wedding-image.jpg",
        // Add any additional details you might need, like description, date, etc.
    },
    {
        title: "Mercedes Benz AMG 65",
        category: "Commercial",
        imageUrl: "path-to-mercedes-image.jpg",
    },
  // ... other works
];

const Portfolio = () => {
    return (
        <div className="portfolio">
        <h2>Featured Works</h2>
        <div className="works-grid">
            {works.map((work, index) => (
            <div key={index} className="work-item">
                <img src={work.imageUrl} alt={work.title} />
                <div className="work-info">
                <h3>{work.title}</h3>
                <p>{work.category}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Portfolio;
