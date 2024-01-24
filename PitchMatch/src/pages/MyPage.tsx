import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserPageCardBottom, UserPageCardMiddle, UserPageCardTop, UserPageCardTopMyPage } from "../components/UserPageCard";
import { User, Pitch, PersonalData } from "../components/types";
import { UserParamsType, getUser, gePersonalData, getPitches } from "./UserPage";
import { useAuth } from "../App";

export function MyPage(){
  const id= useAuth().token?.userId;
  const isLoggedIn:boolean= useAuth().token?.accessToken ? true : false;
  const [user, setUser] = useState<User>();
  const [userPortfolio, setUserPortfolio] = useState<Pitch[]>([]);
  const [personalData, setPersonalData] = useState<PersonalData>();


  useEffect(() => {
    getUser(id!).then((res) => setUser(res));
    gePersonalData(id!).then((res) => setPersonalData(res));
    getPitches(id!).then((res) => setUserPortfolio(res));

  }, [])
  
  const userPageData = ({
    id: id!,
    name: user?.name ?? '',
    contact: user?.contact ?? '',
    soMe: user?.soMe ?? '',
    cvUrl: user?.cvUrl ?? '',
    rating: user?.rating ?? 0,
    isVerified: personalData?.isVerified ?? false,
    isLogged: isLoggedIn,
    bio: user?.bio ?? '',
    imgUrl: user?.imgUrl ?? '',
    portfolio: userPortfolio ?? [],
    location: personalData?.address ?? '',
  });
    
  return (
    <div className='page-background' style={{padding: 20}}>
      <div>
        {userPageData ? (
          <div>
            <UserPageCardTopMyPage id={userPageData.id} location={userPageData.location} name={userPageData.name} contact={userPageData.contact} soMe={userPageData.contact} cvUrl={userPageData.cvUrl} isVerified={userPageData.isVerified} isLogged={userPageData.isLogged} bio={userPageData.bio} imgUrl={userPageData.imgUrl} portfolio={userPageData.portfolio} rating={userPageData.rating} />
            <UserPageCardMiddle {...userPageData} />
            <UserPageCardBottom {...userPageData} />
          </div>
        ) : (
          // Optionally, you can show a loading state or some other message
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}