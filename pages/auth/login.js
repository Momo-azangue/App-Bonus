import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoginForm from '../../components/LoginForm';

const LoginPage = () => {
    return <LoginForm />;
 };

export default LoginPage;
