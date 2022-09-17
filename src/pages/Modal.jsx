/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Layout from '../components/Layout';

export function ControlledModal({ shouldShow, onRequestClose, children }) {
  return shouldShow ? (
    <div
      className="bg-blue-500 fixed z-10 left-0 top-0 w-full h-full overflow-auto opacity-50"
      onClick={onRequestClose}
    >
      <div
        className="bg-violet-600 my-[10%] mx-auto p-5 w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onRequestClose} type="button">
          x
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

function Modal() {
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <Layout>
      <div className="h-screen">
        <ControlledModal
          onRequestClose={() => setShouldShow(false)}
          shouldShow={shouldShow}
        >
          <p>Are u sure?</p>
          <button type="button" onClick={() => setShouldShow(false)}>
            {' '}
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Submitted');
              setShouldShow(false);
            }}
          >
            Remove
          </button>
        </ControlledModal>
        <button type="button" onClick={() => setShouldShow(!shouldShow)}>
          Show Modal
        </button>
      </div>
    </Layout>
  );
}

export default Modal;
