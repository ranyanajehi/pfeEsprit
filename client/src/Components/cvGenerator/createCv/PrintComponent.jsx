import React, { forwardRef } from "react";
import "./CreateCv.css";

const PrintComponent = forwardRef(({ data, binaryImg }, ref) => {
  const { user, education, workHistory, proj, skills } = data;

  const styles = {
    resume: {
      fontFamily: "'Montserrat', sans-serif",
      color: "#333",
      maxWidth: "900px",
      margin: "2rem auto",
      background: "#fff",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      borderRadius: "8px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #eee",
      paddingBottom: "1rem",
      marginBottom: "1rem",
    },
    headerImg: {
      borderRadius: "50%",
      width: "150px",
      height: "150px",
      objectFit: "cover",
      marginRight: "2rem",
    },
    info: {
      flex: 1,
    },
    h1: {
      margin: 0,
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#0073e6",
    },
    h2: {
      margin: 0,
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#777",
    },
    contacts: {
      marginTop: "1rem",
    },
    contactSpan: {
      display: "inline-block",
      marginRight: "1rem",
      color: "#333",
    },
    section: {
      marginBottom: "2rem",
    },
    sectionH3: {
      fontSize: "1.8rem",
      marginBottom: "1rem",
      borderBottom: "2px solid #0073e6",
      display: "inline-block",
      color: "#0073e6",
    },
    item: {
      marginBottom: "1rem",
    },
    itemH4: {
      margin: 0,
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "#333",
    },
    itemP: {
      margin: "0.5rem 0 0 0",
      color: "#555",
    },
    skill: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0.5rem 0",
    },
    skillSpan: {
      fontWeight: 700,
    },
  };

  const emailIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0073e6" class="bi bi-envelope-fill" viewBox="0 0 16 16">
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.793L0 4.697zM6.761 8.83l-6.761 4.432A2 2 0 0 0 2 14h12a2 2 0 0 0 1.999-1.738l-6.761-4.432L8 9.586l-1.239-.756zM16 4.697l-5.803 3.311L16 11.801V4.697z"/>
    </svg>`;
  const phoneIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0073e6" class="bi bi-telephone-fill" viewBox="0 0 16 16">
      <path d="M3.654 1.328a.678.678 0 0 1 1.017.177l2.123 3.18a.678.678 0 0 1-.161.927l-1.513 1.012a11.42 11.42 0 0 0 5.184 5.184l1.012-1.513a.678.678 0 0 1 .927-.161l3.18 2.123a.678.678 0 0 1 .177 1.017l-2.197 2.197a1.745 1.745 0 0 1-1.998.355C8.885 15.477 4.522 11.114 1.146 3.82a1.745 1.745 0 0 1 .355-1.998L3.654 1.328z"/>
    </svg>`;
  const githubIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0073e6" class="bi bi-github" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.09.58 1.24.82.72 1.2 1.87.85 2.33.65.07-.52.28-.85.51-1.05-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.64 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.003 8.003 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>`;
  const linkedinIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0073e6" class="bi bi-linkedin" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.487 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.513 16 0 15.487 0 14.854V1.146zM4.943 6.937H3.071V13h1.872V6.937zM4.007 5.797c.606 0 .98-.412.98-.93-.011-.527-.373-.93-.966-.93-.594 0-.98.403-.98.93 0 .518.373.93.953.93h.013zM6.912 6.937H5.04V13h1.872V9.359c0-.976.347-1.642 1.212-1.642.66 0 1.053.444 1.228.874.063.154.079.368.079.583V13h1.872V9.31c0-2.233-1.188-3.271-2.772-3.271-1.278 0-1.844.7-2.159 1.193h.013V6.937z"/>
    </svg>`;

  return (
    <div ref={ref} id="resume" style={styles.resume}>
      <div className="header" style={styles.header}>
        <img
          src={binaryImg}
          alt={`${user.firstName} ${user.lastName}`}
          style={styles.headerImg}
        />
        <div className="info" style={styles.info}>
          <h1 style={styles.h1}>
            {user.firstName} {user.lastName}
          </h1>
          <h2 style={styles.h2}>{user.role}</h2>
          <div className="contacts" style={styles.contacts}>
            <span
              style={styles.contactSpan}
              dangerouslySetInnerHTML={{ __html: emailIcon }}
            ></span>
            <span style={styles.contactSpan}>{user.email}</span>
            <span
              style={styles.contactSpan}
              dangerouslySetInnerHTML={{ __html: phoneIcon }}
            ></span>
            <span style={styles.contactSpan}>{user.phone}</span>
            <span
              style={styles.contactSpan}
              dangerouslySetInnerHTML={{ __html: githubIcon }}
            ></span>
            <span style={styles.contactSpan}>
              <a href={user.github}>{user.github}</a>
            </span>
            <span
              style={styles.contactSpan}
              dangerouslySetInnerHTML={{ __html: linkedinIcon }}
            ></span>
            <span style={styles.contactSpan}>
              <a href={user.linkedin}>{user.linkedin}</a>
            </span>
          </div>
          <p>{user.about}</p>
        </div>
      </div>

      <div className="section" style={styles.section}>
        <h3 style={styles.sectionH3}>Education</h3>
        {education.map((edu, index) => (
          <div className="item" style={styles.item} key={index}>
            <h4 style={styles.itemH4}>
              {edu.degree} - {edu.college}
            </h4>
            <p style={styles.itemP}>
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      <div className="section" style={styles.section}>
        <h3 style={styles.sectionH3}>Work History</h3>
        {workHistory.map((work, index) => (
          <div className="item" style={styles.item} key={index}>
            <h4 style={styles.itemH4}>
              {work.position} at {work.company}
            </h4>
            <p style={styles.itemP}>
              {work.startDate} - {work.endDate}
            </p>
            <p style={styles.itemP}>{work.description}</p>
          </div>
        ))}
      </div>

      <div className="section" style={styles.section}>
        <h3 style={styles.sectionH3}>Projects</h3>
        {proj.map((project, index) => (
          <div className="item" style={styles.item} key={index}>
            <h4 style={styles.itemH4}>{project.name}</h4>
            <p style={styles.itemP}>
              <a href={project.githubLink}>{project.githubLink}</a>
            </p>
            <p style={styles.itemP}>{project.description}</p>
            <p style={styles.itemP}>
              <strong>Tech Stack:</strong>
            </p>
            <ul>
              {Object.entries(project.techStack).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section skills" style={styles.section}>
        <h3 style={styles.sectionH3}>Skills</h3>
        <div>
          <h4 style={styles.itemH4}>Technical Skills</h4>
          {skills.technicalSkills.map((skill, index) => (
            <div className="skill" style={styles.skill} key={index}>
              <span style={styles.skillSpan}>{skill.skill}</span>
              <span style={styles.skillSpan}>{skill.level}</span>
            </div>
          ))}
        </div>
        <div>
          <h4 style={styles.itemH4}>Soft Skills</h4>
          {skills.softSkills.map((skill, index) => (
            <div className="skill" style={styles.skill} key={index}>
              <span style={styles.skillSpan}>{skill.skill}</span>
            </div>
          ))}
        </div>
        <div>
          <h4 style={styles.itemH4}>Languages</h4>
          {skills.languages.map((language, index) => (
            <div className="skill" style={styles.skill} key={index}>
              <span style={styles.skillSpan}>{language.language}</span>
              <span style={styles.skillSpan}>{language.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PrintComponent;
