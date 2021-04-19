import React from 'react';
import { useParams } from 'react-router';

export function ResultsPage() {
  const { username } = useParams();

  return (
    <>
      You searched for { username }.
    </>
  );
}
