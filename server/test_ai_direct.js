const axios = require('axios');

async function testAI() {
  const BASE_URL = 'http://localhost:5000/api';
  
  try {
    console.log("--- Registering Volunteer ---");
    const vRes = await axios.post(`${BASE_URL}/volunteers`, {
      name: "AI Test Volunteer",
      email: "ai_final_verify@test.com",
      skills: ["Web Design", "Photoshop"],
      location: "Remote",
      availability: "Full-time",
      phone: "1234567890"
    });
    console.log("Volunteer registered.");

    console.log("\n--- Creating Opportunity ---");
    const oRes = await axios.post(`${BASE_URL}/opportunities`, {
      title: "UI/UX Developer",
      organizationName: "Design NGO",
      description: "Need a modern interface",
      location: "Remote",
      date: "2026-05-01",
      requiredSkills: ["Interface Graphics"],
      volunteersNeeded: 1
    });
    console.log("Opportunity created.");

    console.log("\n--- Checking AI Matches ---");
    const mRes = await axios.get(`${BASE_URL}/opportunities/${oRes.data._id}/matches`);
    
    const match = mRes.data.matches.find(m => m.name === "AI Test Volunteer");
    if (match) {
      console.log(`\nMatch Score: ${match.score}%`);
      console.log(`Explanation: ${match.explanation}`);
      
      if (match.score > 20) {
          console.log("\n✅ SUCCESS: Semantic matching is ACTIVE. The AI successfully matched 'Web Design' with 'Interface Graphics'.");
      } else {
          console.log("\n⚠️ WARNING: Low match score detected. Matching might still be using keyword fallback.");
      }
    } else {
      console.log("No match found for the tester.");
    }

  } catch (error) {
    console.error("Test failed:", error.response?.data || error.message);
  }
}

testAI();
