import React, { useState } from "react";
import { Container, Button, TextField, Box, Typography } from "@mui/material";
import OneSection from "./OneSection.jsx";
import Information from "./sectionContent/Information.jsx";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import StudentPreview from "./sectionContent/preview.jsx";
import WorkHistory from "./sectionContent/WorkHistory.jsx";
import Education from "./sectionContent/Education.jsx";
import SchoolIcon from "@mui/icons-material/School";
import Projects from "./sectionContent/Projects.jsx";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Skills from "./sectionContent/Stack.jsx";
import BoltIcon from "@mui/icons-material/Bolt";
import { UserProvider } from "../../context/cvGeneratorContext.jsx";
const initialSections = [
  {
    id: 1,
    icon: <AccountBoxIcon sx={{ color: "#fff", fontSize: 40 }} />,
    title: "Personal Information",
    content: <Information />,
  },
  {
    id: 2,
    title: "Work History",
    icon: <WorkOutlineIcon sx={{ color: "#fff", fontSize: 40 }} />,
    content: <WorkHistory />,
  },
  {
    id: 3,
    title: "Education",
    icon: <SchoolIcon sx={{ color: "#fff", fontSize: 40 }} />,
    content: <Education />,
  },
  {
    id: 4,
    title: "Projects",
    icon: <FolderCopyIcon sx={{ color: "#fff", fontSize: 40 }} />,
    content: <Projects />,
  },
  {
    id: 5,
    title: "Skills",
    icon: <BoltIcon sx={{ color: "#fff", fontSize: 40 }} />,
    content: <Skills />,
  },
];

const AllSections = () => {
  const [sections, setSections] = useState(initialSections);

  return (
    <UserProvider>
      <Container
        maxWidth={true}
        // sx={{
        //   // width: "100%",
        //   // display: "flex",
        //   // flexDirection: "column",
        //   margin: "0 auto",
        //   // alignItems: "center",
        //   // justifyContent: "center",
        //   padding: "16px",
        //   backgroundColor: "#f5f5f5", // Optional: Add background color for visibility
        // }}
      >
        <Box>
          <Typography
            letterSpacing={3}
            fontSize={50}
            fontWeight={600}
            // color="#fff"
            // variant="h1"
          >
            Create your cv
          </Typography>
          <Typography fontSize={40} letterSpacing={3}>
            Go through the steps to acomplish a proffessional Cv,
            <br /> Your patience and your details are matter to recruiters,
            <br />
            so take the time to fill out the details
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", margin: 0, gap: "1rem" }}
        >
          <Box>
            {sections.map((section) => (
              <OneSection key={section.id} section={section} />
            ))}
          </Box>
          <Box>
            <StudentPreview />
          </Box>
        </Box>
      </Container>
    </UserProvider>
  );
};

export default AllSections;
