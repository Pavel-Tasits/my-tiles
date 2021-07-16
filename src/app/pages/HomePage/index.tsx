import * as React from 'react';
import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import Container from '@material-ui/core/Container';
import {Tile} from '../../components/Tile';
import {makeStyles} from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { useHomepageSliceSlice} from "./slice";
import { selectHomepageSlice} from "./slice/selectors";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px auto',
  },
}));

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

interface IKeys { key1: string; key2: number }

export function HomePage() {
  const tileClickedArr = useSelector(selectHomepageSlice);
  const tilesArr = [
    {id: 1, color: ''},
    {id: 2, color: ''},
    {id: 3, color: ''},
    {id: 4, color: ''},
    {id: 5, color: ''},
    {id: 6, color: ''},
    {id: 7, color: ''},
    {id: 8, color: ''},
    {id: 9, color: ''},
    {id: 10, color: ''},
    {id: 11, color: ''},
    {id: 12, color: ''}
  ]
  tilesArr.forEach(item => {
    item.color = getColor() as string
  })

  useEffect(() => {
    tilesArr.forEach(item => {
      item.color = getColor() as string
    })
  }, [])

  useEffect(() => {
    if (tileClickedArr && tileClickedArr.length > 1) {
      let colorsArr: Array<string> = [];
      tileClickedArr.map((item, index) => {
        //colorsArr.push(item.color)
      })
      console.log('colorsArr', colorsArr)
    }
  }, [tileClickedArr])

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="sm">
        <div className={classes.root}>
          {tilesArr.map(item => {
            return (
              <Tile
                key={item.id}
                id={item.id}
                color={item.color}
              />
            )
          })}
        </div>
      </Container>
    </>
  );
}
