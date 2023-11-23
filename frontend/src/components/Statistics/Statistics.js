// Statistics.js
import React, { useEffect, useRef } from 'react';
import styles from './Statistics.module.css'; // Adjust the path as necessary

function Statistics() {
    const refStatistics = useRef(null);

    // fade-in for the stat items
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const statItems = refStatistics.current.children;
                        for (let i = 0; i < statItems.length; i++) {
                            if (statItems[i].classList.contains(styles.statItem)) {
                                setTimeout(() => {
                                    statItems[i].classList.add(styles.statItemVisible);
                                }, i * 300);
                            }
                        }
                    }
                });
            },
            { threshold: 0.4 }
        );
    
        if (refStatistics.current) {
            observer.observe(refStatistics.current);
        }
    
        return () => {
            if (refStatistics.current) {
                observer.unobserve(refStatistics.current);
            }
        };
    }, []);

    return (
        <div className={styles.statistics} ref={refStatistics}>
            <div className={styles.topLine}></div> {/* This is the top horizontal line */}

            <div className={styles.statItem}>
                <div className={styles.number}>1720+</div>
                <div className={styles.description}>Photos Taken</div>
            </div>

            <div className={styles.statItem}>
                <div className={styles.number}>23.5k</div>
                <div className={styles.description}>Editing Hours</div>
            </div>
            <div className={styles.horizLineContainer}>
                <div className={styles.horizontalLine}></div>
            </div>
            
            <div className={styles.statItem}>
                <div className={styles.number}>130x</div>
                <div className={styles.description}>Company Growth</div>
            </div>
            
            <div className={styles.statItem}>
                <div className={styles.number}>100%</div>
                <div className={styles.description}>Client Satisfaction</div>
            </div>
            
            <div className={styles.bottomLine}></div> {/* This is the bottom horizontal line */}
        </div>
    );
}

export default Statistics;
