import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Tile } from '../../components/Tile';
import { MainBtn } from '../../components/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSliceSlice } from './slice';
import { selectComparedIdArr, selectTileClicked } from './slice/selectors';
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

function getColor() {
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
}

function createTiles(tilesQuantity: number) {
  let newTilesArr: IArrayWithColor[] = [];
  for (let i = 1; i <= tilesQuantity; i++) {
    newTilesArr.push({ id: i, color: getColor() as string });
  }
  return newTilesArr;
}

function compareColors(arr): any {
  let m: number[] = [];
  _.forEach(arr, function (value) {
    const comparedColorsArr: number[] = [];
    _.filter(arr, function (o) {
      if (o.color === value.color) {
        comparedColorsArr.push(o);
      }
    });
    if (comparedColorsArr.length > 1) {
      m = comparedColorsArr;
    }
  });
  return m;
}

function removeComparedTiles(arr1, arr2) {
  return arr1.filter(itemA => {
    return !arr2.find(itemB => {
      return itemA.id === itemB.id;
    });
  });
}

export const HomePage = () => {
  const { actions } = useHomepageSliceSlice();
  const dispatch = useDispatch();
  const storeArr = useSelector(selectTileClicked);
  const comparedArr = useSelector(selectComparedIdArr);
  const [arrayWithColor, setArrayWithColor] = useState<IArrayWithColor[]>([]);
  const [tileToClose, setTileToClose] = useState<number[]>([]);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    setArrayWithColor(createTiles(12));
  }, []);

  useEffect(() => {
    if (compareColors(storeArr).length > 1) {
      dispatch(actions.setComparedId(compareColors(storeArr)));
    } else {
      if (storeArr?.length === 2) {
        dispatch(actions.setChangeTileClicked([]));
        setTileToClose([storeArr[0].id, storeArr[1].id]);
      }
    }
  }, [storeArr]);

  useEffect(() => {
    if (comparedArr && comparedArr.length !== 0) {
      dispatch(
        actions.setChangeTileClicked(
          removeComparedTiles(storeArr, comparedArr),
        ),
      );
    }
  }, [comparedArr]);

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        {arrayWithColor.map(item => {
          return (
            <Tile
              key={item.id}
              id={item.id}
              color={item.color}
              tileToClose={tileToClose}
              setIsTimeout={setIsTimeout}
              isTimeout={isTimeout}
            />
          );
        })}
      </div>
    </Container>
  );
};
