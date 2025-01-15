const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the GoogleGenerativeAI instance
const API_KEY = "Your-API-Key";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware for parsing JSON requests
app.use(express.json());

// API endpoint to generate content
app.post("/generate-content", async (req, res) => {
  try {
  let  first_name = req.body.first_name ?? 'Fname'
  let  last_name = req.body.last_name ?? 'Lname'
  let  phone = req.body.phone ?? 'xxx-xxx-xxxx'
  let  email = req.body.email ?? 'email@email.com'
  let  job_desc = req.body.job_desc ?? `Job Overview
Are you excited to kickstart or grow your career in sales and business development? Do you see yourself with a people-centric, growth-driven employer that collaborates with some of Canada’s successful organizations? If so, this could be the perfect opportunity for you!

Our clients are seeking candidates who are focused on professional and personal growth. If you are eager to learn and develop your sales or customer service skills, while representing great and amazing companies, apply now and start your journey!

What to expect:
• Weekly performance BONUSES
• In-office and field development (sales, business, skill & personal)
• Monday-Friday
• Ongoing guidance from leadership/management team.
• Opportunities for career growth & advancement.
• Weekly, fun & engaging team nights.
• Team travel for networking, conferences, and leadership development.
• Regional, provincial, national & international.

Responsibilities:
• Gain a thorough understanding of our client's projects and unique selling points.
• Engage with potential and new and existing customers through various channels, including face-to-face and phone calls.
• Develop and implement sales and customer service strategies to meet targets and quotas.
• Build and maintain strong customer relationships, delivering exceptional service and makes customers feel like royalty.

Training Program:

Our clients offer an exciting hands-on training program for all new team members! Whether you have sales or customer service experience or not, you will be taught everything you need to excel. This specially designed program will have you selling within your first week. In this program, you will learn how to:
• Pitch a customer
• Build rapport
• Solve a customer's problems
• Tonality & body language
• Handle objections
• Have fun!

If you're motivated and eager to join a dynamic team, unleash your sales and customer service skills, advance your career and personal development, and have fun while doing it, submit your application! We'll connect you with our client's recruiting team, who will reach out to you as soon as possible.

Mandatory requirements:
• You live in the Toronto or surrounding area
• Able to work Monday - Friday (or at least 4 days), full hours of 12:00 pm to 8:00 pm
• At least 18 years of age
• Have a great attitude!!

Job Type: Full-time

Pay: $20.00-$25.00 per hour

Additional pay:
• Bonus pay
• Commission pay

Benefits:
• Casual dress
• Company events

Flexible language requirement:
• French not required

Schedule:
• Monday to Friday

Application question(s):
• Please be aware that your resume/application will be reviewed by Cresco Careers and our selected client. If you pass the initial screening, our client will reach out to schedule an interview at their location. Kindly monitor your email and mobile phone for messages from their hiring team.
• Are you able to work the full hours of 12:00 PM to 8:00 PM for at least 4 days, Monday to Friday?
• *Please note that we are unable to offer a 9 AM - 5 PM position at the moment.

Language:
• English well (required)

Work Location: In person`
const expected_response = `{
personal_info:{
firstname: string,
lastname: string
phone: string
email: string
portfolio: string
},
professional_summary: string,
experience:{
organization: string
role: string
start_date: string
end_date: string
summary: string
}[],
skills: string[],
education:{
school: string
degree: string
start_date: string
end_date: string
}[],
certifications: {
issueing_organization:string
name_of_license: string
}[]
}`
    const prompt  = `Create an ATS friendly resume for the ${job_desc}. Make sure it gets shortlisted. Client personal details: ${first_name}, ${last_name}, ${phone}, ${email}. Format of the response should be as per ${expected_response}. No suggesstive or advisory language should be it should be a proper resume that would be accepted by a recruiter for the position.Add necessary education and certifications. Avoid using words like relevant, previous, some organization or institution. Rather be specific in the response. Show case skills and professional summary in the experience,certification and, education section. `
    const result = await model.generateContent(prompt);
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/generate-content`);
});
