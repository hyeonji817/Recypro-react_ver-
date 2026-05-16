import React, { useEffect, useState } from "react"; 
import { useSearchParamas, useNavigate } from "react-router-dom"; 
import "./orderList2.css";
import axios from "axios"; 
import Header_loginOK from "../main/Header_loginOK";
import Footer from "../main/Footer";
import PaymentModal from "../components/PaymentModal";
import beepBeep_Toy1 from "../assets/pet/1. beepBeep_Toy1.jpg";

const CDN = (path) => `http://localhost:5003/uploads/${String(path || "").replace(/^\.\//,'')}`;

