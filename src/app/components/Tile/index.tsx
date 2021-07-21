import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {useHomepageSliceSlice} from "../../pages/HomePage/slice";
import { selectComparedIdArr } from "../../pages/HomePage/slice/selectors";
import _ from 'lodash';

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
  tile: {
    backgroundColor: '#fff1a9',
  },
}));

interface ITileProps {
  color: string;
  id: number;
}

const isComparedTile = (arr, tileId) => {
  let k: boolean = false;
  _.forEach(arr, function (elem) {
      if (elem.id === tileId) return k = true;
  });
  return k;
}

export function Tile({ color, id }: ITileProps) {
  const { actions } = useHomepageSliceSlice()
  const dispatch = useDispatch();
  const comparedArr = useSelector(selectComparedIdArr);
  const [activeColor, setActiveColor] = useState('')
  const [comparedTile, setComparedTile] = useState(false)

  const handleActiveToggle = () => {
    if (!activeColor) {
      setActiveColor(color)
      dispatch(actions.setTileClicked({id, color}));
    }
  }

  useEffect(() => {
    setComparedTile(isComparedTile(comparedArr, id))
  },[comparedArr])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={comparedTile ? {backgroundColor: '#fff'} : {backgroundColor: activeColor}}
        className={classes.tile}
        elevation={activeColor !== '' ? 0 : 3}
        onClick={handleActiveToggle}
      />
    </div>
  );
}
