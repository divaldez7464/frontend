import React from 'react';

const Logout = ({ onConfirm, onCancel }) => {
    return (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Logout</h5>
              <button type="button" className="close" onClick={onCancel}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>log out?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>No</button>
              <button type="button" className="btn btn-primary" onClick={onConfirm}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Logout;