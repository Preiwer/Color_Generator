import { TroubleshootRounded } from "@mui/icons-material";
import {
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Card,
  CardContent,
  Skeleton,
  ThemeProvider,
  createTheme,
  Grid,
} from "@mui/material";
import { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  let colors;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      colors = new Values(color).all(10);
      console.log(colors);
      setError(false);
      setList(colors);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setLoading(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <Grid container marginTop={"10px"} gap={3} className="container">
        <Grid item>
          <Typography
            textTransform={"capitalize"}
            sx={{ typography: { sm: "h4", xs: "h5" } }}
            fontWeight={"medium"}
          >
            color generator
          </Typography>
        </Grid>
        <Grid item>
          <Box
            height={"fit-content"}
            display={"flex"}
            gap={2}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            component={"form"}
            width={"fit-content"}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <TextField
                required
                error={error}
                label="#f15025"
                value={color}
                size={"small"}
                helperText={error ? "Please enter a valid hex code!" : null}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormControl>
            <Button sx={{ height: "100%" }} type="submit" variant="outlined">
              submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        // gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr"}
        className="colors"
        marginTop={"20px"}
      >
        {list.map((color, idx) => {
          console.log(color);
          return (
            <SingleColor
              loading={loading}
              key={idx}
              {...color}
              index={idx}
              tp={color.type}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default App;
