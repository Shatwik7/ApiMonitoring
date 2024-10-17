import React, { useState, useEffect } from "react";
import { TextField, Switch, FormControlLabel, Button, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // Get theme for custom styling
import axios from "axios";

const SettingsComponent = () => {
  const theme = useTheme(); // Access MUI theme
  const [settings, setSettings] = useState({
    notifyByEmail: true,
    notifyBySMS: false,
    alertThresholdTime: 5000, // Default to 5000ms
  });

  // Fetch current settings from the backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/settings", settings);
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 shadow-md rounded-lg space-y-4"
      style={{ backgroundColor: theme.palette.background.paper }} // Respecting MUI background color
    >
      <Typography variant="h4" color="textPrimary">
        User Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={settings.notifyByEmail}
            onChange={(e) =>
              setSettings({ ...settings, notifyByEmail: e.target.checked })
            }
            name="notifyByEmail"
            color="primary"
          />
        }
        label="Notify by Email"
      />

      <FormControlLabel
        control={
          <Switch
            checked={settings.notifyBySMS}
            onChange={(e) =>
              setSettings({ ...settings, notifyBySMS: e.target.checked })
            }
            name="notifyBySMS"
            color="primary"
          />
        }
        label="Notify by SMS"
      />

      <TextField
        label="Alert Threshold Time (ms)"
        type="number"
        value={settings.alertThresholdTime}
        onChange={(e) =>
          setSettings({ ...settings, alertThresholdTime: parseInt(e.target.value, 10) })
        }
        fullWidth
        variant="outlined"
        style={{ color: theme.palette.text.primary }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        Save Settings
      </Button>
    </form>
  );
};

export default SettingsComponent;
