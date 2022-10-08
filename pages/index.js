import React from 'react';
import Head from 'next/head';
import { Grid } from '@mui/material';
import Fade from '../components/Fade';
import LeagueSelection from '../components/LeagueSelection';

const Home = ({theme}) => {
  return (
    <>
      <Head>
        <title>NHL Dashboard</title>
        <meta name="description" content="Welcome to the NHL Dashboard!" />
      </Head>

      <Fade childComponent={
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <LeagueSelection theme={theme} />
          </Grid>
        </Grid>
      } />

    </>
  );
};

export default Home;
