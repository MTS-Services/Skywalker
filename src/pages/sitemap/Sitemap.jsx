import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Sitemap = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          // public/companies.json থেকে ডেটা ফেচ করুন
          // আপনার পুরনো কোডে `/agent.json` ছিল, সেটি `/companies.json` হবে
          const response = await fetch("/companies.json");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCompanies(data); // 'setAgents' এর পরিবর্তে 'setCompanies'
        } catch (error) {
          console.error("Error fetching companies:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCompanies();
    }, []);
    
  return (
    <section class="mx-auto h-screen max-w-4xl px-6 py-12">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">Sitemap</h2>

      <ul class="space-y-4 text-base text-gray-700">
        <li>
          <a href="/search" class="font-[700] text-black/70 hover:underline">
             Home (Search)
          </a>
        </li>
        <li>
          <details class="group">
            <summary class="cursor-pointer font-[700] text-black/70 hover:underline">
               Properties for Sale in Kuwait (2363)
            </summary>
          </details>
        </li>
        <li>
          <details class="group">
            <summary class="cursor-pointer font-[700] text-black/70 hover:underline">
               Properties for Rent in Kuwait (2255)
            </summary>
          </details>
        </li>
        <li>
          <details class="group">
            <summary class="cursor-pointer font-[700] text-black/70 hover:underline">
               Properties for Exchange in Kuwait (121)
            </summary>
          </details>
        </li>

        <li>
          <details className="group">
            <summary className="cursor-pointer font-[700] text-black/70 hover:underline">
              Real Estate Companies ({companies.length})
            </summary>
            <ul className="mt-2 ml-4 space-y-1">
              {companies.map((company) => (
                <li key={company.id}>
                  <Link
                    to={`/agent/${company.id}/ads`}
                    className="text-sm font-[700] text-black/70 hover:underline"
                  >
                    <span>
                      {company.social_media?.whatsapp || "No WhatsApp"}
                    </span>{" "}
                    |<span> {company.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>

        <li>
          <a href="/about" class="font-[700] text-black/70 hover:underline">
            About Us
          </a>
        </li>
        <li>
          <a href="/contact" class="font-[700] text-black/70 hover:underline">
            Contact Us
          </a>
        </li>
        <li>
          <a href="/terms" class="font-[700] text-black/70 hover:underline">
            Terms and Conditions
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Sitemap
