import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Grid, Typography, Card, CardContent, Chip, Link, Box, Alert } from '@mui/material';
import { Close, Check, Star } from '@mui/icons-material';

import AvatarComponent from '../../components/AvatarComponent';
import ChipComponent from '../../components/ChipComponent';
import Loading from '../../components/Loading';
import Fade from '../../components/Fade';
import PlayerGrid from '../../components/PlayerGrid';

const getTeam = async (playerId) => {
  const response = await fetch(`/api/get-player-details?playerId=${playerId}`);
  const data = await response.json();
  return data;
};

const PlayerPage = () => {
  const router = useRouter();
  const { playerId } = router.query;
  const [ isLoading, setIsLoading ] = useState(true);
  const [ playerData, setPlayerData ] = useState(false);
  const [ playerError, setPlayerError ] = useState(false);

  const {
    fullName,
    height,
    weight,
    shootsCatches,
    rookie,
    primaryNumber,
    nationality,
    currentAge,
    primaryPosition,
    birthDate,
    alternateCaptain,
    captain,
    currentTeam,
    birthCity,
    birthStateProvince,
    birthCountry
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

  return (
    <>
      <Head>
        <title>NHL Radar: Player Details</title>
        <meta name="description" content="NHL Radar Player Details Page" />
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
                      <Grid item xs={12} md={9}>
                        <Typography variant="h2" component="h2" gutterBottom>{fullName} | #{primaryNumber}</Typography>
                        <Box sx={{ mb: 2 }}>
                          {primaryPosition.name} ({primaryPosition.abbreviation}) @ <Link underline="hover" href={`/team/${currentTeam.id}`}>{currentTeam.name}</Link>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={3} mb={2}>
                        <Box component="span"><ChipComponent text={`${height}`} /></Box>
                        <Box component="span" sx={{ml: 1}}><ChipComponent text={`${weight} lbs`} /></Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Typography variant="body2" component="p">Birth Date</Typography>
                        <Typography variant="body1" component="p" paragraph>
                          {
                            moment(birthDate).format('MMMM Do, YYYY')
                          }
                        </Typography>

                        <Typography variant="body2" component="p">Age</Typography>
                        <Typography variant="body1" component="p" paragraph>{currentAge}</Typography>

                        <Typography variant="body2" component="p">Nationality</Typography>
                        <Typography variant="body1" component="p" paragraph>{nationality}</Typography>

                        <Typography variant="body2" component="p">Born</Typography>
                        <Typography variant="body1" component="p" paragraph>{birthCity}, {birthStateProvince}, {birthCountry}</Typography>

                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" component="p">Shoots/Catches</Typography>
                        <Typography variant="body1" component="p" paragraph>{shootsCatches === 'L' ? 'Left' : 'Right'}</Typography>

                        <Typography variant="body1" component="div" sx={{ my: 1 }}>
                          {
                            rookie ?
                              <Chip label="Rookie Year" color="success" icon={<Check />} sx={{ fontWeight: 900 }} />
                              :
                              <Chip label="Not a Rookie" color="error" variant="outlined" icon={<Close />} sx={{ fontWeight: 900 }} />
                          }
                        </Typography>

                        <Typography variant="body1" component="div" sx={{ my: 1 }}>
                          {
                            captain ?
                              <Chip label="Captain" color="success" icon={<Star />} sx={{ fontWeight: 900 }} />
                              :
                              <Chip label="Not Captain" color="error" variant="outlined" icon={<Close />} sx={{ fontWeight: 900 }} />
                          }
                        </Typography>
                        <Typography variant="body1" component="div">
                          {
                            alternateCaptain ?
                              <Chip label="Alternate Captain" color="success" icon={<Check />} sx={{ fontWeight: 900 }} />
                              :
                              <Chip label="Not Alternate Captain" variant="outlined" color="error" icon={<Close />} sx={{ fontWeight: 900 }} />
                          }
                        </Typography>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Typography variant="h2" component="h2" gutterBottom>Other {currentTeam.name} Players</Typography>
                <PlayerGrid teamId={currentTeam.id} />
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
