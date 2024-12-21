import "@mantine/core/styles.css";
import './index.scss'
// @deno-types="@types/react"
import React, { StrictMode } from 'react'
// @deno-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider } from "@mantine/core";


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
