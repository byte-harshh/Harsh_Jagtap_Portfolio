
import React from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "react-bootstrap";

export const HoverEffect = ({ items, className }) => {
    return (
        <div className={`row ${className || ""}`}>
            {items.map((item, idx) => (
                <div
                    key={item?.link || idx}
                    className="col-12 col-md-6 col-lg-4 mb-4 position-relative"
                >
                    <motion.div
                        className="h-100 position-relative"
                        style={{ zIndex: 1 }}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 50 },
                            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                        }}
                    >
                        <Card className="custom-card education-card h-100 d-flex flex-column overflow-hidden text-start">
                            {/* Image Section if available */}
                            {item.imageUrl && (
                                <div className="position-relative overflow-hidden" style={{ height: '160px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>
                            )}

                            <Card.Body className="p-3 d-flex flex-column">
                                <Card.Title className="fw-bold mb-2 text-main">{item.title}</Card.Title>
                                <Card.Text className="text-muted small mb-3 flex-grow-1" style={{ textAlign: 'justify' }}>
                                    {item.description}
                                </Card.Text>

                                <div className="mt-auto">
                                    {item.tags && (
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            {item.tags.map((tag, i) => (
                                                <Badge className="border fw-normal" key={i} style={{ backgroundColor: 'var(--glass-border)', color: 'var(--text-main)', fontWeight: '400' }}>
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    <div className="d-flex align-items-center w-100 px-2">
                                        {item.githubLink && (
                                            <a
                                                href={item.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-icon-circle shadow-sm text-decoration-none"
                                                title="View Code"
                                            >
                                                <i className="bi bi-github fs-5"></i>
                                            </a>
                                        )}
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="social-icon-circle shadow-sm text-decoration-none ms-auto"
                                                title="Live Demo"
                                            >
                                                <i className="bi bi-box-arrow-up-right fs-5"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};
