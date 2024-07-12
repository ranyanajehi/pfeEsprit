// src/CV.js
import React from "react";
import { Container, Box, Typography, Avatar, Grid } from "@mui/material";
import {
  Email,
  Phone,
  GitHub,
  LinkedIn,
  Description,
} from "@mui/icons-material";

const CV = ({ data }) => {
  const { user, education, workHistory, proj, skills } = data;

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Avatar
          alt={user.firstName}
          src={user.studentAvatar}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h4" color="#ff007b" mt={2}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="h6">
          Full-stack JavaScript Developer ∼ Tech Lead
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Email /> <Typography ml={1}>{user.email}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Phone /> <Typography ml={1}>{user.phone}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <GitHub /> <Typography ml={1}>{user.github}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <LinkedIn /> <Typography ml={1}>{user.linkedin}</Typography>
        </Box>
      </Box>

      <Section title="Summary">
        <Typography>{user.about}</Typography>
      </Section>

      <Section title="Skills">
        <Typography variant="h6">Technical Skills</Typography>
        {skills.technicalSkills.map((skill, index) => (
          <Typography key={index}>
            {skill.skill}: {skill.level}
          </Typography>
        ))}
        <Typography variant="h6" mt={2}>
          Soft Skills
        </Typography>
        {skills.softSkills.map((skill, index) => (
          <Typography key={index}>{skill.skill}</Typography>
        ))}
        <Typography variant="h6" mt={2}>
          Languages
        </Typography>
        {skills.languages.map((lang, index) => (
          <Typography key={index}>
            {lang.language}: {lang.proficiency}
          </Typography>
        ))}
      </Section>

      <Section title="Projects">
        {proj.map((project, index) => (
          <Box key={index} my={2}>
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
          <Box key={index} my={2}>
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
          <Box key={index} my={2}>
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
    </Container>
  );
};

const Section = ({ title, children }) => (
  <Box my={4}>
    <Typography variant="h5" color="#ff007b">
      {title}
    </Typography>
    <Box mt={2}>{children}</Box>
  </Box>
);

export default CV;
