import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Skeleton,
  IconButton,
  Box,
  Tooltip,
  Grid
} from "@mui/material";
import rgbToHex from "./assets/utils";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";

function SingleColor({ rgb, weight, index, tp, loading }) {
  const [copied, setCopied] = useState(false);
  const convertRGBToHSL = rgbToHex(rgb[0], rgb[1], rgb[2]);
  return (
    <Grid item xs={6} sm={4} lg={2}>
      {loading ? (
        <Skeleton sx={{marginBottom:'10px'}} width={"90%"} heigth={"90%"} variant="rectangular" >
          <Card
            sx={{
              backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
              borderRadius: "0",
              height: "100%",
              transition: "all .5s ease",
              color: tp === "shade" ? "#fff" : null,
            }}
          >
            <CardContent>
              <Typography gutterBottom>{weight}%</Typography>
              <Typography>{rgbToHex(rgb[0], rgb[1], rgb[2])}</Typography>
            </CardContent>
            <CardActions>
              <IconButton sx={{ borderRadius: "100px" }}>
                <ContentCopy />
              </IconButton>
            </CardActions>
          </Card>
        </Skeleton>
      ) : (
        <Card
          sx={{
            backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            borderRadius: "0",
            height: "100%",
            transition: "all .5s ease",
            color: tp == "shade" || tp == "base" ? "#fff" : null,
          }}
        >
          <CardContent>
            <Typography gutterBottom>{weight}%</Typography>
            <Typography>{convertRGBToHSL}</Typography>
          </CardContent>
          <CardActions>
            <Tooltip arrow title={copied ? "Copied" : "Copy"} placement="right">
              <IconButton
                sx={{ color: tp == "shade" || tp == "base" ? "#fff" : null }}
                onClick={() => {
                  navigator.clipboard.writeText(convertRGBToHSL);
                  setCopied(true);
                }}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </Grid>
  );
}

export default SingleColor;
