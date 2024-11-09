import React, { useState } from 'react';

function AdditionalInfoForm({ onClose, saveInfo }) {
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        saveInfo(info); // Call the saveInfo function passed from the parent
        onClose(); // Close the modal/form after submission
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <label>
                    Additional Information:
                    <textarea
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AdditionalInfoForm;
