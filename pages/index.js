import React from 'react';
import Head from 'next/head';
import { Grid, Typography } from '@mui/material';
import Fade from '../components/Fade';

export default function Home() {
  return (
    <>
      <Head>
        <title>NHL Dashboard</title>
        <meta name="description" content="Welcome to the NHL Dashboard!" />
      </Head>


      <Fade childComponent={
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" gutterBottom>Hello! &#128075;</Typography>
            <Typography variant="p" component="p" paragraph>
                ...world
            </Typography>
          </Grid>
        </Grid>
      } />

    </>
  );
}
