import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CustomizedDialogs from "../../ShareDialog";
import PhoneIcon from "@material-ui/icons/Phone";
import { Link, Route } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import SharePost from "../../SharePost";
import useStyles from "./styles.js";
import copy from "copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const classes = useStyles();
  const [copyText, setCopyText] = useState(
    `Do you want to checkout this place? It calls ${place.name}, address is ${place.address}, ${place.website}`
  );
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  const copyToClipboard = () => {
    copy(copyText);
    setCopied(true);
  };

  const handleClickEvent = () => {
    setOpen(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} check-in
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
        <Stack>
          {copied ? (
            <Button color="primary" onClick={copyToClipboard}>
              copied
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={function (event) {
                copyToClipboard();
                handleClickEvent();
              }}
            >
              share
            </Button>
          )}
          <Snackbar open={open} autoHideDuration={3000} onClose={handleToClose}>
            <Alert
              onClose={handleToClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              ✨ Clipboard.length +1 ✨
            </Alert>
          </Snackbar>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
