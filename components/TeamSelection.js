import React, { useState, useEffect } from 'react';
import { map, isEmpty, filter } from 'lodash';
import { Alert, Typography, Grid, TextField } from '@mui/material';
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
  const [ teamsResponse, setTeamsResponse ] = useState([]);
  const [teamsError, setTeamsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getTeams().then((data) => {
      if (data.teams) {
        setTeams(data.teams);
        setTeamsResponse(data.teams);
      } else {
        console.error('Error', data);
        setTeamsError(true);
      }
    });
    setIsLoading(false);
  }, []);

  const filterTeams = (event) => {
    setSearchTerm(event.target.value);
    const filteredTeams = filter(teamsResponse, (team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setTeams(filteredTeams);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Typography variant="h2" component="h2" id="teams-selection-header">Teams</Typography>
          <Typography variant="p" component="p" id="teams-selection-sub-header" mb={3}>
            Select a team to view their details.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5} mb={2} pr={3}>
          <TextField
            id="team-search"
            label="Enter Team Name"
            fullWidth
            onChange={filterTeams}
          />
        </Grid>
      </Grid>

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
