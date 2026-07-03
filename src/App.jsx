
import React from 'react'
import RoomsDashboard from './components/rooms/RoomsDashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* If your team is using a navbar component, you can put it here */}
      
      <main>
        <RoomsDashboard />
      </main>
    </div>
  )
}
export default App;
