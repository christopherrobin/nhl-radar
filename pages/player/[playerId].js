import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, Typography, Card, CardContent, CardActions, Link, Button, Alert } from '@mui/material';
import AvatarComponent from '../../components/AvatarComponent';
import ChipComponent from '../../components/ChipComponent';
import Loading from '../../components/Loading';
import Fade from '../../components/Fade';

const getTeam = async (playerId) => {
  const response = await fetch(`/api/get-player-details?playerId=${playerId}`);
  const data = await response.json();
  return data;
};

const PlayerPage = () => {
  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ playerData, setPlayerData ] = useState(false);
  const [ playerError, setPlayerError ] = useState(false);

  const { playerId } = router.query;
  const {
    fullName,
    height,
    weight,
    rosterStatus,
    shootsCatches,
    rookie,
    primaryNumber,
    nationality,
    currentAge,
    primaryPosition,
    birthDate,
    alternateCaptain,
    captain,
    currentTeam
  } = playerData;

  const imageURL = `http://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}@2x.jpg`;

  useEffect(() => {
    if (playerId) {
      getTeam(playerId).then((data) => {
        if (data.people) {
          setPlayerData(...data.people);
        } else {
          console.error('Error', data);
          setPlayerError(true);
        }
      });
      setIsLoading(false);
    }
  }, [playerId]);

  console.log('playerData', playerData);

  return (
    <>
      <Head>
        <title>NHL Radar: Player View</title>
        <meta name="description" content="Welcome to the NHL Dashboard!" />
      </Head>
      {
        !isLoading && playerData && (
          <Fade childComponent={
            <Grid container spacing={5} mt={1}>
              <Grid item xs={12} md={4}>
                <AvatarComponent url={imageURL} size={400} altText={`${fullName} Headshot`} />
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="h2" component="h2" gutterBottom>{fullName} | #{primaryNumber}</Typography>

                        <ChipComponent text={primaryPosition.name} /> @ <Link underline="hover" href={`/team/${currentTeam.id}`}>{currentTeam.name}</Link>

                        <Typography variant="body1" component="p" paragraph>
                          {height}, {weight} lbs
                        </Typography>

                        <Typography variant="body2" component="p">Birth Date</Typography>
                        <Typography variant="body1" component="p" paragraph>{birthDate}</Typography>

                        <Typography variant="body2" component="p">height</Typography>
                        <Typography variant="body1" component="p" paragraph>{height}</Typography>

                        <Typography variant="body2" component="p">weight</Typography>
                        <Typography variant="body1" component="p" paragraph>{weight}</Typography>

                        <Typography variant="body2" component="p">rosterStatus</Typography>
                        <Typography variant="body1" component="p" paragraph>{rosterStatus}</Typography>

                      </Grid>

                      <Grid item xs={6}>
                        yo
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          } />
        )
      }
      { isLoading && <Loading /> }
      { playerError && <Alert severity="error">There was an error loading the team data.</Alert> }

    </>
  );
};

export default PlayerPage;
