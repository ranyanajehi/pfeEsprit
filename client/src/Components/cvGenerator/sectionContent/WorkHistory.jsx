import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useForm from "../../../helpers/useForm.jsx";
import validate from "../../../helpers/validate.jsx";
import axios from "axios";
import { useUser } from "../../../context/cvGeneratorContext.jsx";

const WorkHistory = () => {
  const { user, getCurrentUser, updateUserRecord } = useUser();
  const initialState = {
    positions: [
      {
        _id: 1,
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        employmentType: "Full Time",
      },
    ],
  };

  const { formData, errors, changeHandler, setErrors, setFormData } = useForm(
    initialState,
    validate
  );

  const addPosition = () => {
    setFormData({
      ...formData,
      positions: [
        ...formData.positions,
        {
          _id: formData.positions.length + 1,
          position: "",
          company: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          employmentType: "Full Time",
        },
      ],
    });
  };

  const removePosition = (positionId) => {
    setFormData({
      ...formData,
      positions: formData.positions.filter((pos) => pos._id !== positionId),
    });
    updateUserRecord({ records: formData.positions, section: "workHistory" });
  };

  const getAllUserRecords = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getSections", {
        withCredentials: true,
      });
      setFormData({ positions: response.data.workHistory });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getAllUserRecords();
  }, []);

  const handleSubmit = () => {
    const errors = validate(formData, true);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      formData.positions.map((pos) => {
        delete pos._id;
      });
      updateUserRecord({ records: formData.positions, section: "workHistory" });
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Work History
      </Typography>
      {formData.positions.map((position, posIndex) => (
        <Box key={position._id} sx={{ display: "flex", mb: 2 }}>
          <Box
            sx={{
              width: "4px",
              bgcolor: "#ff007b",
              borderRadius: "2px",
              marginRight: 2,
            }}
          />
          <Accordion sx={{ flexGrow: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
                <Typography>
                  {position.position || "New Position"} -{" "}
                  {position.company || "Company"}
                </Typography>
              </Box>
              <IconButton
                aria-label="delete"
                onClick={() => removePosition(position._id)}
                sx={{ ml: 2 }}
              >
                <DeleteIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white" }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Position"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="position"
                  value={position.position}
                  onChange={(e) => changeHandler(e, position._id)}
                  error={!!errors[`positions.${posIndex}.position`]}
                  helperText={errors[`positions.${posIndex}.position`]}
                />
                <TextField
                  label="Company"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="company"
                  value={position.company}
                  onChange={(e) => changeHandler(e, position._id)}
                  error={!!errors[`positions.${posIndex}.company`]}
                  helperText={errors[`positions.${posIndex}.company`]}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Starting Date"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="startDate"
                    type="month"
                    value={position.startDate}
                    onChange={(e) => changeHandler(e, position._id)}
                    error={!!errors[`positions.${posIndex}.startDate`]}
                    helperText={errors[`positions.${posIndex}.startDate`]}
                  />
                  <TextField
                    disabled={position.isCurrent}
                    label="End Date"
                    type="month"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name="endDate"
                    value={position.endDate}
                    onChange={(e) => changeHandler(e, position._id)}
                    error={!!errors[`positions.${posIndex}.endDate`]}
                    helperText={errors[`positions.${posIndex}.endDate`]}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={position.isCurrent}
                      onChange={(e) =>
                        changeHandler(
                          {
                            target: {
                              name: "isCurrent",
                              value: e.target.checked,
                            },
                          },
                          position._id
                        )
                      }
                    />
                  }
                  label="Still working here"
                />
                <Typography sx={{ mt: 2 }}>Employment Type</Typography>
                <RadioGroup
                  row
                  name="employmentType"
                  value={position.employmentType}
                  onChange={(e) => changeHandler(e, position._id)}
                >
                  <FormControlLabel
                    value="Full Time"
                    control={<Radio />}
                    label="Full Time"
                  />
                  <FormControlLabel
                    value="Part Time"
                    control={<Radio />}
                    label="Part Time"
                  />
                  <FormControlLabel
                    value="Freelance"
                    control={<Radio />}
                    label="Freelance"
                  />
                  <FormControlLabel
                    value="Self-Employed"
                    control={<Radio />}
                    label="Self-Employed"
                  />
                  <FormControlLabel
                    value="Contract"
                    control={<Radio />}
                    label="Contract"
                  />
                  <FormControlLabel
                    value="Internship"
                    control={<Radio />}
                    label="Internship"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addPosition}
      >
        Add Position
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Save Work History
      </Button>
    </Container>
  );
};

export default WorkHistory;
