import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  timestamp: string;
  dnsTime: number;
  tcpTime: number;
  tlsTime: number;
  transferTime: number;
}

const timeOptions = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

const ApiResponseChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("day");
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const fetchData = async (timeRange: string) => {
    try {
      setLoading(true);
      // Replace with your real API call
      const response = await fetch(`/api/response-time/${timeRange}`);
      const data: ChartData[] = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedTime);
  }, [selectedTime]);

  const data = {
    labels: chartData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: "Name lookup",
        data: chartData.map((entry) => entry.dnsTime),
        borderColor: "#1e88e5",
        backgroundColor: "rgba(30, 136, 229, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Connection",
        data: chartData.map((entry) => entry.tcpTime),
        borderColor: "#43a047",
        backgroundColor: "rgba(67, 160, 71, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "TLS handshake",
        data: chartData.map((entry) => entry.tlsTime),
        borderColor: "#fb8c00",
        backgroundColor: "rgba(251, 140, 0, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Data transfer",
        data: chartData.map((entry) => entry.transferTime),
        borderColor: "#d32f2f",
        backgroundColor: "rgba(211, 47, 47, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time (ms)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Timestamp",
        },
      },
    },
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (range: string) => {
    setSelectedTime(range);
    setMenuAnchor(null);
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "300px", md: "500px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "200px", sm: "300px", md: "500px" },
        position: "relative",
        backgroundColor: "background.paper",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
        Response times
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleMenuOpen}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        {timeOptions.find((option) => option.value === selectedTime)?.label ||
          "Select Range"}
      </Button>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        {timeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuClose(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ApiResponseChart;
