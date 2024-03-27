import React, {useState, useEffect} from "react";
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
    TableBody
} from "@mui/material";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {coinToss} from "../../actions/login";
import {useNavigate} from "react-router-dom";
import * as api from "../../api";

const Home = () => {
    const [wager, setWager] = useState(0);
    const [choice, setChoice] = useState("Heads"); // Default choice
    const [lastTossesList, setLastTosses] = useState([]);
    const user = localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null";
    const dispatch = useDispatch();
    const history = useNavigate();

    // const isSingedIn = user;

    const handleWagerChange = (event) => {
        setWager(event.target.value);
    };

    const handleChoiceChange = (event) => {
        setChoice(event.target.value);
    };

    const handleWagerSubmit = (e) => {
        const payload = {
            wager, choice
        }
        e.preventDefault();
        dispatch(coinToss(payload, history));
        fetchLastTosses();
    };

    useEffect(() => {
        // Fetch last 10 tosses when component mounts
        fetchLastTosses();
    }, []);

    const fetchLastTosses = async () => {
        // Fetch last 10 tosses from backend
        const { data } = await api.lastTosses();
        setLastTosses(data.data);
    };

    return (
        <Grow in>
            <Container component="main" maxWidth="lg">
                <Paper elevation={3} style={{padding: '20px', marginTop: '20px'}}>
                    {user !== "null" && user !== null ? (
                        <>
                            <Typography variant="h4" align="center" color="primary">
                                {`Welcome ${user.name}`}
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                                Place your wager and choose Heads or Tails
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
                                <RadioGroup row aria-label="choice" name="choice" value={choice}
                                            onChange={handleChoiceChange}>
                                    <FormControlLabel value="Heads" control={<Radio/>} label="Heads"/>
                                    <FormControlLabel value="Tails" control={<Radio/>} label="Tails"/>
                                </RadioGroup>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleWagerSubmit}
                                fullWidth
                                style={{marginTop: '20px'}}
                            >
                                Submit Wager
                            </Button>
                            {/*{message && <Typography variant="body1" align="center" style={{ marginTop: '20px', color: message.startsWith('You win') ? 'green' : 'red' }}>{message}</Typography>}*/}
                        </>
                    ) : (
                        <Typography variant="h4" align="center" color="primary">
                            Login to Play
                        </Typography>
                    )}
                </Paper>
                <Typography variant="h6" align="center" color="textSecondary" style={{marginTop: '20px'}}>Last
                    10 Tosses:</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold'}} >Choice</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} >Outcome</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} >BonusMultiplier</TableCell>
                                <TableCell style={{fontWeight: 'bold'}} >Wager</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lastTossesList.length > 0 ? lastTossesList.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.choice}</TableCell>
                                    <TableCell>{row.outcome}</TableCell>
                                    <TableCell>{row.bonusMultiplier}</TableCell>
                                    <TableCell>{row.wager}</TableCell>
                                </TableRow>
                            )): 'No records found'}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Grow>
    );
};

export default Home;
