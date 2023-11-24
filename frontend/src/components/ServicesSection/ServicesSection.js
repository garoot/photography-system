import React, { useEffect, useRef } from 'react';
import styles from './ServicesSection.module.css';
import Portfolio from '../Portfolio/Portfolio';
import Statistics from '../Statistics/Statistics';

function ServicesSection() {
    const refServices = useRef(null);
    const refStatistics = useRef(null);

    // fade-in for the Services Items
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const serviceItems = refServices.current.children;
                        for (let i = 0; i < serviceItems.length; i++) {
                            setTimeout(() => {
                                serviceItems[i].classList.add(styles.serviceItemVisible);
                            }, i * 400);
                        }
                    }
                });
            },
            { threshold: 0.4 }
        );

        if (refServices.current) {
            observer.observe(refServices.current);
        }

        return () => {
            if (refServices.current) {
                observer.unobserve(refServices.current);
            }
        };
    }, []);
    
    return (
        
        <>
            <div className={styles.services}>
                <div className={styles.intro}>
                    <h1>Life is about creating experiences</h1>
                    <p>Lorem ipsum, dolor sit amorum magnam desovident suscipit soluta fugiat incidunt vel, maxime magnam sit mollitia cumque sequi cum? Nisi maiores optio est, enim molestias labore ipsam.</p>
                </div>

                <div className={styles.servicesContainer} ref={refServices}>
                    <div className={`${styles.serviceItem}`}>
                        <img src="/photo-sessions.svg" alt="Photo Sessions" />
                        Photo Sessions 
                    </div>
                    <div className={`${styles.serviceItem}`}>
                        <img src="/photo-editing.svg" alt="Professional Editing" />
                        Photo Editing
                    </div>
                    <div className={`${styles.serviceItem}`}>
                        <img src="/video-recording.svg" alt="Video Recording" />
                        Video Recording
                    </div>
                    <div className={`${styles.serviceItem}`}>
                        <img src="/video-editing.svg" alt="Video Editing" />
                        Video Editing
                    </div>
                    <div className={`${styles.serviceItem}`}>
                        <img src="/full-quality.svg" alt="Full Quality" />
                        Full Quality 
                    </div>
                </div>
                <Portfolio />
                <Statistics />

                {/* Packages */}
                
            </div>
        </>
        
    );
}

export default ServicesSection;
