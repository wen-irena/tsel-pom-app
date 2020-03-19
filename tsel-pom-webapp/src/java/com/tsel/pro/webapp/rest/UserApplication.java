/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tsel.pro.webapp.rest;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author user
 */
public class UserApplication extends Application {  

    @Override
    public Set<Class<?>> getClasses() {  
        Set<Class<?>> classes = new HashSet<Class<?>>();  
        classes.add(UserService.class);  
        return classes;  
    }  
}  
