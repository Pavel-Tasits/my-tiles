import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSliceSlice } from "../../pages/HomePage/slice";
import { selectHomepageSlice } from "../../pages/HomePage/slice/selectors";

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
  id: number;
}

export function Tile({ color, id }: ITileProps) {
  const { actions } = useHomepageSliceSlice()
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState('')

  const handleActiveToggle = () => {
    setActiveColor(color)
    dispatch(actions.setTileClicked({id, color}));
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={{backgroundColor: activeColor}}
        elevation={activeColor !== '' ? 0 : 3}
        onClick={handleActiveToggle}/>
    </div>
  );
}
