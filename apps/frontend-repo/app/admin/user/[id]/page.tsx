'use client';

import React from "react";
import { useSearchParams } from 'next/navigation';
import ProfileForm from "@/components/UserForm/ProfileForm";

const ProfileIdPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return <ProfileForm id={id as string | undefined}/>;
};

export default ProfileIdPage;
