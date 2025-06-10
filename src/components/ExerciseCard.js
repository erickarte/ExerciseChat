// src/components/ExerciseCard.js
import React from 'react';
import { Card, Paragraph, Title } from 'react-native-paper';

const ExerciseCard = ({ exercise }) => (
  <Card style={{ margin: 8, backgroundColor: '#f5f5f5' }}>
    <Card.Content>
      <Title style={{ fontSize: 18 }}>{exercise.name}</Title>
      <Paragraph>Parte do corpo: {exercise.bodyPart}</Paragraph>
      <Paragraph>Equipamento: {exercise.equipment}</Paragraph>
      <Paragraph>Dificuldade: {exercise.difficulty}</Paragraph>
    </Card.Content>
  </Card>
);

export default ExerciseCard;