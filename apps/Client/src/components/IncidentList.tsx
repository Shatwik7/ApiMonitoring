import {
  Box,
  Typography,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IncidentListItemProps {
  address: string;
  key: string | Int16Array;
  start_time: Date;
  end_time: Date | null;
  acknowledged: boolean;
  ongoingIncident: boolean;
  name: string;
  url: string;
}

// Format downtime function
const formatDowntime = (start: Date): string => {
  const diff = Math.floor((Date.now() - new Date(start).getTime()) / 1000); // Seconds
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours}h ${minutes}m ago`;
};

const IncidentListItem = (params: IncidentListItemProps) => {
  const theme = useTheme();
  const navigator = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: "8px 0",
        cursor: "pointer",
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }}
      onClick={() => navigator(params.address)}
    >
      {/* Address */}
      <Box sx={{ flex: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {params.name} ({params.url})
        </Typography>
      </Box>

      {/* Downtime */}
      <Box
        sx={{
          flex: 2,
          display: { xs: "none", sm: "block" },
          color: params.acknowledged
            ? theme.palette.warning.main
            : theme.palette.error.main,
        }}
      >
        {params.ongoingIncident && (
          <Typography variant="body2">
            {params.acknowledged ? "Acknowledged" : "Down"} ·{" "}
            {formatDowntime(params.start_time)}
          </Typography>
        )}
      </Box>

      {/* Ended */}
      <Box sx={{ flex: 2, display: { xs: "none", sm: "block" } }}>
        <Typography variant="body2">
          {params.end_time ? params.end_time.toLocaleString() : "Ongoing"}
        </Typography>
      </Box>
    </Box>
  );
};

// Sample data
const sampleData: IncidentListItemProps[] = [
  {
    address: "/incident/1",
    key: "incident-1",
    start_time: new Date("2025-01-17T12:30:00"),
    end_time: null,
    acknowledged: false,
    ongoingIncident: true,
    name: "API 1",
    url: "https://api1.example.com",
  },
  {
    address: "/incident/2",
    key: "incident-2",
    start_time: new Date("2025-01-16T08:15:00"),
    end_time: new Date("2025-01-16T09:45:00"),
    acknowledged: true,
    ongoingIncident: false,
    name: "API 2",
    url: "https://api2.example.com",
  },
];

const IncidentList = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "16px",
        padding: "16px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `2px solid ${theme.palette.divider}`,
          padding: "8px 0",
        }}
      >
        <Box sx={{ flex: 3 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
        </Box>
        {!isSmallScreen && (
          <>
            <Box sx={{ flex: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Downtime
              </Typography>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Ended
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {/* Incident List */}
      <List>
        {sampleData.map((item) => (
          <IncidentListItem {...item} key={item.key.toString()} />
        ))}
      </List>
    </Box>
  );
};

export default IncidentList;
