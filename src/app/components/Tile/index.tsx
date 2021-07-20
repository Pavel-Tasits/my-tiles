import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {useHomepageSliceSlice} from "../../pages/HomePage/slice";
import {selectComparedIdArr, selectTileClicked} from "../../pages/HomePage/slice/selectors";
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

const tileClicked = [
  {id: 3, color: "#2328EB"},
  {id: 6, color: "#2328EB"},
  {id: 8, color: "#2328EB"},
  {id: 4, color: "#F50717"},
  {id: 9, color: "#F69837"},
];
const comparedArr = [
  {id: 3, color: "#2328EB"},
  {id: 6, color: "#2328EB"},
];

const removeComparedTiles = (arr1, arr2) => {
  return arr1.filter((itemA) => {
    return !arr2.find((itemB) => {
      return itemA.id === itemB.id
    })
  })
}

export function Tile({ color, id }: ITileProps) {
  const { actions } = useHomepageSliceSlice()
  const dispatch = useDispatch();
  const comparedArr = useSelector(selectComparedIdArr);
  const storeArr = useSelector(selectTileClicked);
  const [activeColor, setActiveColor] = useState('')
  const [comparedTile, setComparedTile] = useState(false)

  const handleActiveToggle = () => {
    setActiveColor(color)
    dispatch(actions.setTileClicked({id, color}));
  }

  useEffect(() => {
    setComparedTile(isComparedTile(comparedArr, id))
    //dispatch(actions.setChangeTileClicked(removeComparedTiles(storeArr, comparedArr)));
  },[comparedArr])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={comparedTile ? {backgroundColor: '#000'} : {backgroundColor: activeColor}}
        elevation={activeColor !== '' ? 0 : 3}
        onClick={handleActiveToggle}/>
    </div>
  );
}
