import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [newimage, setImage] = useState('')
  const [newbirds, setBird] = useState('')
  const [newlocation, setLocation] = useState('')
  const [allBirds, setAllBirds] = useState([])

  const handleNewBirdChange = (event) => {
    setName(event.target.value);
  }

  const handleNewLocationChange = (event) => {
    setSpecies(event.target.value)
  }

  const handleNewImageChange = (event) => {
    setImage(event.target.value)
  }

  const handleNewBirdFormSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/sightings', {
      bird: newbirds,
      location: newlocation,
      image: newimage
    }).then(() => {
      axios.get('http://localhost:3000/sightings').then((response) => {
        setAllBirds(response.data)
      })
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/sightings').then((response) => {
      setAllBirds(response.data)
    })
  })

  const handleDelete = (birdData) => {
    axios.delete(`http://localhost:3000/sightings/${birdData._id}`).then((response) => {
      setAllBirds(response.data)
    })
  }

  const updateBird = (e, bird) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/sightings/${bird._id}`,
      {
        bird: newbirds,
        location: newlocation,
        image: newimage

      }).then(() => {
        axios.get('http://localhost:3000/sightings').then((response) => {

          setAllBirds(response.data)
        })
      })
  }

  return (
    <div className="App">
      <h1>Bird Sighting</h1>
      <section>
        <h2>Add Bird</h2>
        <form onSubmit={handleNewBirdFormSubmit}>
          Bird: <input type="text" onChange={handleNewBirdChange} /><br />
          location: <input type="text" onChange={handleNewLocationChange} /><br />
          image: <input type="text" onChange={handleNewImageChange} /><br />
          <input type="submit" value="Add Bird" />
        </form>
      </section>
      <h2>Birds</h2>
      {allBirds.map((birds) => {
        return (
          <>
            <img src={birds.image} />
            <p>{birds.bird}</p>
            <p>{birds.location}</p>

            <>
            <form onSubmit={(event) => {updateBird(event, birds)}}>
              <label>Bird: <input type="text" defaultValue={birds.bird} onChange={handleNewBirdChange} /></label><br/>
              <label>Location: <input type="text" defaultValue={birds.location} onChange={handleNewLocationChange} /></label><br/>
              <label>Image: <input type="text" defaultValue={birds.image} onChange={handleNewImageChange} /></label><br/>
              <input type="submit" value="update"/>
            </form>
            <button onClick={(event) => {
              handleDelete(birds)
            }}></button>
            </>
          </>
        )
      })}
    </div>
  );
}

export default App;
