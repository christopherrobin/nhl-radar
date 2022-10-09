import React from 'react';
import Head from 'next/head';
import { Grid } from '@mui/material';
import Fade from '../components/Fade';
import TeamSelection from '../components/TeamSelection';

const Home = ({theme}) => {
  return (
    <>
      <Head>
        <title>NHL Radar</title>
        <meta name="description" content="Welcome to the NHL Dashboard!" />
      </Head>

      <Fade childComponent={
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TeamSelection theme={theme} />
          </Grid>
        </Grid>
      } />

    </>
  );
};

export default Home;
