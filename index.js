import { app } from "./src/application/app.js";
app.listen(process.env.PORT, () => {
  console.log("Listening on port: ", process.env.PORT);
  // console.log(path.join(__dirname, './public/user-profile/profile'));
  //   console.log(process.cwd())
});
