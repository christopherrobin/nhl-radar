import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Loading from '../components/Loading';

const getRoster = async (teamId) => {
  const response = await fetch(`/api/get-roster?teamId=${teamId}`);
  const data = await response.json();
  return data;
};

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
          const rosterResponse = data.teams[0].roster.roster;

          // Flatten the roster array for MUI search/filtering
          const flatRows = rosterResponse.map((player) => {
            const { person, jerseyNumber, position } = player;
            const { id, fullName } = person;
            return {
              id: Number(id),
              name: fullName,
              jerseyNumber: jerseyNumber,
              position: position.abbreviation,
              positionType: position.type
            };
          });

          setRoster(flatRows);
        } else {
          console.error('Error', data);
          setError(true);
        }
      });
      setIsLoading(false);
    }
  }, [teamId]);

  const gridData = {
    columns: [
      {
        headerName: 'Number',
        field: 'jerseyNumber',
        flex: 0.3,
        type: 'number',
        align: 'left',
        headerAlign: 'left'
      },
      {
        headerName: 'Name',
        field: 'name',
        renderCell: (params) => params.row.name,
        flex: 1
      },
      {
        headerName: 'Position Type',
        field: 'positionType',
        renderCell: (params) => params.row.positionType,
        flex: 1
      },
      {
        headerName: 'Position',
        field: 'position',
        renderCell: (params) => params.row.position,
        flex: 1
      }
    ],
    rows: roster
  };

  return (
    <>
      {
        (!isLoading && !error && gridData.rows) && (
          <Box sx={{ height: 650, width: 1 }}>
            <DataGrid
              columns={gridData.columns}
              rows={gridData.rows}
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 }
                }
              }}
            />
          </Box>
        )
      }
      {
        isLoading && <Loading />
      }
      {
        !isLoading && error && <Alert severity="error">Error loading roster.</Alert>
      }
    </>
  );
};

export default PlayerGrid;
