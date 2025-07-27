import { useState } from "react";

interface Suggestion {
    section: string;
    recommendation: string;
  }
  
  interface JobMatchResponse {
    matchScore: number;
    summary: string;
    missingKeywords: string[];
    suggestedImprovements: Suggestion[];
  }
  
  interface GeminiSuggestion {
    section: string;
    recommendation: string;
  }
  
  interface GeminiAssessment {
    strengths: string[];
    weaknesses: string[];
  }
  
  interface GeminiResponse {
    overallAssessment: GeminiAssessment;
    suggestions: GeminiSuggestion[];
  }
  
const CvUpload = () =>{
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [geminiData, setGeminiData] = useState<GeminiResponse | null>(null);

    const [jobDescription, setJobDescription] = useState<string>("");
    const [jobMatchData, setJobMatchData] = useState<JobMatchResponse | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if(file){
            setSelectedFile(file)
            console.log(selectedFile)
        }
    }
    const handleUpload = () =>{
        if(selectedFile){
            const formData = new FormData();
            formData.append('file', selectedFile);
            fetch('http://localhost:5162/api/cvupload',{
                method:'POST',
                body: formData
            })
            .then((res) => res.json())
            .then((data) => {
                const parsedData: GeminiResponse = JSON.parse(data.geminiComment);
                setGeminiData(parsedData);
            })
            .catch((err) => console.log(err));
        }
    }
    const handleJobMatch = () =>{
        if (selectedFile && jobDescription){
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('jobDescription', jobDescription);
            fetch('http://localhost:5162/api/analysis/job-match',{
                method: 'POST',
                body: formData
            })
            .then((res) => res.json())
            .then((data) => {
                setJobMatchData(data);
            })
            .catch((err) => console.log(err));
        }
    }
    return (
        <>
          <h1>Upload your CV</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          <div>
            <h2>CV Content</h2>
            {geminiData && (
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h2>Genel Değerlendirme</h2>
                <h3>Güçlü Yönler</h3>
                <ul>
                  {geminiData.overallAssessment.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h3>Zayıf Yönler</h3>
                <ul>
                  {geminiData.overallAssessment.weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <hr />
                <h2>Öneriler</h2>
                {geminiData.suggestions.map((suggestion, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <h4>{suggestion.section}</h4>
                    <p>{suggestion.recommendation}</p>
                  </div>
                ))}
              </div>
            )}
            <hr />
            <h2>Job Match Analysis</h2>
            <input
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button onClick={handleJobMatch}>Match</button>
            <hr />
            {jobMatchData && (
              <div style={{ marginTop: '32px', textAlign: 'left' }}>
                <h2>Job Match Analysis</h2>
                <p><strong>Match Score:</strong> {jobMatchData.matchScore}</p>
                <p><strong>Summary:</strong> {jobMatchData.summary}</p>
                <h3>Missing Keywords</h3>
                <ul>
                  {jobMatchData.missingKeywords.map((kw: string, idx: number) => (
                    <li key={idx}>{kw}</li>
                  ))}
                </ul>
                <h3>Suggested Improvements</h3>
                {jobMatchData.suggestedImprovements.map((sugg: Suggestion, idx: number) => (
                  <div key={idx}>
                    <strong>{sugg.section}:</strong> {sugg.recommendation}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
}

export default CvUpload;