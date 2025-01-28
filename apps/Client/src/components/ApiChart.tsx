import React, { useEffect, useState } from "react";
import { Typography, Box, Skeleton, useMediaQuery } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useTheme } from "@mui/material/styles";

interface ApiCheckData {
  id: number;
  apiId: number;
  apiUrl: string;
  dnsLookupTime: number;
  tcpConnectionTime: number;
  tlsHandshakeTime: number;
  statusCode: number;
  totalTime: number;
  checkedAt: string;
  live: boolean;
}

interface ApiChartProps {
  apiId: number;
}

const timeRanges = [
  { label: "Day", endpoint: "last24hours" },
  { label: "Week", endpoint: "last7days" },
  { label: "Month", endpoint: "last28days" },
];

const ApiChart: React.FC<ApiChartProps> = ({ apiId }) => {
  const [data, setData] = useState<ApiCheckData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>("last28days");
  const [range, setRange] = useState("Week");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string
  ) => {
    console.log(event);
    if (!newRange) return;
    setRange(newRange);
    setSelectedRange(newRange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api-checks/${apiId}/${selectedRange}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: ApiCheckData[] = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiId, selectedRange]);

  const chartData = [
    {
      id: "dns",
      label: "DNS Lookup Time (ms)",
      data: data.map((entry) => entry.dnsLookupTime || 0),
    },
    {
      id: "tcp",
      label: "TCP Connection Time (ms)",
      data: data.map((entry) => entry.tcpConnectionTime || 0),
    },
    {
      id: "tls",
      label: "TLS Handshake Time (ms)",
      data: data.map((entry) => entry.tlsHandshakeTime || 0),
    },
    {
      id: "total",
      label: "Total Time (ms)",
      data: data.map((entry) => entry.totalTime || 0),
    },
  ].map((item, index) => ({
    ...item,
    color: mangoFusionPalette("light")[index],
  }));

  if (loading) {
    return (
      <Box sx={{ width: "100%", height: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Skeleton variant="rectangular" width="90%" height="100%" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Toggle Button Group */}
      <ToggleButtonGroup
        color="primary"
        value={range}
        onChange={handleChange}
        exclusive
        sx={{ justifyContent: "center" }} // Center buttons
      >
        {timeRanges.map((e) => (
          <ToggleButton key={e.endpoint} value={e.endpoint}>
            {e.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Chart */}
      <Box
        sx={{
          width: "100%",
          height: isSmallScreen ? 300 : 500, // Responsive height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LineChart
          xAxis={[
            {
              id: "checkedAt",
              data: data.map((entry) => new Date(entry.checkedAt)),
              scaleType: "time",
              valueFormatter: (date) => {
                const formattedDate = new Date(date).toLocaleString();
                const matchingEntry = data.find(
                  (entry) =>
                    new Date(entry.checkedAt).getTime() ===
                    new Date(date).getTime()
                );
                return `${formattedDate} (${matchingEntry?.live ? "Live" : "Offline"})`;
              },
            },
          ]}
          yAxis={[
            {
              id: "responseTime",
              data: chartData.flatMap((series) => series.data),
              min: Math.min(...chartData.flatMap((series) => series.data)) - 200, // Add padding
              max: Math.max(...chartData.flatMap((series) => series.data)) + 500, // Add padding
            },
          ]}
          series={chartData}
          slotProps={{
            legend: {
              hidden: isSmallScreen,
            },
          }}
          grid={{vertical:true , horizontal:true}}
          height={isSmallScreen ? 300 : 500} // Dynamic height
          margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
        />
      </Box>
    </Box>
  );
};

export default ApiChart;
