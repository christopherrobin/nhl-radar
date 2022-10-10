import React, { useState, useEffect } from 'react';
import { map, isEmpty } from 'lodash';
import { Alert, Typography } from '@mui/material';
import Loading from './Loading';
import TeamSelectionCard from './TeamSelectionCard';

const getTeams = async () => {
  const response = await fetch('/api/get-teams');
  const data = await response.json();
  return data;
};

const TeamSelection = ({theme}) => {
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
      <Typography variant="p" component="p" mb={3}>Select a team to view their details.</Typography>

      {isLoading && <Loading />}
      {teamsError && (
        <Alert severity="error">
          There was an error loading the teams. Please try again later.
        </Alert>
      )}
      {!isLoading && !teamsError && !isEmpty(teams) && (
        map(teams, (team) => <TeamSelectionCard key={team.id} team={team} theme={theme} />)
      )}
    </>
  );
};

export default TeamSelection;
