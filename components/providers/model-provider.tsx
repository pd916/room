"use client"
import React, { useEffect, useState } from 'react'
import EditProfile from '../models/edit-profile'

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    }
  return (
    <EditProfile/>
  )
}

export default ModelProvider
