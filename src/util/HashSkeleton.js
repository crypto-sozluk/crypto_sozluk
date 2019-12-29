import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  ...theme.spreadThis,
  card: {
    display: 'flex',
    marginBottom: 20,
    padding: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  handle: {
    height: 15,
    width: '80%',
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10,
    margin: '10%'
  },
  fullLine: {
    height: 15,
    width: '80%',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 10,
    margin: '10%'
  }
});

const HashSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 1 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

HashSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HashSkeleton);