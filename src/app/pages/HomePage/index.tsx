import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@material-ui/core/Container';
import { Tile } from "../../components/Tile";

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="md">
        <div>Hi</div>
        <Tile />
      </Container>

    </>
  );
}
