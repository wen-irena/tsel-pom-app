/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tsel.pro.webapp.rest;

import com.tsel.pro.constant.PROConstants;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
/**
 *
 * @author user
 */
@Path("/rest")
public class UserService {
    private static final Logger LOGGER = Logger.getLogger( UserService.class.getName() );
    public UserService() {
        super();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/environmentname")
    public String getEnvironmentName() {
        String appMode = System.getProperty(PROConstants.APP_MODE);
        return appMode;
    }
    
}