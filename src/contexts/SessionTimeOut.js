import React from 'react';
const SessionTimeOut = ({ }) => {

    const MyFooterContent = () => {
        return (
            <div>
                <button className="button is-success is-small">Save changes</button>
                <button className="button is-small" onClick={closeModal}>Cancel</button>
            </div>
        )
    }

    const MyModalContent=()=>{
        return <div className="card">
            adfafadsf
        </div>
    }

    const modalObject = {
        title: "login password",
        body: <MyModalContent />,
        footer: <MyFooterContent />
    }
    return modalObject;
    
};

export default SessionTimeOut;