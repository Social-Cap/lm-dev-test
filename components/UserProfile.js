import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";
import { motion } from "framer-motion";
import { GoVerified } from "react-icons/go";

import postsData from '../data/posts.json'
import PremiumPosts from "./PremiumContent";
import CustomPosts from "../components/CustomPosts";
import { useUser } from '@auth0/nextjs-auth0/client';
// import authors from "../data/author.json";

import { IconShoppingCart } from '@tabler/icons-react';
import { Grid, Center, Space, Container, SimpleGrid, Tabs } from "@mantine/core";


// type SubscriptionTier = 'free' | 'basic' | 'business';

// interface User {
//   uuid: string;
//   userId: number;
//   avatar: string;
//   birthday: Date;
//   email: string;
//   name: string;
//   jobTitle: string;
//   user_followers: number;
//   user_following: number;
//   user_postsamount: number;
//   username: string;
//   // sex: SexType;
//   subscriptionTier: SubscriptionTier;
// }

function createRandomUser() {
  return {
    uuid: faker.string.uuid(),
    userId: faker.number.int(99999),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle(),
    user_followers: faker.number.int(999),
    user_following: faker.number.int(999),
    user_postsamount: faker.number.int(999),
    // sex: faker.person.sexType(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    isVerified: faker.helpers.arrayElement([true, false]),
  };
}



const UserProfile = () => {
  const router = useRouter();
  
  // const currentUser = getUserData(router.query.id.slice(1));
  const { user, error, isLoading } = useUser();
  // const currentUser = getUserData(router.query.id);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [hasShop, setHasShop] = useState(true);
  const userProfile = createRandomUser();

  // function getUserData(username) {
  //   const parsed = username?.slice(1)
  //   for(let i=0; i < authors.length; i++){
  //     if(authors[i].nickname == parsed){
  //       return authors[i];
  //     }
  //     if(user?.nickname == parsed){
  //       return user;
  //     }
  //   }
    
  // }

  // const filterUserData = (currentUser) => {
  //   if (currentUser?.nickname !== user?.nickname) {
  //     console.log('wooow')
  //     setUserData(currentUser);
  //   if (currentUser?.nickname == user?.nickname) {
  //     setUserData(currentUser);
  //     setIsShow(true);
  //   }
  //   } 
  // };

  
// if(currentUser){
//   filterUserData(currentUser);
// }
  // useEffect(() => {
  //   filterUserData();
  // }, [currentUser]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative max-w-2xl mx-auto my-3"
    >
      <div
        className={
          isShow
            ? `flex justify-center items-center text-sm`
            : `flex justify-between items-center text-sm`
        }
      >
        {!isShow && (
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </button>
        )}

        <a href="#" className="flex gap-1 items-center">
          <span className="font-bold text-center ml-8">
            {userProfile?.name} 
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
        <div className="flex gap-2">
          {!isShow && (
            <>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-5">
        <div
          className="w-16 h-16 bg-cover bg-center bg-no-repeat rounded-full"
          style={{
            backgroundImage: `url(${userProfile?.avatar})`,
          }}
        ></div>
        <p className="flex gap-2 items-center text-primary my-3">
          @{userProfile?.username}
          {userProfile?.isVerified ? <GoVerified className="text-blue-400 text-md" /> : ''}                   
        </p>

        <div className="flex gap-10 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold">11</span>
            <span>Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">15k</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">11K</span>
            <span>Likes</span>
          </div>
        </div>

        {isShow && (
          <button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400">
            Edit profile
          </button>
        )}

        <p className={isShow ? `mb-3` : `mb-3 my-5 py-2`}>
          Description about me goes here
        </p>
      </div>
      <Tabs defaultValue="settings" unstyled>
      <Tabs.List>
        <Grid grow justify="center" align="flex-start">
          {/* Adjust Icon */}
          <Tabs.Tab value="settings">
            <Container>
              <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
            </button>
            </Container>
          </Tabs.Tab>
          
          {/* Lock Icon */}
          <Tabs.Tab value="private">
            <Container>
              <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </button>
            </Container>
          </Tabs.Tab>
          
          
          {/* Shop Icon */}
          {hasShop && (
            <Tabs.Tab value="shop">
              <Container>
                <button className="mx-auto">
                  <IconShoppingCart stroke={1.5} />
                </button>
              </Container>
            </Tabs.Tab>
          )}

    
          {/* Heart Icon */}
          <Tabs.Tab value="liked">
            <Container>
              <button className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            </Container>
          </Tabs.Tab>        
          </Grid>
        </Tabs.List>

        <Tabs.Panel value="settings">
          <div className="flex flex-wrap gap-0.5 mt-4">
            {Object.keys(postsData).map((key, i) => (
                  <CustomPosts key={key}
                  thumbnail={i.thumbnail}
                  topic={i.title}
                  video={i.video}
                  author={''}
                  />
              ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="private">private</Tabs.Panel>
        <Tabs.Panel value="shop">
          <div className="flex flex-wrap gap-0.5 mt-4">
                <PremiumPosts
                  video={"https://www.youtube.com/embed/1WEAJ-DFkHE"}
                  topic={"topic"}
                  thumbnail={"https://i.ibb.co/gMQxshz/d5bf60ad1c3b06bd54aab41a2122b5c7.jpg"}
                  userId={11}
                  secondId={11}
                  key={1}
                />
                <PremiumPosts
                  video={"https://www.youtube.com/embed/1WEAJ-DFkHE"}
                  topic={"topic"}
                  thumbnail={"https://i.ibb.co/gMQxshz/d5bf60ad1c3b06bd54aab41a2122b5c7.jpg"}
                  userId={11}
                  secondId={11}
                  key={1}
                />
                <PremiumPosts
                  video={"https://www.youtube.com/embed/1WEAJ-DFkHE"}
                  topic={"topic"}
                  thumbnail={"https://i.ibb.co/gMQxshz/d5bf60ad1c3b06bd54aab41a2122b5c7.jpg"}
                  userId={11}
                  secondId={11}
                  key={1}
                />
                <PremiumPosts
                  video={"https://www.youtube.com/embed/1WEAJ-DFkHE"}
                  topic={"topic"}
                  thumbnail={"https://i.ibb.co/gMQxshz/d5bf60ad1c3b06bd54aab41a2122b5c7.jpg"}
                  userId={11}
                  secondId={11}
                  key={1}
                />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="liked">liked</Tabs.Panel>
      </Tabs>


        {/* <Grid grow justify="center" align="flex-start">
        <Container>
          <button className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
            />
          </svg>
        </button>
        </Container>
        
        <Container>
          <button className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
        </Container>

        {hasShop && (
          <Container>
            <button className="mx-auto">
              <IconShoppingCart stroke={1.5} />
            </button>
          </Container>
        )}

        <Container>
          <button className="mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        </Container>
        </Grid> */} 

      <div className="sticky bottom-0 left-0 bg-white w-full py-2 px-3 mt-1 text-xs">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span>Home</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>

            <span>Friends</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-black text-white px-5 py-2 rounded-md border border-pink-500"
              onClick={() => router.push("/pin/create")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>

            <span>Inbox</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span>Profile</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
