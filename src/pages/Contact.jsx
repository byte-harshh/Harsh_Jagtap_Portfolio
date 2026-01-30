import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function Contact() {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const serviceId = 'service_c87pp4b';
        const templateId = 'template_0tafvos';
        const publicKey = 'Z4KInGP75oIGjFk0w';

        // Using emailjs.send with explicit data object for better reliability
        const formData = new FormData(formRef.current);
        const data = {
            from_email: formData.get('from_email'),
            name: formData.get('name'),
            message: formData.get('message'),
            title: "New Portfolio Inquiry" // Manually adding title to match template
        };

        emailjs.send(serviceId, templateId, data, publicKey)
            .then(() => {
                setLoading(false);
                toast.success("Message sent successfully!");
                formRef.current.reset();
            }, (error) => {
                setLoading(false);
                console.error("EmailJS Error:", error);

                // Better error message
                let errorMessage = "Failed to send message.";
                if (error.status === 412) {
                    errorMessage = "EmailJS keys might be incorrect. Please check Service/Template IDs.";
                } else if (error.text) {
                    errorMessage = "Error: " + error.text;
                }

                toast.error(errorMessage);
            });
    };

    return (
        <motion.section
            id="contact"
            className="mb-5 w-100 text-center container section-padding"
            style={{ maxWidth: "800px" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="text-center mb-5">
                <h2 className="section-title fw-bold mb-4 text-main">Contact Me</h2>
                <p className="lead mt-n3" style={{ color: 'var(--text-muted)' }}>
                    Please contact me directly at{" "}
                    <a className="fw-bold text-decoration-underline" href="mailto:harshjagtap555@gmail.com" style={{ color: 'var(--accent-blue)' }}>
                        harshjagtap555@gmail.com
                    </a>{" "}
                    or through this form.
                </p>
            </div>

            <div className="contact-form-wrapper p-4 p-md-5 border-0 glass-card rounded-4 position-relative overflow-hidden">
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.05))', pointerEvents: 'none' }}></div>

                <form ref={formRef} onSubmit={handleSubmit} className="d-flex flex-column gap-3 mx-auto position-relative z-1" style={{ maxWidth: '600px' }}>
                    <Form.Group controlId="email">
                        <Form.Control
                            type="email"
                            name="from_email"
                            placeholder="Your email"
                            className="h-14 rounded-3 border px-4 transition-all"
                            style={{
                                height: "3.5rem"
                            }}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="h-14 rounded-3 border px-4 transition-all"
                            style={{
                                height: "3.5rem"
                            }}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="message">
                        <Form.Control
                            as="textarea"
                            name="message"
                            placeholder="Your message"
                            className="my-3 rounded-3 border p-4 transition-all"
                            style={{
                                height: "13rem"
                            }}
                            required
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary-custom d-flex align-items-center justify-content-center gap-2 rounded-pill px-5 py-3 transition-all hover-scale mx-auto shadow-lg"
                        style={{
                            border: 'none',
                            fontSize: '1.1rem',
                            fontWeight: '600'
                        }}
                    >
                        {loading ? 'Sending...' : 'Submit Message'}
                        <FaPaperPlane className="fs-6" />
                    </Button>
                </form>
            </div>
        </motion.section>
    );
}
