import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import RegisterForm from '../../components/ResgisterForm';

const RegisterPage = () => {
    return <RegisterForm />;
};

export default RegisterPage;
