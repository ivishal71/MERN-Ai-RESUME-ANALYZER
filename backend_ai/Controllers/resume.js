const ResumeModel = require("../Models/resume");
const multer = require("multer");
const pdfParse = require("pdf-parse");

console.log("TYPE:", typeof pdfParse);

const path = require("path");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: "XtPXlyW7VUXWlzI4Vk1wddeRxl9f432NdUIKFvdM",
});

exports.addResume = async (req, res) => {
  try {
    console.log("Route HIt");

    const { job_desc, user } = req.body;

    console.log("Body:", req.body);
    console.log("File:", req.file);

    // const pdfBuffer = req.file.buffer || null;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const pdfPath = req.file.path;
    const fs = require("fs");
    const dataBuffer = fs.readFileSync(pdfPath);
    console.log("STEP 1: PDF parsing started");
    const pdfData = await pdfParse(dataBuffer);
    console.log("STEP 2: PDF parsing completed");

    const prompt = `
You are an ATS Resume Screening Assistant.

Compare the resume with the job description.

Return ONLY in the following format:

Score: <number between 0 and 100>

Reason:
- Strengths
- Missing skills
- Improvement suggestions

IMPORTANT:
- Do NOT repeat any resume text.
- Do NOT include candidate name.
- Do NOT include phone number.
- Do NOT include email address.
- Do NOT include location.
- Do NOT include raw resume content.
- Keep the response under 100 words.

Resume Content:
${pdfData.text}

Job Description:
${job_desc}
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    console.log("Cohere Response Received");

    console.log("Full Cohere Response:", response);
    let result = response.text;

    console.log(result);
    // return res.status(200).json({
    //   success: true,
    //   analysis: result,
    // });

    const match = result.match(/score:\s*(\d+)/i);
    const score = match ? parseInt(match[1], 10) : null;

    const reasonMatch = result.match(/Reason:\s*([\s\S]*)/i);
    const reason = reasonMatch ? reasonMatch[1].trim() : null;

    const newResume = new ResumeModel({
      user,
      resume_name: req.file.originalname,
      job_desc,
      score,
      feedback: reason,
    });

    console.log("STEP 5: Saving to MongoDB");

    await newResume.save();

    console.log("STEP 6: MongoDB save completed");

    fs.unlinkSync(pdfPath); //remove temp file--

    res
      .status(200)
      .json({ message: "Your analysis are ready", data: newResume });
  } catch (err) {
    console.log("ERROR MESSAGE:");
    console.log(err);

    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

exports.getAllResumesForUser = async (req, res) => {
  try {
    const { user } = req.params;
    let resumes = await ResumeModel.find({ user: user }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ message: "Your Previous History", resumes: resumes });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Server error", message: err.message });
  }
};

exports.getResumeForAdmin = async (req, res) => {
  try {
    let resumes = await ResumeModel.find({})
      .sort({
        createdAt: -1,
      })
      .populate("user");
    return res
      .status(200)
      .json({ message: "Fetched All History", resumes: resumes });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Server error", message: err.messsage });
  }
};

// exports.addResume = async (req, res) => {
//   console.log("Route Hit");
//   console.log(req.file);

//   res.json({
//     success: true,
//     file: req.file,
//   });
// };
