import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Login } from '../components/index'

const LazyLogin = lazy(() => import('../components/Login.jsx'));
export default function LoginPage() {

  return (
    <Suspense fallback={<Loader />}>
        <Login />
    </Suspense>
  );
}
