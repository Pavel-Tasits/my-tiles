import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSlice } from '../../pages/HomePage/slice';
import {
  selectComparedIdArr,
  selectTileClicked,
} from '../../pages/HomePage/slice/selectors';
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
  tileToClose: number[];
  setIsTimeout(isTimeout: boolean): any;
  isTimeout: boolean;
  clickCount(): any;
}

const isComparedTile = (arr, tileId): boolean => {
  let k: boolean = false;
  _.forEach(arr, function (elem) {
    if (elem.id === tileId) return (k = true);
  });
  return k;
};

export function Tile({
  color,
  id,
  tileToClose,
  setIsTimeout,
  isTimeout,
  clickCount,
}: ITileProps) {
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();
  const storeArr = useSelector(selectTileClicked);
  const comparedArr = useSelector(selectComparedIdArr);
  const [activeColor, setActiveColor] = useState('');
  const [comparedTile, setComparedTile] = useState(false);

  const handleActiveToggle = () => {
    if (!isTimeout && !comparedTile) {
      if (
        storeArr?.length === 0 ||
        (storeArr?.length === 1 && storeArr[0].id !== id)
      ) {
        setActiveColor(color);
        dispatch(actions.setTileClicked({ id, color }));
        clickCount();
      }
    }
  };

  useEffect(() => {
    if (
      storeArr?.length === 0 &&
      (tileToClose[0] === id || tileToClose[1] === id)
    ) {
      setIsTimeout(true);
      setTimeout(() => {
        setActiveColor('');
        setIsTimeout(false);
      }, 500);
    }
  }, [storeArr]);

  useEffect(() => {
    setComparedTile(isComparedTile(comparedArr, id));
  }, [storeArr]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={
          comparedTile
            ? { backgroundColor: '#fff' }
            : { backgroundColor: activeColor }
        }
        className={classes.tile}
        elevation={comparedTile || activeColor ? 0 : 3}
        onClick={handleActiveToggle}
      />
    </div>
  );
}
