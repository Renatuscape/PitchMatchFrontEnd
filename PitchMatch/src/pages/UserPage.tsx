import { useEffect, useState } from "react";
import { UserPageCardBottom, UserPageCardMiddle, UserPageCardTop } from "../components/UserPageCard";
import { useParams } from "react-router-dom";
import { PersonalData, Pitch, User } from "../components/types";
import { UserPageComponent } from "../components/UserPageComponent";

export type UserPageProps = {
  id: number,
  name: string,
  contact: string,
  soMe: string,
  cvUrl: string,
  rating: number,
  isVerified: boolean,
  isLogged: boolean,
  bio: string,
  imgUrl: string,
  portfolio: Pitch[],
  location: string,
}

export type UserParamsType = {
  id: string
}

export function UserPage() {
  //const [userPageData, setUserPageData] = useState<UserPageProps>();
  const [user, setUser] = useState<User>()
  const [userPortfolio, setUserPortfolio] = useState<Pitch[]>([]);
  const [personalData, setPersonalData] = useState<PersonalData>();
  const { id } = useParams<keyof UserParamsType>() as UserParamsType;

  useEffect(() => {
    getUser(parseInt(id)).then((res) => setUser(res));
    gePersonalData(parseInt(id)).then((res) => setPersonalData(res));
    getPitches(parseInt(id)).then((res) => setUserPortfolio(res));

  }, [])
  
  const userPageData = ({
    id: parseInt(id),
    name: user?.name ?? '',
    contact: user?.contact ?? '',
    soMe: user?.soMe ?? '',
    cvUrl: user?.cvUrl ?? '',
    rating: user?.rating ?? 0,
    isVerified: personalData?.isVerified ?? false,
    isLogged: user?.isLogged ?? false,
    bio: user?.bio ?? '',
    imgUrl: user?.imgUrl ?? '',
    portfolio: userPortfolio ?? [],
    location: personalData?.address ?? '',
  });

  return (
    <div className='page-background' style={{padding: 20}}>
      <div>
      {user && <UserPageComponent user={{id: user.id, name: user.name, contact: user.contact, soMe: user.soMe, cvUrl: user.cvUrl, rating: user.rating, personalData: user.personalData, portfolio: userPortfolio, bio: user.bio, imgUrl: user.imgUrl}} isMyPage={false} />}
        {/* {userPageData ? (
          <div>
            <UserPageCardTop id={userPageData.id} location={userPageData.location} name={userPageData.name} contact={userPageData.contact} soMe={userPageData.contact} cvUrl={userPageData.cvUrl} isVerified={userPageData.isVerified} isLogged={userPageData.isLogged} bio={userPageData.bio} imgUrl={userPageData.imgUrl} portfolio={userPageData.portfolio} rating={userPageData.rating} />
            <UserPageCardMiddle {...userPageData} />
            <UserPageCardBottom {...userPageData} />
          </div>
        ) : (
          // Optionally, you can show a loading state or some other message
          <div>Loading...</div>
        )} */}
      </div>
    </div>
  );
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/user/" + id)
  const resObject = await res.json();
  return resObject;
}

export async function getPitches(id: number): Promise<Pitch[]> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/" + id +"/portfolio")
  const resObject = await res.json();
  return resObject;
}

export async function gePersonalData(id: number): Promise<PersonalData> {
  const res = await fetch("https://pitchmatch.azurewebsites.net/PersonalData/" + id)
  const resObject = await res.json();
  return resObject;
}