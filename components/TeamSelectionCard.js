import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const TeamSelectionCard = ({team, theme}) => {
  const { id, name } = team;
  const imageMode = theme.palette.mode === 'dark' ? 'light' : 'dark';
  const imageURL = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/d1b262bacd4892b22a38e8708cdb10c8327ff73e_1579810224/images/logos/team/current/team-${id}-${imageMode}.svg`;
  return (
    <>
      <Card
        sx={{
          display: 'inline-block',
          p: 0,
          mr: { xs: 0, md: 2 },
          width: {
            xs: '100%',
            md: 250
          }
        }}>
        <CardActionArea href={`/team/${id}`}>
          <CardMedia
            component="img"
            height="200"
            image={imageURL}
            alt={`${team.name} logo`}
          />
          <CardContent>
            <Typography fontSize={18} variant="h3" component="h3">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default TeamSelectionCard;
