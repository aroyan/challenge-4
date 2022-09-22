import React, { useEffect } from 'react';
import Layout from '../components/Layout';

function About() {
  useEffect(() => {
    document.title = 'About | To-do-do';
  }, []);

  return (
    <Layout>
      <section className="h-[calc(100vh-136px)] flex items-center flex-col mx-8 md:mx-32 mt-8 text-center">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="mt-4">
          This is part of Studi Independen @Binar Academy - Frontend JavaScript.
        </p>
        <p className="mt-2">
          This is the 4th challenge from this course. So in this chapter we have
          to build Todo-list app using React and use REST API for the data.
        </p>
      </section>
    </Layout>
  );
}

export default About;
