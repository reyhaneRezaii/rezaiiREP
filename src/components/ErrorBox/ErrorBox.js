import React from 'react'
import './ErrorBox.css'
export default function ErrorBox({msg}) {
  return (
    <div>

      <div className="csm-empty-error">
        <h1>{msg}</h1>
      </div>
    </div>
  )
}
