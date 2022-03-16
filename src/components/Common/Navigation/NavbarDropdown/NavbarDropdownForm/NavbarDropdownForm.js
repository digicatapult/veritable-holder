/**
 * This function is used to render the form for the navbar dropdown
 * @returns A form with two dropdown accordion cards.
 */
export default function NavbarDropdownForm({
  defaultAgName,
  defaultPort,
  defaultOrigin,
  origin,
  submitHandler,
  clickSwitchToDefaultHandler,
  originChangeHandler,
}) {
  return (
    <form
      onSubmit={submitHandler}
      className="form-inline d-flex justify-content-end m-0 p-0"
    >
      <div className="accordion" id="collapsing">
        <div className="card rounded-0">
          <div className="card-header border-0 bg-light" id="head01">
            <button
              className="btn btn-link p-0 text-primary"
              type="button"
              href="#/"
              data-toggle="collapse"
              data-target="#collapsing01"
              aria-expanded="true"
              aria-controls="collapsing01"
            >
              <i className="fa fa-sort" aria-hidden="true" /> Endpoint (default)
            </button>
          </div>
          <div
            id="collapsing01"
            className="collapse bg-light show"
            aria-labelledby="head01"
            data-parent="#collapsing"
          >
            <div className="card-body py-0">
              <div className="input-group input-group-sm">
                <label className="w-100 justify-content-start">
                  Predefined Endpoint – {defaultAgName} ({defaultPort})
                </label>
                <input
                  className="form-control"
                  defaultValue={defaultOrigin}
                  id="formcover1"
                  type="hidden"
                />
                <div className="w-100">
                  <button
                    onClick={clickSwitchToDefaultHandler}
                    className="btn btn-primary btn-small w-100 small mb-3 mt-2"
                    href="#/"
                  >
                    Switch to CustomEndpoint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card rounded-0">
          <div className="card-header border-0 bg-light" id="head02">
            <div className="mb-0">
              <button
                className="btn btn-link p-0 text-primary collapsed"
                type="button"
                href="#/"
                data-toggle="collapse"
                data-target="#collapsing02"
                aria-expanded="false"
                aria-controls="collapsing02"
              >
                <i className="fa fa-sort" aria-hidden="true" /> Dev
              </button>
            </div>
          </div>
          <div
            id="collapsing02"
            className="collapse bg-light"
            aria-labelledby="head02"
            data-parent="#collapsing"
          >
            <div className="card-body py-0">
              <div className="m-0 p-0">
                <div className="input-group input-group-sm">
                  <label className="w-100 justify-content-start">
                    Custom Endpoint – UserDefined
                  </label>
                  <input
                    className="form-control"
                    value={origin}
                    onChange={originChangeHandler}
                    placeholder={defaultOrigin}
                    id="formcover2"
                    type="url"
                  />
                  <div className="w-100">
                    <button
                      className="btn btn-primary btn-small w-100 small mb-3 mt-2"
                      href="#/"
                    >
                      Switch to Custom
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
