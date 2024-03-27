import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TossChoice, TossOutcome } from "../../constants/enum";
import { getLastTosses } from "../../actions/lastTosses";
import { doCoinToss } from "../../actions/coinToss";

const Home = () => {
  const [wager, setWager] = useState(0);
  const [choice, setChoice] = useState(TossChoice.Heads); // Default choice

  const dispatch = useDispatch();

  const {
    data: userData,
    error: userDataError,
    loading: userDataLoading,
  } = useSelector((state) => state.userProfile);

  const {
    data: lastTossesData,
    error: lastTossesDataError,
    loading: lastTossesDataLoading,
  } = useSelector((state) => state.lastTosses);

  const {
    data: coinTossData,
    error: coinTossDataError,
    loading: coinTossDataLoading,
  } = useSelector((state) => state.coinToss);

  // const isSingedIn = user;

  const handleWagerChange = (event) => {
    setWager(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };

  const handleWagerSubmit = (e) => {
    const payload = {
      wager,
      choice,
    };
    e.preventDefault();
    dispatch(doCoinToss(payload));
  };

  useEffect(() => {
    // Fetch last 10 tosses when component mounts
    dispatch(getLastTosses());
  }, []);

  if (userDataLoading && !userData?.data) {
    return <></>;
  } else {
    return (
      <Grow in>
        <Container component="main" maxWidth="lg">
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            {userData?.data ? (
              <>
                <Box>
                  <Typography variant="h4" align="center" color="primary">
                    {`Welcome ${userData?.data?.name}`}
                  </Typography>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Place your wager(tokens) and choose Heads or Tails
                  </Typography>
                  <TextField
                    id="wager"
                    label="Wager"
                    type="number"
                    value={wager}
                    onChange={handleWagerChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="choice"
                      name="choice"
                      value={choice}
                      onChange={handleChoiceChange}
                    >
                      <FormControlLabel
                        value="Heads"
                        control={<Radio />}
                        label="Heads"
                      />
                      <FormControlLabel
                        value="Tails"
                        control={<Radio />}
                        label="Tails"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWagerSubmit}
                    fullWidth
                    style={{ marginTop: "20px" }}
                  >
                    {coinTossDataLoading ? (
                      <CircularProgress sx={{ color: "white" }} />
                    ) : (
                      "Submit Toss"
                    )}
                  </Button>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    style={{ marginTop: "24px", marginBottom: "8px" }}
                  >
                    Your Last 10 Tosses:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Index
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Choice
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Outcome
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Wager Supplied
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Multiplier
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Wager Credited
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lastTossesData?.data?.length > 0
                          ? lastTossesData?.data?.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.choice}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={row.outcome}
                                    color={`${
                                      row.outcome === TossOutcome.Win
                                        ? "success"
                                        : "error"
                                    }`}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell>{row.choice}</TableCell>
                                <TableCell>{`${row.bonusMultiplier}x`}</TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: "bold",
                                    color: `${
                                      row.outcome === TossOutcome.Win
                                        ? "#2e7d32"
                                        : "#d32f2f"
                                    }`,
                                  }}
                                >{`${
                                  row.outcome === TossOutcome.Win ? "+" : "-"
                                }${
                                  row.wager * row.bonusMultiplier
                                }`}</TableCell>
                              </TableRow>
                            ))
                          : "No records found"}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {/*{message && <Typography variant="body1" align="center" style={{ marginTop: '20px', color: message.startsWith('You win') ? 'green' : 'red' }}>{message}</Typography>}*/}
              </>
            ) : (
              <Typography variant="h4" align="center" color="primary">
                Login to Play
              </Typography>
            )}
          </Paper>
        </Container>
      </Grow>
    );
  }
};

export default Home;
