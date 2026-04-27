import React, { useState, useEffect } from 'react'
import {
  FlexBox,
  Card,
  CardHeader,
  Input,
  Button,
  Title,
  Text,
  List,
  ListItemStandard,
  MessageStrip
} from '@ui5/webcomponents-react'

const API_BASE = '/api/hello'

function App() {
  const [greetings, setGreetings] = useState([])
  const [name, setName] = useState('')
  const [greetMessage, setGreetMessage] = useState('')
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')

  // Load all greetings from the backend
  const loadGreetings = async () => {
    try {
      const res = await fetch(`${API_BASE}/Greetings`)
      const data = await res.json()
      setGreetings(data.value || [])
      setError('')
    } catch (err) {
      setError('Failed to load greetings from server.')
    }
  }

  useEffect(() => {
    loadGreetings()
  }, [])

  // Call the custom greet function
  const handleGreet = async () => {
    try {
      const res = await fetch(`${API_BASE}/greet(name='${encodeURIComponent(name || 'World')}')`)
      const data = await res.json()
      setGreetMessage(data.value)
      setError('')
    } catch (err) {
      setError('Failed to get greeting.')
    }
  }

  // Create a new greeting
  const handleCreate = async () => {
    if (!newName.trim()) return
    try {
      const res = await fetch(`${API_BASE}/Greetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() })
      })
      if (res.ok) {
        setNewName('')
        loadGreetings()
        setError('')
      } else {
        setError('Failed to create greeting.')
      }
    } catch (err) {
      setError('Failed to create greeting.')
    }
  }

  // Delete a greeting
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/Greetings(${id})`, { method: 'DELETE' })
      if (res.ok) {
        loadGreetings()
      }
    } catch (err) {
      setError('Failed to delete greeting.')
    }
  }

  return (
    <FlexBox direction="Column" alignItems="Center" style={{ padding: '2rem', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>

      <Title level="H1">Hello World App</Title>
      <Text>A simple CAP + React application with SAP UI5 Web Components</Text>

      {error && (
        <MessageStrip design="Negative" onClose={() => setError('')}>
          {error}
        </MessageStrip>
      )}

      {/* Greet Card */}
      <Card header={<CardHeader titleText="Get a Greeting" />} style={{ width: '100%' }}>
        <FlexBox direction="Row" alignItems="Center" style={{ padding: '1rem', gap: '0.5rem' }}>
          <Input
            placeholder="Enter a name (default: World)"
            value={name}
            onInput={(e) => setName(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button design="Emphasized" onClick={handleGreet}>
            Greet
          </Button>
        </FlexBox>
        {greetMessage && (
          <FlexBox justifyContent="Center" style={{ padding: '1rem' }}>
            <Title level="H2" style={{ color: '#0a6ed1' }}>{greetMessage}</Title>
          </FlexBox>
        )}
      </Card>

      {/* Create Card */}
      <Card header={<CardHeader titleText="Create a New Greeting" />} style={{ width: '100%' }}>
        <FlexBox direction="Row" alignItems="Center" style={{ padding: '1rem', gap: '0.5rem' }}>
          <Input
            placeholder="Enter a name"
            value={newName}
            onInput={(e) => setNewName(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button design="Positive" onClick={handleCreate}>
            Create
          </Button>
        </FlexBox>
      </Card>

      {/* Greetings List Card */}
      <Card header={<CardHeader titleText="Saved Greetings" subtitleText={`${greetings.length} entries`} />} style={{ width: '100%' }}>
        <List>
          {greetings.map((g) => (
            <ListItemStandard
              key={g.ID}
              description={g.message}
              additionalText="Delete"
              additionalTextState="Negative"
              onClick={() => handleDelete(g.ID)}
            >
              {g.name}
            </ListItemStandard>
          ))}
          {greetings.length === 0 && (
            <ListItemStandard>No greetings yet.</ListItemStandard>
          )}
        </List>
      </Card>

    </FlexBox>
  )
}

export default App
