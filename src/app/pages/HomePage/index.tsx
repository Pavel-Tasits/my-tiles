import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Tile } from '../../components/Tile';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSlice } from './slice';
import { selectComparedIdArr, selectTileClicked } from './slice/selectors';
import _ from 'lodash';
import { MainBtn } from '../../components/Button';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px auto',
  },
  btn: {
    display: 'block',
    margin: '250px auto',
  },
  result: {
    fontSize: 33,
    textAlign: 'center',
    marginBottom: 20,
  },
}));

interface IArrayWithColor {
  id: number;
  color: string;
}

const createTilesArr = () => {
  let numbers = new Set();
  let newTilesArr: IArrayWithColor[] = [];
  while (numbers.size < 12)
    numbers.add(Math.floor(Math.random() * (13 - 1) + 1));
  [...numbers].forEach((num: any) => {
    if (num <= 4) {
      newTilesArr.push({ id: num, color: '#F50717' });
    }
    if (num > 4 && num <= 8) {
      newTilesArr.push({ id: num, color: '#2328EB' });
    }
    if (num > 8 && num <= 12) {
      newTilesArr.push({ id: num, color: '#15F057' });
    }
  });
  return newTilesArr;
};

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
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();
  const storeArr = useSelector(selectTileClicked);
  const comparedArr = useSelector(selectComparedIdArr);
  const [arrayWithColor, setArrayWithColor] = useState<IArrayWithColor[]>([]);
  const [tileToClose, setTileToClose] = useState<number[]>([]);
  const [isTimeout, setIsTimeout] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  console.log('clickCount', clickCount);

  useEffect(() => {
    setArrayWithColor(createTilesArr());
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

  const handleTileClick = () => {
    setClickCount(prev => prev + 1);
  };

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <>
        {comparedArr?.length !== 12 ? (
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
                  clickCount={handleTileClick}
                />
              );
            })}
          </div>
        ) : (
          <div className={classes.btn}>
            <div className={classes.result}>
              {`Ваш результат: ${clickCount} клика(ов)`}
            </div>
            <MainBtn />
          </div>
        )}
      </>
    </Container>
  );
};
