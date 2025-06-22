import React from "react";

const About = () => {
  return (
    <div>
      {" "}
      <main className="min-h-screen bg-gray-100">
        <section className="py-20 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">
            welcome
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            We provide excellent services to help you achieve your goals.
            Explore our offerings.
          </p>
          <div className="mt-8">
            <a
              href="/services"
              className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white transition duration-300 hover:bg-blue-500"
            >
              Explore Services
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
