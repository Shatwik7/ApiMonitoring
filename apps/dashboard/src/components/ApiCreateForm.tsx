import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  NativeSelect,
} from '@mui/material';
import { isAuthenticated } from '../utils/auth';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().max(400, 'Description is too long'),
  apiUrl: yup.string().url('Enter a valid URL').required('API URL is required'),
  interval: yup.number().required('Interval is required').positive('Interval must be a positive number').integer('Interval must be a whole number'),
});

const ApiCreateForm = () => {
  const Backend_url=import.meta.env.VITE_BACKEND_URL;
  const Navigator=useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      apiUrl: '',
      interval: 30,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if(isAuthenticated()){
        const response = await fetch(`${Backend_url}/api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            url: values.apiUrl,
            name: values.name,
            description: values.description || null,
            checkInterval: values.interval,
          }),
        });
        if (response.ok) {
          alert('Monitor created successfully');
        } else {
          alert('Failed to create monitor');
        }
      }else{
        Navigator('/login');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create Monitor
      </Typography>

      {/* Name */}
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : 'Enter a name for the monitor.'}
        error={formik.touched.name && Boolean(formik.errors.name)}
      />

      {/* Description */}
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.description && formik.errors.description ? formik.errors.description : 'Enter a short description for the monitor.'}
        error={formik.touched.description && Boolean(formik.errors.description)}
        multiline
        rows={3}
      />

      {/* API URL */}
      <TextField
        label="API URL"
        variant="outlined"
        fullWidth
        margin="normal"
        name="apiUrl"
        value={formik.values.apiUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.apiUrl && formik.errors.apiUrl ? formik.errors.apiUrl : 'Enter the URL of the API you want to monitor.'}
        error={formik.touched.apiUrl && Boolean(formik.errors.apiUrl)}
      />

      {/* Interval */}
      <FormControl fullWidth margin="normal">
        <NativeSelect
          name="interval"
          value={formik.values.interval}
          onChange={(event) => formik.setFieldValue('interval', Number(event.target.value))}
          onBlur={formik.handleBlur}
          error={formik.touched.interval && Boolean(formik.errors.interval)}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
          <option value={5*60}>5 minutes</option>
          <option value={10*60}>10 minutes</option>
        </NativeSelect>
        <Typography variant="caption" color="error">
          {formik.touched.interval && formik.errors.interval}
        </Typography>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Create Monitor
      </Button>
    </Box>
  );
};

export default ApiCreateForm;
