import { 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    ListItemIcon, 
    Typography, 
    Paper,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import ApiIcon from "@mui/icons-material/Http";
  
  interface Api {
    id: number;
    name: string;
    url: string;
    ongoingIncident: boolean;
    acknowledged: boolean;
    first_down_at: string | null;
  }
  
  const APIS: Api[] = [
    {
      id: 1,
      name: "API 1",
      url: "https://httpbin.org/get",
      ongoingIncident: false,
      acknowledged: false,
      first_down_at: null,
    },
    {
      id: 2,
      name: "API 2",
      url: "https://jsonplaceholder.typicode.com/posts",
      ongoingIncident: true,
      acknowledged: true,
      first_down_at: "2024-12-29T15:02:45.598Z",
    },
  ];
  
  function formatDowntime(timestamp: string | null): string {
    if (!timestamp) return "";
    const now = new Date();
    const downTime = new Date(timestamp);
    const diffInMs = now.getTime() - downTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days}d ${hours % 24}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
  
  export function ApiList() {
    const navigate = useNavigate();
  
    return (
      <Paper sx={{ width: "95%", p: 1, boxShadow: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Monitors
        </Typography>
        <List sx={{ p: 0 }}>
          {APIS.map((api) => (
            <ListItem
            key={api.id}
            disablePadding
            sx={{
              borderBottom: "1px solid #e0e0e0",
              transition: "background-color 0.3s ease",
            }}
          >
            <ListItemButton onClick={() => navigate(`api/${api.id}`)} sx={{ p: 1 }}>
              <ListItemIcon>
                <ApiIcon sx={{ color: api.ongoingIncident ? "#FF5252" : "#29B6F6" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: api.ongoingIncident ? "#FF5252" : "#29B6F6" }}
                  >
                    {api.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" component="span">
                      {api.url}
                    </Typography>
                    {api.ongoingIncident && (
                      <><br />
                      <Typography variant="body2" sx={{ color: "#FFC107" }} component="span">
                        {api.acknowledged ? "Acknowledged" : "Down"} · {formatDowntime(api.first_down_at)}
                      </Typography></>
                    )}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
  