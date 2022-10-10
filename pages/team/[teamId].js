import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Grid, Typography, Card, CardContent, CardActions, Button, Alert } from '@mui/material';
import Loading from '../../components/Loading';
import Fade from '../../components/Fade';
import PlayerGrid from '../../components/PlayerGrid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const getTeam = async (teamId) => {
  const response = await fetch(`/api/get-teams?teamId=${teamId}`);
  const data = await response.json();
  return data;
};

const TeamPage = ({theme}) => {
  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState(true);
  const [ teamData, setTeamData ] = useState(false);
  const [ teamError, setTeamError ] = useState(false);

  const { teamId } = router.query;
  const { name, conference, division, firstYearOfPlay, locationName, venue, officialSiteUrl } = teamData;

  const imageMode = theme.palette.mode === 'dark' ? 'light' : 'dark';
  const imageURL = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${teamId}-${imageMode}.svg`;

  useEffect(() => {
    if (teamId) {
      getTeam(teamId).then((data) => {
        if (data.teams) {
          setTeamData(...data.teams);
        } else {
          console.error('Error', data);
          setTeamError(true);
        }
      });
      setIsLoading(false);
    }
  }, [teamId]);

  console.log('teamData', teamData);

  return (
    <>
      <Head>
        <title>NHL Radar: Team View</title>
        <meta name="description" content="Welcome to the NHL Dashboard!" />
      </Head>
      {
        !isLoading && teamData && (
          <Fade childComponent={
            <Grid container spacing={5} mt={1}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3, textAlign: 'center'}}>
                  <CardContent>
                    <Image
                      src={imageURL}
                      alt={`${name} logo`}
                      width={400}
                      height={400}
                      priority
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h2" component="h2">{name}</Typography>
                    <Typography variant="body1" component="p" mb={2}>Est. {firstYearOfPlay}</Typography>

                    <Typography variant="body2" component="p">City</Typography>
                    <Typography variant="body1" component="p" paragraph>{locationName}</Typography>

                    <Typography variant="body2" component="p">Conference</Typography>
                    <Typography variant="body1" component="p" paragraph>{conference.name}</Typography>

                    <Typography variant="body2" component="p">Division</Typography>
                    <Typography variant="body1" component="p" paragraph>{division.name}</Typography>

                    <Typography variant="body2" component="p">Venue Name</Typography>
                    <Typography variant="body1" component="p">{venue.name}</Typography>

                  </CardContent>
                  <CardActions>
                    <Button
                      variant="text"
                      size="small"
                      endIcon={<OpenInNewIcon/>}
                      onClick={() => window.open(officialSiteUrl, '_blank')}
                    >
                    Official Website
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" component="h2" gutterBottom>Players</Typography>
                <PlayerGrid teamId={teamId} />
              </Grid>
            </Grid>
          } />
        )
      }
      { isLoading && <Loading /> }
      { teamError && <Alert severity="error">There was an error loading the team data.</Alert> }

    </>
  );
};

export default TeamPage;
