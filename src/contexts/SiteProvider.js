// ThemeContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PageLoader from '../components/site/PageLoader';
import { setUserSession, getUserSession } from '../services/sessionService';
import SmartModal from './SmartModal';
import sessionActivityService from '../services/sessionActivityService';

const SiteContext = createContext();

export const useSiteContext = () => {
    return useContext(SiteContext);
};

export const SiteProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [user, setUserData] = useState(null);
    // these are modal contexts 
    const [modalOptions, setModalOptions] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 
    const setLoading = (status, msg = "") => {
        setIsLoading(status);
        setLoadingMsg(msg)
    }
    const setUser = (data) => {
        setUserData(data);
        setUserSession(data);
    }

    const openModal = useCallback((options) => {
        setModalOptions(options);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOptions(null);
        setIsModalOpen(false);
    }, []);

    const updateUserOnLoad = () => {
        let session_data = getUserSession();
        if (session_data) {
            setUserData(session_data);
        }
    }

    const logout = () => {
        // Handle logout (e.g., redirect to login page)
        console.log('Logging out...');
      //  setUser(null);
      };

    /**
     *  session related services like session activity start and inactivity monitoring
     * 
     */

    const handleInactivity = () => {
        // Handle inactivity (e.g., show notification)
        console.log("inactivity  sdfasdf af after login in")
        // 
        sessionActivityService.startExpiryTimer(logout, 120  * 1000); // Logout in 1 minute
      };

    const startSessionAct = () => {
        // Start the inactivity timer when the component mounts
       // sessionActivityService.startInactivityTimer(handleInactivity);
        /*
        console.log("started the session")
        // Attach event listeners to reset the inactivity timer on user activity
        const handleUserActivity = () => {
          //  console.log("invacitiviy time mout or cleared inavitivitiryr");
            sessionActivityService.resetInactivityTimer();
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        // Cleanup event listeners on component unmount
        return () => {
          //  window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
        */
        sessionActivityService.startExpiryTimer(logout, 30 * 1000);
    }


    useEffect(() => {
        // this is to get the data from session storage 
        updateUserOnLoad()
        //
    }, []);

    return (
        <SiteContext.Provider value={{ setLoading, user, setUser, openModal, closeModal,startSessionAct }}>
            {children}
            <PageLoader loading={isLoading} msg={loadingMsg} />
            {isModalOpen && <SmartModal modalOptions={modalOptions} closeModal={closeModal} />}
        </SiteContext.Provider>
    );
};