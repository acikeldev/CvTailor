import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import HarvardCvPreview from '../components/cv/HarvardCvPreview';
import { CvConversionService } from '../services/cvConversionService';
import type { HarvardCvModel, CvChange, CvEnhancementResponse } from '../models/HarvardCvModel';
import { getSampleHarvardCv } from '../models/HarvardCvModel';

const CvBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [harvardCv, setHarvardCv] = useState<HarvardCvModel | null>(getSampleHarvardCv());
  const [isConverting, setIsConverting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [enhancementLog, setEnhancementLog] = useState<string[]>([]);
  const [cvChanges, setCvChanges] = useState<CvChange[]>([]);
  const [isUploadCollapsed, setIsUploadCollapsed] = useState(false);

  const [cvText, setCvText] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleConvertToHarvard = async () => {
    if (!cvText.trim()) {
      alert('Please upload a CV file first');
      return;
    }

    setIsConverting(true);
    try {
      console.log('Converting CV text:', cvText.substring(0, 200) + '...');
      const convertedCv = await CvConversionService.convertToHarvardFormat(cvText);
      console.log('Converted CV:', convertedCv);
      setHarvardCv(convertedCv);
      setEnhancementLog([]); // Reset enhancement log
    } catch (error) {
      console.error('Error converting CV:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to convert CV: ${errorMessage}`);
    } finally {
      setIsConverting(false);
    }
  };

  const handleEnhanceWithAI = async () => {
    if (!harvardCv) {
      alert('Please convert a CV first');
      return;
    }

    setIsEnhancing(true);
    setIsUploadCollapsed(true); // Collapse upload section
    setEnhancementLog(['🤖 Starting AI enhancement...']);
    
    try {
      // Generate AI suggestions
      const suggestions = [
        'Improve action verbs in experience descriptions',
        'Add quantifiable achievements where possible',
        'Enhance skills section with relevant keywords',
        'Optimize project descriptions for impact',
        'Strengthen summary statements'
      ];

      setEnhancementLog(prev => [...prev, '📝 Analyzing CV structure...']);
      
      // Simulate AI processing steps
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnhancementLog(prev => [...prev, '🔍 Identifying improvement opportunities...']);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnhancementLog(prev => [...prev, '✨ Applying AI enhancements...']);

      // Call backend to enhance CV
      const enhancementResponse: CvEnhancementResponse = await CvConversionService.updateWithSuggestions(harvardCv, suggestions);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnhancementLog(prev => [...prev, '✅ CV successfully enhanced!']);

      setHarvardCv(enhancementResponse.enhancedCv);
      setCvChanges(enhancementResponse.changes);
    } catch (error) {
      console.error('Error enhancing CV:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setEnhancementLog(prev => [...prev, `❌ Error: ${errorMessage}`]);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleExportPdf = () => {
    if (!harvardCv) {
      alert('Please convert a CV first');
      return;
    }

    // For now, just show a message
    alert('PDF export functionality will be implemented in the next phase');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header with Toolbar */}
      <div className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <Icon name="arrow-left" size="sm" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CV Builder
              </h1>
            </div>
            
            {/* PDF Export Toolbar */}
            {harvardCv && (
              <Button 
                onClick={handleExportPdf}
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Icon name="file-pdf" size="sm" className="mr-2" />
                Export PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-3 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-full">
          {/* Left Side - Input and Controls */}
          <div className="space-y-3 flex flex-col max-h-full">
            {/* File Upload Section */}
            <Card className="border-2 border-dashed border-blue-200 bg-white/80 backdrop-blur-sm shadow-lg flex-shrink-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-blue-700">
                  <div className="flex items-center gap-2">
                    <Icon name="upload" size="lg" />
                    Upload Your CV
                  </div>
                  {selectedFile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsUploadCollapsed(!isUploadCollapsed)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Icon name={isUploadCollapsed ? "chevron-down" : "chevron-up"} size="sm" />
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Upload a CV file or paste CV text to convert to Harvard format
                </CardDescription>
              </CardHeader>
              {!isUploadCollapsed && (
                <CardContent>
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

                {/* Convert Button */}
                {selectedFile && (
                  <div className="mt-6 text-center">
                    <Button 
                      onClick={handleConvertToHarvard}
                      disabled={isConverting}
                      variant="primary"
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    >
                      {isConverting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Icon name="lightning" size="sm" className="mr-2" />
                          Convert to Harvard Format
                        </>
                      )}
                    </Button>
                  </div>
                )}
                </CardContent>
              )}
            </Card>

            

                        {/* AI Enhancement Section */}
            {harvardCv && (
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm shadow-lg flex-shrink-0">
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <Button 
                      onClick={handleEnhanceWithAI}
                      disabled={isEnhancing}
                      variant="primary"
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                    >
                      {isEnhancing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Icon name="sparkles" size="sm" className="mr-2" />
                          Enhance with AI
                        </>
                      )}
                    </Button>

                    {/* Enhancement Log */}
                    {enhancementLog.length > 0 && (
                      <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-medium text-purple-800 mb-1 text-xs">Progress:</h4>
                        <div className="space-y-1">
                          {enhancementLog.map((log, index) => (
                            <div key={index} className="text-xs text-purple-700 flex items-center gap-2">
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CV Changes List */}
                    {cvChanges.length > 0 && (
                      <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2 text-xs">Changes:</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {cvChanges.map((change, index) => (
                            <div key={index} className="p-2 bg-white rounded border border-blue-100">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                                  change.changeType === 'improved' ? 'bg-green-100 text-green-700' :
                                  change.changeType === 'enhanced' ? 'bg-blue-100 text-blue-700' :
                                  change.changeType === 'added' ? 'bg-purple-100 text-purple-700' :
                                  'bg-orange-100 text-orange-700'
                                }`}>
                                  {change.changeType}
                                </span>
                                <span className="text-xs font-medium text-gray-800">{change.section}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                <div className="line-through text-red-600">{change.oldValue}</div>
                                <div className="text-green-600 font-medium">→ {change.newValue}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}


          </div>

                        {/* Right Side - CV Preview */}
              <div className="h-full max-h-full overflow-hidden">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg h-full">
                  <CardContent className="p-0 h-full">
                    {harvardCv ? (
                      <div className="h-full overflow-y-auto max-h-full">
                        <HarvardCvPreview cv={harvardCv} />
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 h-full flex items-center justify-center">
                        <div>
                          <Icon name="document" size="lg" className="mx-auto mb-3 text-gray-300" />
                          <p className="text-sm">Upload a CV and convert it to see the Harvard format preview</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
        </div>
      </div>
    </div>
  );
};

export default CvBuilder; 