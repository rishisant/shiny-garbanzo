// Authentscript.js
// @author: @rishisant
// @date: 2022-12-11

import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

var validusers = ["rishisanthanam", "mattjuntunen", "esbenegholm", "nayabrehmat"];
var validpass = ["529009921", "630007600", "228007063", "528000730"];

export function isValidManager() {
    const navigation = useNavigation();
    var isvalid = false;

    var user_input = document.getElementById("username_field").value;
    var pass_input = document.getElementById("password_field").value;
    for (let i=0; i < validusers.length; ++i) {
        if (user_input === validusers[i] && pass_input === validpass[i]) {
            isvalid = true;
        }
    }
    if (isvalid) {
        console.log("Valid Manager");
        // navigate to manager
        navigation.navigate('Manager');
    }
    else {
        console.log("Invalid Manager");
    }
}

export function isValidServer() {
    const navigation = useNavigation();
    var isvalid = false;
    var user_input = document.getElementById("username_field").value;
    var pass_input = document.getElementById("password_field").value;
    for (let i=0; i < validusers.length; ++i) {
        if (user_input === validusers[i] && pass_input === validpass[i]) {
            isvalid = true;
        }
    }
    if (isvalid) {
        console.log("Valid Server");
        // navigate to server
        navigation.navigate('Server');
        // window.location.href = "/Server";
    }
    else {
        console.log("Invalid Server");
    }
}