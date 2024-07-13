import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box, Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faGraduationCap,
  faBriefcase,
  faProjectDiagram,
  faCogs,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const StudentPreview = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSections", {
          withCredentials: true,
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!studentData) {
    return <Typography>No data available</Typography>;
  }

  const { user, education, workHistory, proj, skills } = studentData;

  return (
    <Container>
      <Box mb={4}>
        <Avatar
          src={user.studentAvatar}
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h4" color="#ff007b" mt={2}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          {user.about}
        </Typography>
        <Box display="flex" mt={2}>
          <a href={`mailto:${user.email}`} style={{ margin: "0 10px" }}>
            <FontAwesomeIcon icon={faEnvelope} color="#ff007b" size="lg" />
          </a>
          <a href={`tel:${user.phone}`} style={{ margin: "0 10px" }}>
            <FontAwesomeIcon icon={faPhone} color="#ff007b" size="lg" />
          </a>
          <a href={user.linkedin} style={{ margin: "0 10px" }}>
            <FontAwesomeIcon icon={faLinkedin} color="#ff007b" size="lg" />
          </a>
          <a href={user.github} style={{ margin: "0 10px" }}>
            <FontAwesomeIcon icon={faGithub} color="#ff007b" size="lg" />
          </a>
        </Box>
      </Box>

      <Section
        display="flex"
        justifyContent="center"
        mt={2}
        title="Education"
        icon={faGraduationCap}
      >
        {education.map((edu) => (
          <Typography key={edu._id} variant="body1" mt={1}>
            {edu.degree} from {edu.college} ({edu.level}) -{" "}
            {edu.stillEnrolled ? "Ongoing" : "Completed"}
          </Typography>
        ))}
      </Section>

      <Section title="Work History" icon={faBriefcase}>
        {workHistory.map((work) => (
          <Typography key={work._id} variant="body1" mt={1}>
            {work.position} at {work.company} ({work.employmentType}) -{" "}
            {work.isCurrent ? "Current" : "Ended"}
          </Typography>
        ))}
      </Section>

      <Section title="Projects" icon={faProjectDiagram}>
        {proj.map((project) => (
          <Box key={project._id} mt={1}>
            <Typography variant="body1">{project.name}</Typography>
            <Typography variant="body2">
              Tech Stack: {project.techStack.languages.join(", ")} |{" "}
              {project.techStack.backend.join(", ")} |{" "}
              {project.techStack.database.join(", ")} |{" "}
              {project.techStack.cloud.join(", ")}
            </Typography>
            <a href={project.githubLink} style={{ color: "#ff007b" }}>
              GitHub Link
            </a>
          </Box>
        ))}
      </Section>

      <Section title="Skills" icon={faCogs}>
        <Typography variant="body1" mt={1}>
          Technical Skills:
        </Typography>
        {skills.technicalSkills.map((techSkill) => (
          <Typography key={techSkill._id} variant="body2" mt={1}>
            {techSkill.skill} ({techSkill.level})
          </Typography>
        ))}
        <Typography variant="body1" mt={2}>
          Soft Skills:
        </Typography>
        {skills.softSkills.map((softSkill) => (
          <Typography key={softSkill._id} variant="body2" mt={1}>
            {softSkill.skill}
          </Typography>
        ))}
        <Typography variant="body1" mt={2}>
          Languages:
        </Typography>
        {skills.languages.map((lang) => (
          <Typography key={lang._id} variant="body2" mt={1}>
            {lang.language} ({lang.proficiency})
          </Typography>
        ))}
      </Section>
    </Container>
  );
};

const Section = ({ title, icon, children }) => (
  <Box mt={4}>
    <Grid container alignItems="center">
      <Grid item>
        <FontAwesomeIcon icon={icon} color="#ff007b" size="lg" />
      </Grid>
      <Grid item>
        <Typography variant="h5" color="#ff007b" ml={1}>
          {title}
        </Typography>
      </Grid>
    </Grid>
    <Box mt={2}>{children}</Box>
  </Box>
);

export default StudentPreview;
