import { app } from "./app.mjs";

const PORT = process.env.PORT || 3010;

app.listen(PORT, () =>
  console.log(
    `Server
     startad: http://localhost:${PORT}, mode: ${process.env.NODE_ENV}`
  )
);
