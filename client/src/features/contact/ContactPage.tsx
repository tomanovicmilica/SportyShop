import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";


const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ecdxzgj",
        "template_c8ar4kk",
        form.current!,
        "PttdNgUYQ2e5QDEcY"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
      e.target.reset();
  };

  function notify(){
    toast("Email successfully sent!");
  }

  return (
    <Grid container >

    <Grid item sx={{mr:4}}>
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" onClick={notify} style={{color:'#4e342e', backgroundColor: '#8d6e63'}} />
      </form>
    </StyledContactForm>
    </Grid>
    
    <Grid item sx={{ml:4, mt:5}}>
      <Box>
      <Typography variant="h5">Contact us</Typography>
      <Typography> </Typography>
      <Typography>Send us an email and we will reply you as soon as possible!</Typography>
      </Box>
      <Box sx={{mt:5}}>
        <img src="/images/contact3.jpg" alt="hero" style={{ display: 'block', width: '70%', maxHeight: 400 }} />
      </Box>
      
    </Grid>
    </Grid>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;