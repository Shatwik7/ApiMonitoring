import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";

const sampleData = [
  {
    period: "Today",
    availability: "0.0000%",
    downtime: "12 hours and 4 minutes",
    incidents: 1,
    longestIncident: "12 hours and 4 minutes",
    avgIncident: "12 hours and 4 minutes",
  },
  {
    period: "Last 7 days",
    availability: "0.0000%",
    downtime: "6 days and 12 hours",
    incidents: 1,
    longestIncident: "6 days and 12 hours",
    avgIncident: "6 days and 12 hours",
  },
  {
    period: "Last 30 days",
    availability: "62.1275%",
    downtime: "1 week and 4 days",
    incidents: 2,
    longestIncident: "1 week and 2 days",
    avgIncident: "5 days and 14 hours",
  },
  {
    period: "Last 365 days",
    availability: "94.4627%",
    downtime: "2 weeks and 6 days",
    incidents: 2,
    longestIncident: "1 week and 3 days",
    avgIncident: "1 week and 3 days",
  },
  {
    period: "All time (Last 51 days)",
    availability: "59.6414%",
    downtime: "2 weeks and 6 days",
    incidents: 2,
    longestIncident: "1 week and 3 days",
    avgIncident: "1 week and 3 days",
  },
];

const AvailabilityTable = () => {
  return (// Table has a bug in the current version of MUI
    <Box sx={{ p: 2 }}>
      
      {/* <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time period</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Downtime</TableCell>
              <TableCell>Incidents</TableCell>
              <TableCell>Longest incident</TableCell>
              <TableCell>Avg. incident</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.period}</TableCell>
                <TableCell>{row.availability}</TableCell>
                <TableCell>{row.downtime}</TableCell>
                <TableCell>{row.incidents}</TableCell>
                <TableCell>{row.longestIncident}</TableCell>
                <TableCell>{row.avgIncident}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      {/* Date Range and Calculate Section */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 1,
          boxShadow: 1,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          Custom Range
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr", // Full-width on smaller screens
              md: "1fr 1fr auto", // Two text fields and a button on medium+ screens
            },
          }}
        >
          <TextField
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth>
            Calculate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AvailabilityTable;
