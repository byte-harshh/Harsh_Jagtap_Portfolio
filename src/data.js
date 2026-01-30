import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaLink, FaDatabase, FaWifi } from "react-icons/fa";
import { SiCplusplus, SiMysql, SiSpringboot, SiMongodb, SiCsharp, SiDotnet, SiOracle } from "react-icons/si";

export const links = [
    { name: "Home", hash: "#home" },
    { name: "About", hash: "#about" },
    { name: "Education", hash: "#education" },
    { name: "Certifications", hash: "#certifications" },
    { name: "Projects", hash: "#projects" },
    { name: "Skills", hash: "#skills" },
    { name: "Experience", hash: "#experience" },
    { name: "Volunteer", hash: "#volunteer" },
    { name: "Contact", hash: "#contact" },
];

export const volunteerData = [
    {
        role: "Social Worker / Intern",
        organization: "Anmol Foundation NGO",
        date: "09 Jan 2024 - 25 Jan 2024",
        description: "As a craftsperson, I had the incredible opportunity to create tactile crafts tailored for blind students under project 'SAMARPAN'. Teaching them how to craft with their own hands was truly fulfilling. Grateful for the chance to make a positive impact!"
    },
    {
        role: "Technical Team Member",
        organization: "AI ODYSSEY'24 (G.H. Raisoni College)",
        date: "April 5-6, 2024",
        description: "Volunteered as a technical team member for AI Odyssey'24 event. Contributed to developing 'Scan & Hunt' game, designed posters, and tackled various tech tasks. Valuable experience in teamwork, problem-solving, and project management."
    },
    {
        role: "Scout",
        organization: "The Bharat Scouts and Guides",
        date: "Jan 2014 - Jan 2017",
        description: "I was a Scout in Bharat Scouts And Guides at Z.P. High School Gadchiroli, where I learned teamwork, leadership, and community service skills. I took part in projects that helped me grow personally and contribute to the community, teaching me the value of service and responsibility."
    }
];

export const experiencesData = [
    {
        title: "Intern",
        company: "PhoenixZone Technologies Pvt. Ltd. Pune",
        location: "Pune, Maharashtra, India",
        description:
            "During my internship at PhoenixZone Technologies Pvt. Ltd., Pune, I worked on a project titled 'IoT-Enhanced Estrus Detection in Dairy Cattle Using Machine Learning.' The company specializes in web development, Android development, IoT, and PHP technologies. My role involved designing and developing an IoT-based system to monitor cattle health and detect estrus cycles. We used sensors like accelerometers, temperature sensors, GPS, and RFID integrated with an ESP32 microcontroller. The data was processed using machine learning models such as Random Forest and Gradient Boosting and stored in Google Firebase. The project also included creating a user-friendly web application for real-time monitoring, helping farmers improve cattle management and productivity.",
        skills: ["IoT", "Google Firebase", "Teamwork", "Team Leadership"],
        iconClass: "bi bi-briefcase-fill",
        date: "15 Jun, 2024 - 17 Dec, 2024",
    },
];

export const educationData = [
    {
        institution: "Centre for Development of Advanced Computing (C-DAC)",
        degree: "PGDAC, Computer Science",
        date: "August 2025 - February 2026",
        description: "Post Graduate Diploma in Advanced Computing",
        location: "Hyderabad"
    },
    {
        institution: "G.H. Raisoni College of Engineering (GHRCE), Nagpur",
        degree: "Bachelor of Technology - BTech, Computer Science and Engineering (IoT)",
        date: "June 2021 - June 2025",
        description: "Specialization in IoT",
        location: "Nagpur"
    },
    {
        institution: "Mohsinbhai Zaweri Jr. College Desaiganj (Wadsa) Gadchiroli",
        degree: "HSC",
        date: "February 2020",
        description: "Higher Secondary Certificate",
        location: "Gadchiroli"
    },
    {
        institution: "Z.P. High School Gadchiroli",
        degree: "SSC",
        date: "March 2018",
        description: "Secondary School Certificate",
        location: "Gadchiroli"
    }
];

export const projectsData = [
    {
        title: "IoT-Enhanced Estrus Detection",
        description:
            "An IoT-based smart collar using sensors (accelerometer, temperature, GPS, RFID, battery) and ESP32 to monitor cow activity and health in real time. Data is sent to Firebase, and an ML model detects heat cycles to improve breeding timing and boost milk production.",
        tags: ["IoT", "Machine Learning", "ESP32", "Firebase", "C++", "Python"],
        imageUrl: "/CattleTracker.png",
        githubLink: "https://github.com/byte-harshh/Cattle-Tracker-Project",
        demoLink: "",
        link: "https://github.com/byte-harshh/Cattle-Tracker-Project"
    },
    {
        title: "Expense Tracker",
        description:
            "A simple React-based Expense Tracker with three sections: Expenses, Borrowed, and Lent. Users can record daily expenses, track money borrowed from others, and monitor amounts lent. Designed to help maintain clear and organized personal financial records.",
        tags: ["React", "JavaScript", "CSS"],
        imageUrl: "/ExpenseTracker.png",
        githubLink: "https://github.com/byte-harshh/Expense_Tracker",
        demoLink: "https://expense-tracker-chi-three-23.vercel.app/",
        link: "https://expense-tracker-chi-three-23.vercel.app/"
    },
    {
        title: "CDAC Alumni Management Portal",
        description:
            "A full-stack web application developed using Java, Spring Boot, Spring Security, JWT, MySQL, Hibernate/JPA, React.js, and Ant Design to manage alumni and student engagement through a centralized platform.",
        tags: ["Java", "Spring Boot", "React.js", "MySQL", "Hibernate", "JWT"],
        imageUrl: "/Alumni Portal.png",
        githubLink: "https://github.com/byte-harshh/CDAC-Alumni-Management-Engagement-Portal",
        demoLink: "",
        link: "https://github.com/byte-harshh/CDAC-Alumni-Management-Engagement-Portal"
    },
    {
        title: "Intelligent Vehicle Diagnostic Terminal",
        description:
            "Built with C# .NET 8, WPF, and MVVM, designed to simulate real-time vehicle telemetry, fault diagnostics, and an embedded AI-style assistant using Semantic Kernel.",
        tags: ["C#", ".NET 8", "WPF", "MVVM", "AI", "Semantic Kernel"],
        imageUrl: "/VehicleDisgnsysTerminal.png",
        githubLink: "https://github.com/byte-harshh/VehicleDiagnosticTerminal",
        demoLink: "",
        link: "https://github.com/byte-harshh/VehicleDiagnosticTerminal"
    },
    {
        title: "PAN Card Data Validation",
        description:
            "Cleaning and Validating a dataset containing the Permanent Account Numbers PAN of Indian nationals. The goal is to ensure that each PAN number adheres to the official format and is categorised as either Valid or Invalid.",
        tags: ["MySQL", "SQL", "Data Validation"],
        imageUrl: "/PAN Validation.png",
        githubLink: "https://github.com/byte-harshh/PAN-Card-Data-Validation-using-MySQL",
        demoLink: "",
        link: "https://github.com/byte-harshh/PAN-Card-Data-Validation-using-MySQL"
    }
];

export const certificationsData = [
    {
        title: "C Programming",
        description: "Issued by Great Learning",
        link: "https://www.mygreatlearning.com/certificate/MMUNOWCQ"
    },
    {
        title: "C++ Essentials 1",
        description: "Issued by Cisco",
        link: "https://www.credly.com/badges/47e27bf0-4b3d-4103-a89a-f6a0059523c4/linked_in_profile"
    },
    {
        title: "JavaScript Essentials 1",
        description: "Issued by Cisco",
        link: "https://www.credly.com/badges/a1d56634-602a-40fd-9e97-d27d5bc2cfc2/linked_in_profile"
    },
    {
        title: "Mastering Java + Spring Boot: REST APIs and Microservices",
        description: "Issued by Udemy",
        link: "https://udemy-certificate.s3.amazonaws.com/image/UC-20bd6808-0b30-4493-b3be-46cdc2488232.jpg?v=1763056668000"
    },
    {
        title: "Introduction to Modern AI",
        description: "Issued by Cisco",
        link: "https://www.credly.com/badges/7658d5c7-bb37-4fa1-822e-f96a099cd3c9/linked_in_profile"
    },
    {
        title: "Introduction to Blockchain on Azure",
        description: "Issued by Microsoft",
        link: "https://learn.microsoft.com/en-us/users/harshjagtap01/achievements/ptzwcg34?ref=https%3A%2F%2Fwww.linkedin.com%2F"
    },
    {
        title: "Artificial Intelligence Primer",
        description: "Issued by Infosys Springboard",
        link: "/Artificial Intelligence Primer Certification.pdf"
    },
    {
        title: "Learn how to use Solidity",
        description: "Issued by Microsoft",
        link: "https://learn.microsoft.com/en-us/users/harshjagtap01/achievements/blmx3xkd?ref=https%3A%2F%2Fwww.linkedin.com%2F"
    },
    {
        title: "Introduction to Generative AI",
        description: "Google Cloud Skills Boost",
        link: "https://www.skills.google/public_profiles/84b143db-3bfe-450d-bd4b-9524bbf64d6a/badges/8104291?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
    }
];

export const skillsData = [
    { name: "Java", icon: FaJava, color: "#f89820" },
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "IoT Dev", icon: FaWifi, color: "#32CD32" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "PLSQL", icon: FaDatabase, color: "#D2691E" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "HTML", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "C#", icon: SiCsharp, color: "#239120" },
    { name: ".NET", icon: SiDotnet, color: "#512BD4" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "Blockchain", icon: FaLink, color: "#F7931A" }
];
