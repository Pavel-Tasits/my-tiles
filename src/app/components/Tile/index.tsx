import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

interface Props {}

export function Tile(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} />
    </div>
  );

};

