import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/auth'

const moodOptions = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😔 Sad', value: 'sad' },
  { label: '😡 Angry', value: 'angry' },
  { label: '😫 Stressed', value: 'stressed' },
  { label: '🤩 Excited', value: 'excited' },
  { label: '😐 Neutral', value: 'neutral' },
];

const MoodBoard = () => {

  const { token } = useAuth();
  const navigate = useNavigate();

  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const storedMoods = JSON.parse(localStorage.getItem('moods')) || [];
    setMoodList(storedMoods);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMood = {
      id: Date.now(),
      mood,
      comment,
      date: new Date().toLocaleString(),
    };

    const updatedList = [newMood, ...moodList];
    setMoodList(updatedList);
    localStorage.setItem('moods', JSON.stringify(updatedList));

    setMood('');
    setComment('');
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Mood Board Tracker</h2>
      <Form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded shadow-sm">
        <Form.Group className="mb-3">
          <Form.Label>Select Your Mood</Form.Label>
          <Form.Select value={mood} onChange={(e) => setMood(e.target.value)} required>
            <option value="">Choose a mood...</option>
            {moodOptions.map((opt) => (
              <option key={opt.value} value={opt.label}>{opt.label}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comment (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write about your expense and mood..."
          />
        </Form.Group>

        <Button type="submit" variant="primary">Save Mood</Button>
      </Form>

      <h4 className="mb-3">Saved Mood Entries</h4>
      {moodList.length === 0 ? (
        <p>No moods recorded yet.</p>
      ) : (
        moodList.map((entry) => (
          <Card key={entry.id} className="mb-3">
            <Card.Body>
              <Card.Title>{entry.mood}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{entry.date}</Card.Subtitle>
              {entry.comment && <Card.Text>{entry.comment}</Card.Text>}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MoodBoard;
