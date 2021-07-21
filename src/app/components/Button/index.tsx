import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },

  },
  btn: {
    display: 'block',
    margin: '0px auto',
    backgroundColor: '#2300ff'
  },
}));

export function MainBtn() {
  const classes = useStyles();

  const handleClick = () => {
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Попробовать еще раз!
      </Button>
    </div>
  )
}