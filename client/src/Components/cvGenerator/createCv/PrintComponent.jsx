// src/PrintComponent.jsx
import React, { forwardRef } from "react";
import { Container, Box, Typography, Avatar } from "@mui/material";
import { Email, Phone, GitHub, LinkedIn } from "@mui/icons-material";
import "./CreateCv.css";

const PrintComponent = forwardRef(({ data }, ref) => {
  const { user, education, workHistory, proj, skills } = data;

  return (
    <div ref={ref} className="cv-container">
      <Container>
        <Box textAlign="center" my={4}>
          <Avatar
            alt={user.firstName}
            src={user.studentAvatar}
            sx={{ width: 100, height: 100, margin: "auto" }}
          />
          <Typography className="cv-title" variant="h4" mt={2}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h6">
            Full-stack JavaScript Developer ∼ Tech Lead
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="contact-info"
          >
            <Email className="icon" />{" "}
            <Typography ml={1}>{user.email}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="contact-info"
          >
            <Phone className="icon" />{" "}
            <Typography ml={1}>{user.phone}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="contact-info"
          >
            <GitHub className="icon" />{" "}
            <Typography ml={1}>{user.github}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="contact-info"
          >
            <LinkedIn className="icon" />{" "}
            <Typography ml={1}>{user.linkedin}</Typography>
          </Box>
        </Box>

        <Section title="Summary">
          <Typography>{user.about}</Typography>
        </Section>

        <Section title="Skills">
          <Box className="skills-list">
            <Typography className="sub-section-title">
              Technical Skills
            </Typography>
            {skills.technicalSkills.map((skill, index) => (
              <Typography key={index}>
                {skill.skill}: {skill.level}
              </Typography>
            ))}
            <Typography className="sub-section-title">Soft Skills</Typography>
            {skills.softSkills.map((skill, index) => (
              <Typography key={index}>{skill.skill}</Typography>
            ))}
            <Typography className="sub-section-title">Languages</Typography>
            {skills.languages.map((lang, index) => (
              <Typography key={index}>
                {lang.language}: {lang.proficiency}
              </Typography>
            ))}
          </Box>
        </Section>

        <Section title="Projects">
          {proj.map((project, index) => (
            <Box key={index} my={2} className="project-list">
              <Typography variant="h6">{project.name}</Typography>
              <Typography>{project.githubLink}</Typography>
              <Typography>{project.techStack.languages.join(", ")}</Typography>
              <Typography>{project.techStack.frontend.join(", ")}</Typography>
              <Typography>{project.techStack.backend.join(", ")}</Typography>
              <Typography>{project.techStack.database.join(", ")}</Typography>
              <Typography>{project.techStack.cloud.join(", ")}</Typography>
            </Box>
          ))}
        </Section>

        <Section title="Education">
          {education.map((edu, index) => (
            <Box key={index} my={2} className="education-list">
              <Typography variant="h6">{edu.degree}</Typography>
              <Typography>{edu.college}</Typography>
              <Typography>{edu.level}</Typography>
              <Typography>
                {edu.startDate} - {edu.stillEnrolled ? "Present" : edu.endDate}
              </Typography>
            </Box>
          ))}
        </Section>

        <Section title="Work History">
          {workHistory.map((work, index) => (
            <Box key={index} my={2} className="experience-list">
              <Typography variant="h6">
                {work.position} at {work.company}
              </Typography>
              <Typography>
                {work.startDate} - {work.isCurrent ? "Present" : work.endDate}
              </Typography>
              <Typography>{work.employmentType}</Typography>
            </Box>
          ))}
        </Section>

        <Section title="Languages">
          <Box className="language-list">
            {skills.languages.map((lang, index) => (
              <Typography key={index}>
                {lang.language}: {lang.proficiency}
              </Typography>
            ))}
          </Box>
        </Section>
      </Container>
    </div>
  );
});

const Section = ({ title, children }) => (
  <Box my={4}>
    <Typography className="section-title" variant="h5">
      {title}
    </Typography>
    <Box mt={2} className="section-content">
      {children}
    </Box>
  </Box>
);

export default PrintComponent;
