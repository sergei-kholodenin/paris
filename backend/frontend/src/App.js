import React from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/Container/Container";
import Footer from "./Components/Footer/Footer";

import HomePage from "./Pages/HomePage";
import EducationPage from "./Pages/EducationPage";
import TestsPage from "./Pages/TestsPage";
import ProfilePage from "./Pages/ProfilePage";
import StatisticsPage from "./Pages/StatisticsPage";
import LoginPage from "./Pages/LoginPage";
import { MessageArea } from "./Components/Message/Message";
import TestTakePage from "./Pages/TestTakePage";
import ResultDetailsPage from "./Pages/ResultDetailsPage";
import UserStatisticPage from "./Pages/UserStatisticPage";
import EditStoresPage from "./Pages/EditStoresPage";
import EditPositionsPage from "./Pages/EditPositionsPage";
import EditTestsPage from "./Pages/EditTestsPage";
import EditQuestionsPage from "./Pages/EditQuestionsPage";
import AddQuestionsPage from "./Pages/AddQuestionsPage";
import EditUsersPage from "./Pages/EditUsersPage";
import EditProfilePage from "./Pages/EditProfilePage";
import EditProfileUserPage from "./Pages/EditProfileUserPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<HomePage/>} exact />
          <Route path='/education' element={<EducationPage/>} />
          <Route path='/tests' element={<TestsPage/>} />
          <Route path='/tests/results/:id' element={<ResultDetailsPage/>} />
          <Route path='/tests/:id' element={<TestTakePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/statistics' element={<StatisticsPage/>} />
          <Route path='/statistics/stores' element={<EditStoresPage/>} />
          <Route path='/statistics/positions' element={<EditPositionsPage/>} />
          <Route path='/statistics/tests' element={<EditTestsPage/>} />
          <Route path='/statistics/users' element={<EditUsersPage/>} />
          <Route path='/statistics/users/profile/:id' element={<EditProfilePage/>} />
          <Route path='/statistics/users/profiles/' element={<EditProfileUserPage/>} />
          <Route path='/statistics/tests/:id/questions' element={<EditQuestionsPage/>} />
          <Route path='/statistics/tests/:id/questions/multi' element={<AddQuestionsPage/>} />
          <Route path='/statistics/users/results/:id' element={<UserStatisticPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </Container>
      <MessageArea/>
      <Footer/>
    </Router>
  );
}

export default App;
