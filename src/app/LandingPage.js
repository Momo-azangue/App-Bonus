'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../app/LandingPage.module.css';
import { Button } from '@mui/material';
export default function LandingPage() {
  

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Welcome to Our Bonus Application</h1>
    <p className={styles.subtitle}>Earn and redeem your rewards with ease.</p>
    <div className={styles.buttonContainer}>
      <Link href="/auth/login">
        <Button className={styles.button}>Login</Button>
      </Link>
      <Link href="/auth/register">
        <Button className={styles.button}>Signup</Button>
      </Link>
    </div>
  </div>
);

}
