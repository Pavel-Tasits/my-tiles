import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Tile } from '../../components/Tile';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSliceSlice} from "./slice";
import { selectTileClicked } from './slice/selectors';
import _ from 'lodash';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px auto',
  },
}));

interface IArrayWithColor {
  id: number;
  color: string;
}

const getColor = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0: {
      return '#F50717';
    }
    case 1: {
      return '#2328EB';
    }
    case 2: {
      return '#15F057';
    }
    case 3: {
      return '#F0E824';
    }
  }
};

const compareColors = (arr): any => {
  let m: number[] = []
  _.forEach(arr, function (value) {
    const comparedColorsArr: number[] = [];
    _.filter(arr, function (o) {
      if (o.color === value.color) {
        comparedColorsArr.push(o)
      }
    });
    if (comparedColorsArr.length > 1) {
      m = comparedColorsArr;
    }
  });
  return m
};

export const HomePage = () => {
  const { actions } = useHomepageSliceSlice()
  const dispatch = useDispatch();
  const storeArr = useSelector(selectTileClicked);
  const [arrayWithColor, setArrayWithColor] = useState<IArrayWithColor[]>([]);

  const tilesArr = [
    { id: 1, color: '' },
    { id: 2, color: '' },
    { id: 3, color: '' },
    { id: 4, color: '' },
    { id: 5, color: '' },
    { id: 6, color: '' },
    { id: 7, color: '' },
    { id: 8, color: '' },
    { id: 9, color: '' },
    { id: 10, color: '' },
    { id: 11, color: '' },
    { id: 12, color: '' },
  ];
  tilesArr.forEach(item => {
    item.color = getColor() as string;
  });
  useEffect(() => {
    tilesArr.forEach(item => {
      item.color = getColor() as string;
    });
    setArrayWithColor(tilesArr);
  }, []);

  useEffect(() => {
    const compareResult = compareColors(storeArr)
    if(compareResult.length > 1) {
      dispatch(actions.setComparedId(compareColors(storeArr)));
    }
  }, [storeArr]);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        <div className={classes.root}>
          {arrayWithColor.map(item => {
            return <Tile key={item.id} id={item.id} color={item.color} />;
          })}
        </div>
      </Container>
    </>
  );
};
