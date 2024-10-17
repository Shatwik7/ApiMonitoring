import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CircularProgress, Typography, Box, Button, Menu, MenuItem, Skeleton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
}

interface ApiChartProps {
  apiId: number;
}

const timeRanges = [
  { label: 'Last 24 Hours', endpoint: 'last24hours' },
  { label: 'Last 7 Days', endpoint: 'last7days' },
  { label: 'Last 28 Days', endpoint: 'last28days' },
  { label: 'Last 3 Months', endpoint: 'last3months' },
  { label: 'Last 6 Months', endpoint: 'last6months' }
];

const ApiChart: React.FC<ApiChartProps> = ({ apiId }) => {
  const [data, setData] = useState<ApiCheckData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inloading, setInLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>('last3months');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api-checks/${apiId}/${selectedRange}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: ApiCheckData[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        setInLoading(false);
      }
    };

    fetchData();
  }, [apiId, selectedRange]);

  // Prepare data for the line chart
  const chartData = {
    labels: data.map((entry) => new Date(entry.checkedAt).toLocaleDateString()), // Convert checkedAt to readable date format
    datasets: [
      {
        label: 'DNS Lookup Time (ms)',
        data: data.map((entry) => entry.dnsLookupTime),
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.5)',
        fill: false,
      },
      {
        label: 'TCP Connection Time (ms)',
        data: data.map((entry) => entry.tcpConnectionTime),
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.5)',
        fill: false,
      },
      {
        label: 'TLS Handshake Time (ms)',
        data: data.map((entry) => entry.tlsHandshakeTime),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.5)',
        fill: false,
      },
      {
        label: 'Total Time (ms)',
        data: data.map((entry) => entry.totalTime),
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.5)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'API Monitoring Metrics',
      },
    },
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (range: string) => {
    setSelectedRange(range);
    setAnchorEl(null);
  };

  if (inloading) {
    return (
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: { xs: '200px', sm: '300px', md: '500px' }, // Responsive height
        p: 2 
      }}>
        <Skeleton sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width='100%'
        height="100%" />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  

  return (
    <Box   sx={{ 
        position: 'relative', 
        width: '100%', 
        height: { xs: '200px', sm: '300px', md: '500px' }, // Responsive height
        p: 2 
      }}>
      <LoadingButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        loading={loading}
        onClick={handleMenuOpen}
        variant="contained"
        color="primary"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        {timeRanges.find(range => range.endpoint === selectedRange)?.label || 'Select Time Range'}
      </LoadingButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {timeRanges.map((range) => (
          <MenuItem key={range.endpoint} onClick={() => handleMenuClose(range.endpoint)}>
            {range.label}
          </MenuItem>
        ))}
      </Menu>
      <Line data={chartData} options={chartOptions} />
    </Box>
    
  );
};

export default ApiChart;
