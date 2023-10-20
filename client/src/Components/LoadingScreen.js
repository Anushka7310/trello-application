import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

export default function LoadingScreen() {
  const [open] = React.useState(true);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        //onClick={handleClose}
      >
        Loading...
      </Backdrop>
    </div>
  );
}
