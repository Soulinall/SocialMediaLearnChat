import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../../../components/imports/Navbar'
import Sidebar from '../../../components/imports/Sidebar'
import ViewStudent from '../../../components/imports/ViewStudent'
import Rightbar from '../../../components/imports/Rightbar'


function ViewStudents() {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <Sidebar></Sidebar>
        <ViewStudent></ViewStudent>
        <Rightbar></Rightbar>
      </Stack>
    </Box>
  )
}

export default ViewStudents