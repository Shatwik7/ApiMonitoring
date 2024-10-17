import express, { Request, Response } from 'express';
import apiRoutes from './routes/apiRoutes';
import apiCheckRoutes from './routes/apiCheckRoutes';
import UserRoutes from './routes/userRoutes';
import SettingsRoutes from './routes/settingRoutes';
import cors from "cors";
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/help', (req: Request, res: Response) => {
  console.log("help");
  res.status(200).send("help");
})
app.get('/health', (req: Request, res: Response) => {
  console.log("health");
  res.send("help");
})

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  console.log(req.body);
  next();
});
app.use('/', UserRoutes);
app.use('/api', apiRoutes);
app.use('/api-checks', apiCheckRoutes);
app.use('/settings',SettingsRoutes);


app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ type: "error", message: "not found" });
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
