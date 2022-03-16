/**
 * This is a dropdown menu that allows the user to change the origin of the Ssi
 * @returns A dropdown menu with a form inside.
 */
import { useState } from 'react'

import NavbarDropdownMultilineBtn from '../NavbarDropdownMultilineBtn'
import NavbarDropdownForm from '../NavbarDropdownForm'
import { AGENT_LABEL, AGENT_ORIGIN } from '../../../../constants'

export default function NavbarDropdown({ status, onSaveOrigin }) {
  const defaultAgName = AGENT_LABEL
  const defaultOrigin = AGENT_ORIGIN
  const [origin, setOrigin] = useState(defaultOrigin)
  const [isVisible, setIsVisible] = useState(status === 'idle')

  const clickDropdownHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsVisible((visibility) => !visibility)
  }
  const onClickSwitchToDefault = () => setOrigin(defaultOrigin)
  const onOriginChange = (e) => {
    const enteredOrigin = e.target.value
    setOrigin(enteredOrigin)
  }
  const onSubmit = () => {
    const enteredOrigin = origin
    onSaveOrigin(enteredOrigin)
  }

  return (
    <ul className="navbar-nav">
      <li className={`nav-item dropdown ${isVisible ? 'show' : ''}`}>
        {status === 'idle' && (
          <a
            className="nav-link"
            data-toggle="dropdown"
            href="#/"
            role="button"
            onClick={clickDropdownHandler}
            aria-haspopup="true"
            aria-expanded={isVisible}
          >
            <NavbarDropdownMultilineBtn
              line01="Ssi"
              line02="Port"
              line03="N/A"
            />
          </a>
        )}
        {status === 'error' && (
          <a className="nav-link disabled" href="#/" aria-expanded="false">
            <span>&nbsp;</span>
          </a>
        )}
        {status === 'fetching' && (
          <a className="nav-link disabled" href="#/" aria-expanded="false">
            <NavbarDropdownMultilineBtn
              line01=" "
              line02=" "
              line03=" "
              icon="fa fa-spinner fa-pulse"
            />
          </a>
        )}
        {status === 'fetched' && (
          <a
            className="nav-link disabled text-light"
            data-toggle="dropdown"
            href="#/"
            role="button"
            onClick={(e) => e.stopPropagation()}
            aria-haspopup="true"
            aria-expanded={isVisible}
          >
            <NavbarDropdownMultilineBtn
              line01="Ssi"
              line02="Port"
              line03={new URL(origin).port}
            />
          </a>
        )}

        {status === 'idle' && (
          <div
            className={`dropdown-menu bg-light p-2 ${isVisible ? 'show' : ''}`}
            style={{ minWidth: '320px' }}
          >
            <NavbarDropdownForm
              defaultAgName={defaultAgName}
              defaultOrigin={defaultOrigin}
              origin={origin}
              submitHandler={onSubmit}
              clickSwitchToDefaultHandler={onClickSwitchToDefault}
              originChangeHandler={onOriginChange}
            />
          </div>
        )}
      </li>
    </ul>
  )
}
