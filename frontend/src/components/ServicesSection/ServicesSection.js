import React, { useEffect, useRef } from 'react';
import styles from './ServicesSection.module.css';

function ServicesSection() {
    const refServices = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const serviceItems = refServices.current.children;
                        for (let i = 0; i < serviceItems.length; i++) {
                            setTimeout(() => {
                                serviceItems[i].classList.add(styles.serviceItemVisible);
                            }, i * 100);
                        }
                    }
                });
            },
            { threshold: 0.1 }
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
        <div className={styles.services} ref={refServices}>
            {/* Render your service items here */}
            <div className={`${styles.serviceItem}`}>Service 1</div>
            <div className={`${styles.serviceItem}`}>Service 2</div>
            {/* ... other items */}
        </div>
    );
}

export default ServicesSection;
