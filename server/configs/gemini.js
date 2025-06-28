const main = async (prompt) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:8000", // your frontend domain
          "X-Title": "QuickBlog Generator",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1600, // or go higher, e.g., 2048 or 4096
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("OpenRouter Error:", data.error);
      throw new Error(data.error.message || "OpenRouter API error");
    }

    return data.choices[0]?.message?.content || "No content generated.";
  } catch (err) {
    console.error("❌ Error in main():", err);
    throw err;
  }
};

export default main;

// 💻 Technology
// Title: The AI Revolution: How Generative Models Are Reshaping Creativity
// Subtitle: From code to content, explore how AI is unlocking new frontiers in innovation.

// Title: Quantum Computing Is Closer Than You Think
// Subtitle: A beginner-friendly look at the next leap in computational power.

// Title: The Rise of Edge Computing in a Cloud-Heavy World
// Subtitle: Why pushing data processing to the edge could change everything.

// 🚀 Startup
// Title: From Zero to One: Lessons from First-Time Founders
// Subtitle: Insights, failures, and breakthroughs from entrepreneurs building from scratch.

// Title: The Fundraising Rollercoaster
// Subtitle: What early-stage startups need to know before pitching to investors.

// Title: Building a Team That Builds the Dream
// Subtitle: How startup culture and hiring shape long-term success.

// 💰 Finance
// Title: Personal Finance in the Age of Inflation
// Subtitle: Smart money habits to beat rising costs and safeguard your future.

// Title: Crypto 101: Beyond the Hype
// Subtitle: A practical guide to understanding digital assets and decentralized finance.

// Title: The Psychology of Spending
// Subtitle: Why we buy what we buy — and how to take control of your finances.

// 🏥 Healthcare
// Title: Preventive Healthcare: The Real Game Changer
// Subtitle: How early action and lifestyle shifts are redefining modern medicine.

// Title: Telemedicine Is Here to Stay
// Subtitle: Exploring the benefits and challenges of virtual healthcare delivery.

// Title: Mental Health in a Digital World
// Subtitle: Navigating stress, screens, and well-being in the age of constant connection.

// 🌿 Lifestyle
// Title: Digital Minimalism: Reclaiming Your Time in a Hyperconnected World
// Subtitle: How less screen time can lead to more meaningful living.

// Title: The Rise of Conscious Consumerism
// Subtitle: Why what you buy matters more than ever.

// Title: Morning Routines That Actually Work
// Subtitle: Science-backed habits to start your day with clarity and energy.
