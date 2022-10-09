import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
// import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const getRoster = async (teamId) => {
  const response = await fetch(`/api/get-roster?teamId=${teamId}`);
  const data = await response.json();
  return data;
};

const columns = [
  {
    headerName: 'Number',
    field: 'jerseyNumber',
    renderCell: (params) => params.row.jerseyNumber,
    flex: 0.1
  },
  {
    headerName: 'Position',
    field: 'position.abbreviation',
    renderCell: (params) => params.row.position.abbreviation,
    flex: 0.1
  },
  {
    headerName: 'Name',
    field: 'person.fullName',
    renderCell: (params) => params.row.person.fullName,
    flex: 1
  }
];


const PlayerGrid = ({teamId}) => {
  const [ roster, setRoster ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (teamId) {
      setIsLoading(true);
      getRoster(teamId).then((data) => {
        if (data.teams) {
          setRoster(data.teams[0].roster.roster);
        } else {
          console.error('Error', data);
          setError(true);
        }
      });
      setIsLoading(false);
    }
  }, [teamId]);

  console.log('roster', roster);

  return (
    <>
      {
        !isLoading && roster ? (
          <DataGrid
            autoHeight
            getRowId={(x) => x.person.id}
            rows={roster}
            columns={columns}
            sx={{ background: '#fff'}}
          />
        /*           map(roster, (player) => {
            return (
              <div key={player.person.fullName}>
                {player.person.fullName}
              </div>
            );
          }
          ) */
        ) : (
          <div>Loading...</div>
        )
      }
    </>
  );
};

export default PlayerGrid;
