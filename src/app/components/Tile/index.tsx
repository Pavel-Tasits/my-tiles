import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    margin: 'auto',
  },
}));

interface ITileProps {
  color: string;
}

export function Tile({ color }: ITileProps) {
  const [active, setActive] = useState(false)
  const [activeColor, setActiveColor] = useState('')

  const handleActiveToggle = () => {
    setActive(!active)
  }

  useEffect(() => {
    if (active) {
      setActiveColor(color)
    } else (
      setActiveColor('#fff')
    )
  }, [active])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={{backgroundColor: activeColor}}
        elevation={active ? 0 : 3}
        onClick={handleActiveToggle}/>
    </div>
  );
}
