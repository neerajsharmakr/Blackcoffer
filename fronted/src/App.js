import React, { useState, useEffect } from 'react';
import PieChart from './components/PeiChart';
import { processData } from './utils/processData';
import TableDate from './components/Table';
import { AppBar, Toolbar, Typography, Grid, styled, keyframes,CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Route, Link, Navigate, Routes } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const GridItem = styled(Grid)(({ theme }) => ({
    border: '1px solid #ccc',
    padding: theme.spacing(2),
    animation: `${fadeIn} 0.5s ease`,
}));

const App = () => {
    const [rawData, setRawData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const respData = await response.json();
                setRawData(respData?.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const processedData = processData(rawData);
    const isLoading = Object.keys(processedData).length === 0

    return (
        <Router>
            <AppBar position="fixed" >
                <Toolbar>
                    <div style={{ flexGrow: 1 }}>
                        <Typography variant="h6" noWrap>
                            <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Energy Dashboard</Link>
                        </Typography>
                    </div>
                    <Typography variant="h6" noWrap>
                        <Link to="/visual" style={{ color: 'inherit', textDecoration: 'none' }}>Click For Visual</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Toolbar />
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard" element={<TableDate data={rawData} />} />

                    <Route path="/visual"
                        element={
                            <Grid container>
                                {
                                    isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                        <CircularProgress />
                                    </div> :
                                        Object.keys(processedData).map(country => (
                                            <GridItem item >
                                                <PieChart key={country} data={processedData[country]} country={country} />
                                            </GridItem>
                                        ))
                                }
                            </Grid>
                        }
                    />
                </Routes>
            </main>
        </Router >
    );
};

export default App;

