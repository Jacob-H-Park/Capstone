import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import loopedInLogo from "../../public/photos/LoopedIn2.png";
import { shadows } from "@mui/system";
import landingVideo from "../../public/landing.mp4";
import AuthForm from "./AuthForm";

const Landing = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="login-page">
      <img className="landingLogo" src={loopedInLogo} />
      <div className="login-button">
        <Button
          sx={{
            fontSize: 18,
            // color: "#DFD2C9",
            color: "white",
          }}
          onClick={handleOpen}
        >
          <p sx={{ boxShadow: 10 }}>Signup or Login</p>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AuthForm />
        </Modal>
      </div>
      <video className="landingVideo" loop controls={false} muted autoPlay>
        <source src={landingVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Landing;
