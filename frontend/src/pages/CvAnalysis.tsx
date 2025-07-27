import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import Icon from '../components/ui/Icon';

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

interface CvSuggestion {
  section: string;
  recommendation: string;
}

interface CvAssessment {
  strengths: string[];
  weaknesses: string[];
}

interface CvAnalysisResponse {
  overallAssessment: CvAssessment;
  suggestions: CvSuggestion[];
}

const CvAnalysis = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileForJobMatch, setSelectedFileForJobMatch] = useState<File | null>(null);
  const [geminiData, setGeminiData] = useState<CvAnalysisResponse | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobMatchData, setJobMatchData] = useState<JobMatchResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveJobMatch, setDragActiveJobMatch] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log(selectedFile);
    }
  };

  const handleFileChangeForJobMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileForJobMatch(file);
      console.log(selectedFileForJobMatch);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDropForJobMatch = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveJobMatch(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFileForJobMatch(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      fetch('http://localhost:5162/api/analysis/cv-suggestion', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          setGeminiData(data);
          setIsUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsUploading(false);
        });
    }
  };

  const handleJobMatch = () => {
    if (selectedFileForJobMatch && jobDescription) {
      setIsAnalyzing(true);
      const formData = new FormData();
      formData.append('file', selectedFileForJobMatch);
      formData.append('jobDescription', jobDescription);
      fetch('http://localhost:5162/api/analysis/job-match', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          setJobMatchData(data);
          setIsAnalyzing(false);
        })
        .catch((err) => {
          console.log(err);
          setIsAnalyzing(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <Icon name="arrow-left" size="sm" />
            Back to Home
          </Button>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            CV Analysis & Job Matching
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered insights to optimize your CV and match it perfectly to job opportunities
          </p>
        </div>

        <Tabs defaultValue="analysis" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Icon name="brain" size="sm" />
              CV Analysis
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Icon name="target" size="sm" />
              Job Matching
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-8">
            {/* File Upload Section */}
            <Card className="border-2 border-dashed border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="pt-6">
                <div
                  className={`relative p-8 rounded-lg border-2 border-dashed transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50 scale-105' 
                      : 'border-blue-300 hover:border-blue-400'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Icon name="upload" size="lg" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Upload Your CV</h3>
                      <p className="text-gray-600">
                        Drag & drop your CV or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports PDF, Word, and Text files
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {selectedFile && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Icon name="document" size="md" className="text-green-600" />
                        <span className="font-medium text-gray-800">{selectedFile.name}</span>
                        <Icon name="check" size="md" className="text-green-600 ml-auto" />
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedFile && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Icon name="lightning" size="sm" className="mr-2" />
                          Analyze CV
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {geminiData && (
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <Card className="border-green-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Icon name="check" size="md" />
                      Strengths
                    </CardTitle>
                    <CardDescription>What makes your CV stand out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {geminiData.overallAssessment.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Areas for Improvement */}
                <Card className="border-red-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <Icon name="shield" size="md" />
                      Areas for Improvement
                    </CardTitle>
                    <CardDescription>Opportunities to enhance your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {geminiData.overallAssessment.weaknesses.map((weakness: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card className="border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Icon name="chart" size="md" />
                      Actionable Suggestions
                    </CardTitle>
                    <CardDescription>Specific improvements to boost your CV's impact</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {geminiData.suggestions.map((suggestion: CvSuggestion, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm mb-1 text-blue-800">{suggestion.section}</div>
                            <span className="text-sm text-gray-700">{suggestion.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="matching" className="space-y-8">
            {/* CV Upload Section for Job Matching */}
            <Card className="border-2 border-dashed border-purple-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Icon name="upload" size="md" />
                  Upload Your CV for Job Matching
                </CardTitle>
                <CardDescription>
                  Upload the CV you want to match against job descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative p-8 rounded-lg border-2 border-dashed transition-all duration-300 ${
                    dragActiveJobMatch 
                      ? 'border-purple-400 bg-purple-50 scale-105' 
                      : 'border-purple-300 hover:border-purple-400'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setDragActiveJobMatch(true); }}
                  onDragLeave={() => setDragActiveJobMatch(false)}
                  onDrop={handleDropForJobMatch}
                >
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Icon name="upload" size="lg" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Upload Your CV</h3>
                      <p className="text-gray-600">
                        Drag & drop your CV or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports PDF, Word, and Text files
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChangeForJobMatch}
                    />
                  </div>
                  
                  {selectedFileForJobMatch && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Icon name="document" size="md" className="text-green-600" />
                        <span className="font-medium text-gray-800">{selectedFileForJobMatch.name}</span>
                        <Icon name="check" size="md" className="text-green-600 ml-auto" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Description Input */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Paste the job description you want to match your CV against
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
                {selectedFileForJobMatch && jobDescription.trim() && (
                  <Button 
                    onClick={handleJobMatch}
                    disabled={isAnalyzing}
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing Match...
                      </>
                    ) : (
                      <>
                        <Icon name="target" size="sm" className="mr-2" />
                        Analyze Job Match
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Job Match Results */}
            {jobMatchData && (
              <div className="grid gap-6">
                {/* Match Score */}
                <Card className="border-green-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Icon name="target" size="md" />
                      Job Match Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-green-600 mb-2">{jobMatchData.matchScore}%</div>
                      <p className="text-gray-600">Strong match for this position</p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${jobMatchData.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Summary */}
                  <Card className="border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Icon name="document" size="md" />
                        Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{jobMatchData.summary}</p>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card className="border-red-200 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-700">
                        <Icon name="shield" size="md" />
                        Missing Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {jobMatchData.missingKeywords.map((keyword: string, index: number) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Icon name="chart" size="md" />
                      Recommendations
                    </CardTitle>
                    <CardDescription>How to improve your match score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {jobMatchData.suggestedImprovements.map((rec: Suggestion, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-sm mb-1 text-purple-800">{rec.section}</div>
                            <span className="text-sm text-gray-700">{rec.recommendation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CvAnalysis; 