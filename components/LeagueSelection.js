import React, { useState, useEffect } from 'react';
import { Switch, Case, Default } from 'react-if';
import { map, isEmpty } from 'lodash';
import { Alert, Box, Typography } from '@mui/material';
import Loading from './Loading';
import TeamSelectionCard from './TeamSelectionCard';

const getTeams = async () => {
  const response = await fetch('/api/get-teams');
  const data = await response.json();
  return data;
};

const LeagueSelection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamsError, setTeamsError] = useState(false);

  useEffect(() => {
    getTeams().then((data) => {
      if (data.teams) {
        setTeams(data.teams);
      } else {
        console.error('Error', data);
        setTeamsError(true);
      }
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Typography variant="h2" component="h2">Teams</Typography>
      <Typography variant="p" component="p" mb={3}>Select a team to view their detailed rosters.</Typography>
      <Switch>
        <Case condition={!isEmpty(teams)}>
          {
            map(teams, (team) => <TeamSelectionCard key={team.id} team={team} />)
          }
        </Case>
        <Case condition={teamsError}>
          <Alert severity="error">
            <Box><strong>Error</strong></Box>
            There was an error fetching the teams, please try again later.
          </Alert>
        </Case>
        <Case condition={isLoading}><Loading /></Case>
        <Default>
          <Alert severity="error">
            <Box><strong>Error</strong></Box>
            There was an unknown error, please try again later.
          </Alert>
        </Default>
      </Switch>
    </>
  );
};

export default LeagueSelection;
