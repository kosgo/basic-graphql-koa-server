import app from "./app";
import { port } from "./utils/config";

app.listen(port, () => console.log(`Server runs on port ${port}`));
