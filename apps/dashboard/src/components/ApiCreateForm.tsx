import React, { useState } from 'react';
import {
  TextField, Checkbox, FormControlLabel, MenuItem, Button, FormGroup,
  Select, InputLabel, FormControl, Box, Typography, Grid, Card, CardContent
} from '@mui/material';

const ApiForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [notifyBySMS, setNotifyBySMS] = useState(false);
  const [notifyByCall, setNotifyByCall] = useState(false);
  const [notifyByPush, setNotifyByPush] = useState(false);
  const [checkFrequency, setCheckFrequency] = useState('5min');
  const [requestTimeout, setRequestTimeout] = useState('30');
  const [httpMethod, setHttpMethod] = useState('GET');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      url,
      notifyByEmail,
      notifyBySMS,
      notifyByCall,
      notifyByPush,
      checkFrequency,
      requestTimeout,
      httpMethod
    };
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>

      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          marginBottom:2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Active Monitoring</Box>
        <Box sx={{
          color: 'text.primary', fontSize: 34, fontWeight: 'medium', ":hover": {
            scale: "1.5", transition: "0.4s"
          }
        }}>
          2/3
        </Box>
      </Box>
      <Grid container spacing={2}>
        {/* Part 1 - API URL */}

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            API URL
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter the API endpoint you wish to monitor. Ensure the URL is accurate and publicly accessible.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            mb: 2, boxShadow: 1,
            borderRadius: 5,
          }}>
            <CardContent>
              <TextField
                label="API URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: <Typography>https://</Typography>,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Part 2 - Notification Preferences */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Notification Preferences
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Choose how you'd like to be notified in case of downtime or errors. You can opt for email, SMS, call, or push notifications.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            mb: 2, boxShadow: 1,
            borderRadius: 5,
          }}>
            <CardContent>
              <Typography variant="subtitle1">
                Notification by
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={notifyByEmail} onChange={(e) => setNotifyByEmail(e.target.checked)} />}
                  label="Email"
                />
                <FormControlLabel
                  control={<Checkbox checked={notifyBySMS} onChange={(e) => setNotifyBySMS(e.target.checked)} />}
                  label="SMS"
                />
                <FormControlLabel
                  control={<Checkbox checked={notifyByCall} onChange={(e) => setNotifyByCall(e.target.checked)} />}
                  label="Call"
                />
                <FormControlLabel
                  control={<Checkbox checked={notifyByPush} onChange={(e) => setNotifyByPush(e.target.checked)} />}
                  label="Push Notification"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Part 3 - Monitoring Settings */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Monitoring Settings
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Define how often the API should be checked and set the timeout for the requests. You can also select the HTTP method.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            mb: 2, boxShadow: 1,
            borderRadius: 5,
          }}>
            <CardContent>
              <FormControl fullWidth margin="normal">
                <InputLabel>Check Frequency</InputLabel>
                <Select
                  value={checkFrequency}
                  onChange={(e) => setCheckFrequency(e.target.value as string)}
                  required
                  label="Check Frequency"
                >
                  <MenuItem value="3min">3 Minutes</MenuItem>
                  <MenuItem value="5min">5 Minutes</MenuItem>
                  <MenuItem value="10min">10 Minutes</MenuItem>
                  <MenuItem value="15min">15 Minutes</MenuItem>
                  <MenuItem value="30min">30 Minutes</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Request Timeout</InputLabel>
                <Select
                  value={requestTimeout}
                  onChange={(e) => setRequestTimeout(e.target.value as string)}
                  label="Request Timeout"
                >
                  <MenuItem value="15">15 Seconds</MenuItem>
                  <MenuItem value="20">20 Seconds</MenuItem>
                  <MenuItem value="30">30 Seconds</MenuItem>
                  <MenuItem value="45">45 Seconds</MenuItem>
                  <MenuItem value="60">1 Minute</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>HTTP Method</InputLabel>
                <Select
                  value={httpMethod}
                  onChange={(e) => setHttpMethod(e.target.value as string)}
                  label="HTTP Method"
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                  <MenuItem value="HEAD">HEAD</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Start Monitoring
      </Button>
    </Box>
  );
};

export default ApiForm;
