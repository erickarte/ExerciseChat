import { Card, Paragraph } from 'react-native-paper';

export const ExerciseCard = ({ exercise }) => (
  <Card style={{ margin: 8 }}>
    <Card.Title title={exercise.name} subtitle={exercise.bodyPart} />
    <Card.Content>
      <Paragraph>Equipamento: {exercise.equipment}</Paragraph>
      <Paragraph>Dificuldade: {exercise.difficulty}</Paragraph>
    </Card.Content>
  </Card>
);