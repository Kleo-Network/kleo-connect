import React, { useEffect, useRef, useState } from 'react'
import PointsAndDataCard from './components/PointsAndData'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import DataQuality from './components/DataQuality'
import Milestones from './components/mileStones/Milestones'
import Snapshot from './components/Snapshot'
import Referrals from './components/Referrals'
import Leaderboard from './components/Leaderboard'
import Privacy from './components/Privacy'
import LeaderBoardBanner from './components/LeaderBoardBanner'
import Navbar, { PAGE_NAMES } from './components/Navbar'
import useFetch from '../common/hooks/useFetch'
import { Method } from 'axios'
import { useNavigate } from 'react-router-dom';

interface UserGraphResponse {
  processing?: boolean;
  data?: GraphLabelItem[];
  error?: string
}

interface GraphLabelItem {
  label: string;
  percentage: number;
}

interface UploadResponse {
  url?: string;
  error?: string;
  // Add other fields as needed
}

type CanvasSource = HTMLCanvasElement | HTMLImageElement;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

const canUpload = () => {
  const lastUploadTime = localStorage.getItem('lastUploadTime');
  if (lastUploadTime) {
    const timeSinceLastUpload = Date.now() - parseInt(lastUploadTime);
    return timeSinceLastUpload > ONE_HOUR_IN_MS;
  }
  return true;
};

const cacheImageUrl = (url: string) => {
  localStorage.setItem('cachedImageUrl', url);
  localStorage.setItem('lastUploadTime', Date.now().toString());
};

const getCachedImageUrl = () => {
  const cachedUrl = localStorage.getItem('cachedImageUrl');
  const lastUploadTime = localStorage.getItem('lastUploadTime');

  if (cachedUrl && lastUploadTime) {
    const timeSinceLastUpload = Date.now() - parseInt(lastUploadTime);
    if (timeSinceLastUpload <= ONE_HOUR_IN_MS) {
      return cachedUrl;
    }
  }

  return null;
};

function Profile() {
  const [userAddress, setUserAddress] = useState<string | null>(localStorage.getItem('address'));
  const [isKleoConnectReady, setIsKleoConnectReady] = useState(false);
  let isRequestInProgress = false;
  const navigate = useNavigate();

  useEffect(() => {
    const checkKleoConnect = () => {
      // Poll for the availability of window.kleoConnect
      if ((window as any).kleoConnect) {
        setIsKleoConnectReady(true);
        console.log('kleoConnect is ready:', (window as any).kleoConnect);

        // Assign signIn method if not already assigned
        if (!(window as any).signIn) {
          (window as any).signIn = (window as any).kleoConnect.signIn;
        }
      } else {
        console.log('Waiting for kleoConnect...');
        setTimeout(checkKleoConnect, 100); // Poll every 100ms
      }
    };

    checkKleoConnect(); // Start polling
  }, []);

  useEffect(() => {
    if (!isKleoConnectReady) return; // Wait until kleoConnect is ready

    const validateAddresses = async () => {
      try {
        const pathname = window.location.pathname;
        let urlAddress = pathname.split('/profile/')[1]; // Address from URL
        urlAddress = String(userAddress).replace('/', '');
        const localStorageAddress = localStorage.getItem('address');

        // Call signIn to get the address from the extension
        const result = await (window as any).signIn();
        const extensionAddress = result.address;

        // Check if all three addresses match
        if (
          urlAddress !== localStorageAddress ||
          urlAddress !== extensionAddress ||
          localStorageAddress !== extensionAddress
        ) {
          navigate('/signup/0'); // Redirect to signup if addresses don't match
        } else {
          setUserAddress(localStorageAddress);
        }
      } catch (error) {
        console.error('Error during signIn or address check:', error);
        navigate('/signup/0'); // Redirect on error
      }
    };

    validateAddresses(); // Call the validation function
  }, [isKleoConnectReady]);

  const GET_USER_PATH = `user/get-user/${userAddress}`;
  const UPLOAD_IMGUR_ENDPOINT = 'user/upload_activity_chart';
  const GET_USER_GRAPH = `user/get-user-graph/${userAddress || ''}`;
  // const GET_USER_GRAPH = `user/get-user-graph/${'0xC0cFAB5AFc7a951c510eA20DDD1eCCA31731e574'}`;

  // State for storing the user data
  const [userData, setUserData] = useState<any>(null);
  const { data, status, error, fetchData } = useFetch(GET_USER_PATH, {
    onSuccessfulFetch: (fetchedData) => {
      console.log('Fetched User Data:', fetchedData);
      setUserData(fetchedData);
    },
  });
  const { fetchData: fetchUserGraph, error: graphError } = useFetch<UserGraphResponse>();
  const [graphData, setGraphData] = useState<any>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highestKleoPoints, setHighestKleoPoints] = useState(0);
  const { fetchData: uploadImageFetch } = useFetch<any>();

  // Define the ref with the type of an HTMLDivElement
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const [milestonesHeight, setMilestonesHeight] = useState<number>(0);

  // ------------ Start : Share Graph on Twitter ------------ //
  const createCanvasWithWhiteBackground = (canvas: CanvasSource): string => {
    const tempCanvas = document.createElement('canvas') as HTMLCanvasElement;
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx) {
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, 0);
    }

    return tempCanvas.toDataURL('image/png', 1).split(',')[1]; // Return base64 image data
  };

  const constructTweetText = (imageUrl: string): string => {
    const top3Activities = graphData
      .slice(0, 3)
      .map((activity: { label: any; }) => activity.label)
      .join(", ");
    return `Check out my Activity! My top 3 activities are ${top3Activities}. My current kleo points are ${userData.kleo_points || 0}.
Create your profile and get Kleo points! @kleo_network #KLEO ${imageUrl}`;
  };

  const handleShareGraphClick = async () => {
    // First, check if a valid cached URL exists
    const cachedUrl = getCachedImageUrl();

    if (cachedUrl) {
      // console.log('Using cached URL:', cachedUrl);
      const tweetText = constructTweetText(cachedUrl);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, '_blank');
      return;
    }

    // Set request as in progress
    isRequestInProgress = true;

    try {
      const canvas = document.getElementsByTagName('canvas')[0];
      const imageData = createCanvasWithWhiteBackground(canvas);

      const options = {
        method: 'POST' as Method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
        onSuccessfulFetch: (data: UploadResponse) => {
          if (data && data.url) {
            const imageUrlWithoutExtension = data.url?.replace('.png', '');

            const tweetText = constructTweetText(imageUrlWithoutExtension);

            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
            window.open(twitterUrl, '_blank');

            // Set the last upload time after a successful response
            cacheImageUrl(data.url);
          } else {
            console.error('Failed to upload image.');
            console.log('Failed to upload the image. Please try again.');
          }
          isRequestInProgress = false;
        }
      };

      uploadImageFetch(UPLOAD_IMGUR_ENDPOINT, options);
    } catch (error) {
      console.error('Error uploading image:', error);
      console.log('An error occurred while uploading graph. Please try again later.');
      isRequestInProgress = false;
    }
  };
  // ------------ End : Share Graph on Twitter ------------ //

  useEffect(() => {
    const updateHeight = () => {
      if (milestonesRef.current) {
        setMilestonesHeight(milestonesRef.current.clientHeight);
      }
    };

    updateHeight();
    // Add event listener for resizing in case window size changes
    window.addEventListener('resize', updateHeight);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  // Make API call when Address changes.
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchUserGraph(GET_USER_GRAPH, {
        onSuccessfulFetch(data) {
          if (data?.error) {
            setIsProcessing(true);
          } else if (data?.processing) {
            setIsProcessing(true);
          } else {
            setIsProcessing(false);
            if (graphData) {
              setGraphData(data?.data);
              console.log('Data : ', data);
            }
          }
          setIsLoading(false);
        },
      });
    }
  }, []);

  // Listening to error if any errors set all flags accordingly.
  useEffect(() => {
    if (graphError) {
      setIsProcessing(true);
      setIsLoading(false);
      setGraphData(null);
    }
  }, [graphError])

  return (
    <div className="bg-slate-100">
      <Navbar userAddress={userAddress || ''} page={PAGE_NAMES.PROFILE} />
      {/* Main Content */}
      <div className="container mx-auto p-6 gap-5 grid grid-cols-1 xl:grid-cols-1 mt-[80px] pt-10 scrollbar-thin">

        {/* Layout for >xl */}
        <div className="hidden xl:grid gap-5">
          {/* First Row: PointsAndDataCard (wide) | DataQuality (medium) | Milestones (narrow) */}
          <div className="grid grid-cols-[0.245fr_0.333fr_0.422fr] gap-5">
            <div>
              <PointsAndDataCard kleo_points={userData?.kleo_points || 0} data_quantity={userData?.total_data_quantity || 0} />
            </div>
            <div>
              <DataQuality address={userAddress || ''} isLoading={isLoading} isProcessing={isProcessing} graphData={graphData} userKleoPoints={userData?.kleo_points || 0} highestKleoPoints={highestKleoPoints || 0} />
            </div>
            <div>
              <Milestones mileStones={userData?.milestones || {}} handleShareGraph={handleShareGraphClick} isGraphAvailable={!isProcessing} />
            </div>
          </div>

          {/* Second Row: Snapshot & Referrals (stacked) | Leaderboard (full height) */}
          <div className="grid grid-cols-[2fr_1fr] gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex-1 h-full">
                <Snapshot />
              </div>
              <div className="flex-1 h-full">
                <Referrals userAddress={userAddress || ''} />
              </div>
            </div>
            <Leaderboard userAddress={userAddress || ''} setHighestKleoPoints={setHighestKleoPoints} />
          </div>

          {/* Third Row: Privacy | LeaderBoardBanner */}
          <div className="grid grid-cols-[0.327fr_0.673fr] gap-5">
            <div>
              <Privacy pii_removed_count={userData?.pii_removed_count} />
            </div>
            <div>
              <LeaderBoardBanner />
            </div>
          </div>
        </div>

        {/* Layout for <xl */}
        <div className="xl:hidden grid gap-5">
          {/* First Row: PointsAndDataCard and DataQuality */}
          <div className="grid grid-cols-[0.412fr_0.588fr] gap-5">
            <div>
              <PointsAndDataCard kleo_points={userData?.kleo_points || 0} data_quantity={userData?.total_data_quantity || 0} />
            </div>
            <div>
              <DataQuality address={userAddress || ''} isLoading={isLoading} isProcessing={isProcessing} graphData={graphData} userKleoPoints={userData?.kleo_points || 0} highestKleoPoints={highestKleoPoints || 0} />
            </div>
          </div>

          {/* Second Row: Milestones and Leaderboard */}
          <div className="grid grid-cols-2 gap-5">
            {/* Milestones Column */}
            <div ref={milestonesRef} className="self-start">
              <Milestones mileStones={userData?.milestones || {}} handleShareGraph={handleShareGraphClick} isGraphAvailable={!isProcessing} />
            </div>

            {/* Leaderboard Column with Scroll */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: milestonesHeight }}
            >
              <Leaderboard userAddress={userAddress || ''} setHighestKleoPoints={setHighestKleoPoints} />
            </div>
          </div>

          {/* Third Row: Snapshot */}
          <div className="grid grid-cols-1">
            <Snapshot />
          </div>

          {/* Fourth Row: Referrals */}
          <div className="grid grid-cols-1">
            <Referrals userAddress={userAddress || ''} />
          </div>

          {/* Fifth Row: Privacy and LeaderBoardBanner */}
          <div className="grid grid-cols-[0.412fr_0.588fr] gap-5">
            <div>
              <Privacy pii_removed_count={userData?.pii_removed_count || 0} />
            </div>
            <div>
              <LeaderBoardBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

