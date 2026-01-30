import React from 'react';
import { skillsData } from '../data';

const TechMarquee = () => {
    // Duplicate the list to ensure seamless looping
    const marqueeSkills = [...skillsData, ...skillsData];

    return (
        <div className="tech-marquee-container mt-5 overflow-hidden position-relative w-100" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="d-flex align-items-center gap-5 animate-marquee">
                {marqueeSkills.map((skill, index) => (
                    <div key={index} className="d-flex flex-column align-items-center flex-shrink-0">
                        <skill.icon size={40} className="mb-2 transition-colors" style={{ color: skill.color }} />
                        <span className="small fw-medium text-muted" style={{ fontSize: '0.8rem' }}>{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;
