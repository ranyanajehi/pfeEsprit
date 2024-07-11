import React from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import useForm from "../../../helpers/useForm.jsx";
import validate from "../../../helpers/validate.jsx";

const Information = () => {
  const initialState = {
    profilePhoto: { value: null, touched: false, required: false },
    github: {
      value: "https://github.com/jdidi94",
      touched: false,
      required: true,
      requiredMessage: "GitHub URL is required!",
    },
    linkedin: {
      value: "https://www.linkedin.com/in/jdidi-da/",
      touched: false,
      required: true,
      requiredMessage: "LinkedIn URL is required!",
    },
    about: {
      value:
        "After an excited six-month-experience in RBK (ReBootkamp Tunisia) Web Development Boot camp and the hard work in IT that I give it my all-time and interest, I had engaged in more than 1 year in achieving my high standards web development experience—freelancing, making my projects and ideas, developing an experience from taking the product prototype from design and...",
      touched: false,
      required: true,
      requiredMessage: "About section is required!",
    },
  };

  const { formData, errors, changeHandler } = useForm(initialState, validate);

  const handleProfilePhotoChange = (event) => {
    changeHandler({
      target: {
        name: "profilePhoto",
        type: "file",
        files: event.target.files,
      },
    });
  };

  const handleUpdate = () => {
    // Handle update logic
    console.log({
      github: formData.github.value,
      linkedin: formData.linkedin.value,
      about: formData.about.value,
    });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">
        Let's start and get to know you better!!! 😊
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={
            formData.profilePhoto.value
              ? URL.createObjectURL(formData.profilePhoto.value[0])
              : null
          }
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Tooltip title="Upload profile photo">
          <IconButton color="primary" component="label">
            <PhotoCamera sx={{ color: "#ff007b", fontSize: 40 }} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          mt: 3,
        }}
      >
        <TextField
          label="Github"
          fullWidth
          variant="outlined"
          margin="normal"
          name="github"
          value={formData.github.value}
          onChange={changeHandler}
          error={!!errors.github}
          helperText={errors.github}
          sx={{
            "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
          }}
        />
        <TextField
          label="LinkedIn"
          fullWidth
          variant="outlined"
          margin="normal"
          name="linkedin"
          value={formData.linkedin.value}
          onChange={changeHandler}
          error={!!errors.linkedin}
          helperText={errors.linkedin}
          sx={{
            "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
          }}
        />
      </Box>
      <TextField
        label="Tell us about your skills, strengths, work style, and personality."
        fullWidth
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        name="about"
        value={formData.about.value}
        onChange={changeHandler}
        error={!!errors.about}
        helperText={errors.about}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
          "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          sx={{ ml: 2, bgcolor: "#ff007b" }}
          onClick={handleUpdate}
        >
          Update information
        </Button>
        <Button variant="outlined" sx={{ ml: 2, color: "#ff007b" }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default Information;
